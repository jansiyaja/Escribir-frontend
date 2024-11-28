import React, { useState } from 'react';
import { Button, Card } from '@radix-ui/themes';
import {  ShieldCheck, Monitor, Headset } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../../services/Api/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import {  HiCalendar, HiCheckCircle, HiCreditCard  } from 'react-icons/hi2';

interface PremiumPlansProps {
  isPremium: boolean;
  plan: string;
  expiryDate: string;
  amount: number;
  lastPaymentDate: string;
}

const PremiumPlans: React.FC<PremiumPlansProps> = ({
  isPremium,
  plan,
  expiryDate,
  amount,
  lastPaymentDate,
}) => {
  const [paymentStatus, setPaymentStatus] = useState(""); 
  const key = import.meta.env.VITE_PUBLISHABLEKEY;
  const user = useSelector((state: RootState) => state.auth.user);

  const premiumFeatures = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Ad-free Experience",
      description: "Enjoy an uninterrupted, ad-free environment.",
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "Exclusive Features",
      description: "Access premium tools and expert connections.",
    },
    {
      icon: <Headset className="w-5 h-5" />,
      title: "Priority Support",
      description: "Get help faster with priority customer service.",
    },
  ];

  const handleCheckout = async (plan: string) => {
    const stripe = await loadStripe(key);
    const email = user?.email;
    
    if (!stripe) return;

    try {
      const response = await axiosInstance.post('/users/makePayment', { plan, email }, { withCredentials: true });
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
  };

  if (isPremium && expiryDate) { 
    return (
      <div className="space-y-6 w-full max-w-3xl">
   <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Premium Subscription</h2>
            <p className="text-blue-100 capitalize">{plan} Plan</p>
          </div>
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold 
            transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            Active
          </div>
        </div>
      </div>

     
      <div className="p-6 space-y-6">
       
        <div className="grid grid-cols-2 gap-6">
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm 
            transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <HiCreditCard className="w-6 h-6 text-blue-600" />
              <span className="text-gray-600 text-sm">Monthly Payment</span>
            </div>
            <p className="text-xl font-bold text-gray-900">${amount}/month</p>
          </div>

          {/* Last Payment */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm 
            transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <HiCalendar className="w-6 h-6 text-green-600" />
              <span className="text-gray-600 text-sm">Last Payment</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {new Date(lastPaymentDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Your Premium Benefits
          </h3>
          <div className="space-y-4">
            {premiumFeatures.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 bg-blue-50 p-3 rounded-xl 
                  transition-all duration-300 ease-in-out 
                  hover:bg-blue-100 hover:translate-x-2 hover:shadow-md"
              >
                <HiCheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>


      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto p-4">
      <Card className="shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-2">Upgrade to Premium</h2>
        <p className="text-gray-600 text-center mb-8">
          Get access to exclusive features and expert connections.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div className="rounded-lg bg-gray-50 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Monthly Plan</h3>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-500">50</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </div>

            <div className="space-y-4">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-blue-500">{feature.icon}</div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => handleCheckout('monthly')}
            >
              Choose Monthly
            </Button>
          </div>

          {paymentStatus && (
            <div
              className={`alert ${paymentStatus === 'Payment successful' ? 'alert-success' : 'alert-error'}`}
            >
              {paymentStatus}
            </div>
          )}

          <div className="rounded-lg bg-gray-50 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Yearly Plan</h3>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-500">500</div>
                <div className="text-sm text-gray-500">billed annually</div>
              </div>
            </div>

            <div className="space-y-4">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-green-500">{feature.icon}</div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white" onClick={() => handleCheckout('yearly')}>
              Choose Yearly
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PremiumPlans;
