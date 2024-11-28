
import { XCircle } from 'lucide-react';


const PaymentCancelPage = () => {
    const reason="cancelled by user"
    
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <XCircle 
            size={80} 
            className="text-red-500" 
            strokeWidth={1.5}
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-semibold">
          Not Processed
          </p>
         
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700">
            Cancellation Reason:
          </p>
          <p className="font-medium text-gray-900">
            {reason}
          </p>
        </div>
        
        <div className="flex space-x-4 justify-center">
          <button 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => window.location.href = '/'}
          >
            Return to Checkout
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;

