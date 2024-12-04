
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { PaymentSuccessProps } from '../Settings/types';
import { setUser } from '../../redux/slices/authSlice';
import { ROUTES } from '../../routes/Route';
import { useDispatch } from 'react-redux';
import { PAYMENTUPDATE } from '../../services/Api/clientApi';


export const AddPaymentSuccessWrapper = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const amount = parseFloat(queryParams.get('amount') || '0');
  const orderId = queryParams.get('orderId') || '';
  const customerEmail = queryParams.get('customerEmail') || '';
  const businessName = queryParams.get('businessName') || '';

  return (
    <PaymentSuccess
      amount={amount}
      orderId={orderId}
          customerEmail={customerEmail}
          businessName={businessName}
          
    />
  );
};

const PaymentSuccess : React.FC<PaymentSuccessProps> = ({ 
  amount, 
  orderId, 
 customerEmail ,
  businessName
}) => {

  
  const { darkMode } = useSelector((state: RootState) => state.theme);
   const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate()

   if (!user) return null; 
    
  const updateUserData = async () => {
 
    try {
      const response =await PAYMENTUPDATE(amount,orderId,customerEmail,businessName)

      if (response.status === 201) {
        const updatedUser = {
          ...user,
        role: 'client',
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
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen flex items-center justify-center`}>
      <div className={`bg-white p-8 rounded-lg shadow-md text-center ${darkMode ? 'bg-gray-800 text-white' : 'text-gray-800'}`}>
      
          <>
            <h2 className="text-3xl font-semibold mb-4">Payment Successful!</h2>
                 <p className="mb-4">Thank you for your payment. You have successfully unlocked the advertisement features for your business <span className='text-blue-500 font-bodoni font-bold text-xl'>{ businessName}</span></p>
           
            <div className="mb-4">
              <p className="text-lg">
                Payment Amount: <span className="font-semibold"> {amount}</span>
              </p>
              <p className="text-lg">
                Order ID: <span className="font-semibold">{orderId}</span>
              </p>
              <p className="text-lg">
                Customer Email: <span className="font-semibold">{customerEmail}</span>
                     </p>
                     
            </div>
            
            <div className="mb-4">
              <p className="text-lg">
                Now, you can add and manage advertisements for your business to boost visibility and grow your audience.
              </p>
            </div>
              <button 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={updateUserData}
          >
            Go to Manage Ads
          </button>
            
          </>
        
          
  
      </div>
    </div>
  );
};

export default PaymentSuccess;
