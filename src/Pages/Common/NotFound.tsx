
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../../routes/Route';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
       
        <div className="w-full flex justify-center mb-8">
          <svg
            viewBox="0 0 500 200"
            className="w-full max-w-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,100 Q125,30 250,100 T450,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-dash"
            />
            <text x="180" y="120" className="text-6xl font-bold" fill="currentColor">
              4 4
            </text>
            <circle
              cx="250"
              cy="100"
              r="30"
              fill="currentColor"
              className="animate-bounce"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Oops! Page Not Found
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Looks like you've ventured into uncharted territory. 
            The page you're looking for has gone on an adventure without us.
          </p>

         

       
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate(ROUTES.PUBLIC.HOME)}
              className="inline-flex items-center justify-center px-6 py-3 
                       bg-blue-600 hover:bg-blue-700 
                       text-white font-medium rounded-lg
                       transition-colors duration-200 ease-in-out
                       shadow-lg hover:shadow-xl"
            >
              <Home className="mr-2" size={20} />
              Go to Homepage
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3
                       border-2 border-gray-300 dark:border-gray-600
                       hover:border-gray-400 dark:hover:border-gray-500
                       text-gray-700 dark:text-gray-200 font-medium rounded-lg
                       transition-colors duration-200 ease-in-out
                       hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2" size={20} />
              Go Back
            </button>
          </div>
        </div>

        {/* Footer Message */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a>
        </p>
      </div>

     
    </div>
  );
};

export default NotFound;