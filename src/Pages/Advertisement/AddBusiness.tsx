import React, { useState } from 'react';
import bannerImage from '../../assets/Images/banner.jpg';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/Route';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../../services/Api/axiosInstance';

const AddBusiness = () => {
  const [formData, setFormData] = useState({
    userName: '',
    businessName: '',
    acceptTerms: false,
    confirmPayment: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const [paymentStatus, setPaymentStatus] = useState(""); 
  const key = import.meta.env.VITE_PUBLISHABLEKEY;
  const user = useSelector((state: RootState) => state.auth.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('You must accept the terms and conditions to proceed.');
      return;
    }
    if (!formData.confirmPayment) {
      alert('You must confirm the payment to proceed.');
      return;
    }

        const stripe = await loadStripe(key);
        const email = user?.email;
    
    if (!stripe) return;

    
    try {
      const response = await axiosInstance.post('/client/makePayment', { email }, { withCredentials: true });
      console.log(response);
      if (response.status === 201) {
        setPaymentStatus('Payment successful');
        const sessionUrl = response.data;
        window.location.href = sessionUrl;
      }

      const sessionId = response.data.sessionId;

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        setPaymentStatus('Payment failed, please try again.');
      }
    } catch (error) {
      setPaymentStatus('Payment failed, please try again.');
    }

    setSubmitted(true);
  };

  if (submitted && paymentStatus) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`bg-white p-8 rounded-lg shadow-md text-center ${darkMode ? 'bg-gray-800 text-white' : 'text-gray-800'}`}>
          <h2 className="text-3xl font-semibold mb-4">Thank You!</h2>
          <p className="mb-4">
            Your business <strong>{formData.businessName}</strong> has been successfully added.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className={`"bg-blue-600  px-6 py-3 rounded-lg hover:bg-blue-700 transition" ${darkMode ? 'bg-gray-800 text-white' : 'text-gray-800'}`}
          >
            Add Another Business
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen`}>
      <header
        className={`relative bg-cover bg-center h-60 md:h-80 text-white bg-opacity-70 ${darkMode ? 'bg-opacity-80' : ''}`}
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center animate__animated animate__fadeIn animate__delay-1s">
            Promote Your Business with Ease
          </h1>
          <p className="mt-4 text-lg md:text-xl text-center animate__animated animate__fadeIn animate__delay-2s">
            Stand out from the crowd and grow your audience today!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className={` p-8 rounded-lg shadow-lg max-w-3xl mx-auto space-y-6 ${darkMode ? 'bg-gray-800 text-white' : 'text-gray-800 bg-gray-100'}`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add Your Business
          </h2>

          <div className="flex flex-col mb-4">
            <label htmlFor="userName" className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="businessName" className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
              required
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            />
          </div>

          {/* Pricing Information */}
          <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-xl font-semibold ">Pricing Information</h3>
            <p className=" mt-2">To use the advertising features, there is a charge of <strong>₹300 per month</strong>.</p>
            <p className=" mt-2">This subscription will automatically renew each month unless cancelled.</p>
          </div>
          

           <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="confirmPayment"
              name="confirmPayment"
              checked={formData.confirmPayment}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <label htmlFor="confirmPayment" className="ml-3 text-gray-600">
              I confirm that I understand the payment of ₹300 per month for the advertising service.
            </label>
          </div>
          {/* Terms and Conditions */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <label htmlFor="acceptTerms" className={`ml-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              I agree to the{' '}
              <Link to={ROUTES.PROTECTED.TERMS_AND_CONDITION} className="text-blue-600 underline cursor-pointer">
                Terms & Conditions
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddBusiness;



