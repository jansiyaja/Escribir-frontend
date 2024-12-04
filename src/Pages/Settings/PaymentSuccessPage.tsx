import React from 'react';
import { CheckCircle } from 'lucide-react';
import axiosInstance from '../../services/Api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store/store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/Route';
import { PaymentSuccessProps } from './types';

export const PaymentSuccessPageWrapper = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const amount = parseFloat(queryParams.get('amount') || '0');
  const orderId = queryParams.get('orderId') || '';
  const customerEmail = queryParams.get('customerEmail') || '';

  return (
    <PaymentSuccessPage
      amount={amount}
      orderId={orderId}
      customerEmail={customerEmail}
    />
  );
};



const PaymentSuccessPage: React.FC<PaymentSuccessProps> = ({ 
  amount, 
  orderId, 
  customerEmail 
}) => {
  const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate()
 
  

  if (!user) return null;

 
 


  const updateUserData = async () => {
 
    try {
      const response = await axiosInstance.post(
        '/users/paymentUpdate',
        { amount, orderId, customerEmail },
        { withCredentials: true }
      );

      if (response.status === 201) {
        const updatedUser = {
          ...user,
          isPremium: true,
        };
          dispatch(setUser(updatedUser));
          navigate(ROUTES.PUBLIC.HOME)
          
       
      }
      console.log('User data updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update user data:', error);
    } finally {
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle 
            size={80} 
            className="text-green-500" 
            strokeWidth={1.5}
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful
        </h1>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-semibold">
            ${amount.toFixed(2)} Paid
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Order #{orderId}
          </p>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700">
            A receipt has been sent to
          </p>
          <p className="font-medium text-gray-900">
            {customerEmail}
          </p>
        </div>

        
        
        <div className="flex space-x-4 justify-center">
          <button 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={updateUserData}
          >
            Return to Dashboard
          </button>
          <button 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => window.print()}
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
