import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const TermsAndConditions: React.FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      
      <section className={`w-full py-16 px-6 text-center ${darkMode ? "bg-gray-800" : "bg-blue-800"} text-white`}>
        <h1 className="text-5xl font-bold font-bodoni mb-4">Terms & Conditions</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6 font-bodoni">
          Welcome to Escribir. By accessing or using our services, you agree to the following terms and conditions.
        </p>
      </section>

     
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>1. Introduction</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Welcome to our platform. By using our services, you agree to be bound by these terms and conditions. If you do not agree, please refrain from using our services.
          </p>

          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>2. Payment Details</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            All advertisements on our platform require payment. The payment structure is as follows:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Monthly Payment: Each ad requires a one-month payment to run on our platform.</li>
            <li>Payment Methods: We accept various payment methods, including credit/debit cards and PayPal.</li>
            <li>Payment Due: Payments are due at the time of ad creation, and recurring payments will be charged monthly unless canceled.</li>
            <li>No Refunds: Payments are non-refundable once processed. Please ensure your ad details are accurate before submitting.</li>
          </ul>

          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>3. Ad Creation Details</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            You can create ads using various formats:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li><strong>Text Ads:</strong> Create engaging text-based ads with a title, description, and a link to your website or service.</li>
            <li><strong>Image Ads:</strong> Upload image files (JPG, PNG, GIF) to represent your business.</li>
            <li><strong>Video Ads:</strong> Upload video files (MP4, AVI, MOV) up to a 5-minute duration to promote your product or service.</li>
          </ul>

          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>4. Ad Approvals and Restrictions</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            All ads submitted to our platform will undergo a review process. We reserve the right to reject or remove ads that violate our guidelines. Prohibited content includes:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Illegal activities or content promoting violence.</li>
            <li>Misleading or deceptive content.</li>
            <li>Explicit or offensive language, images, or videos.</li>
            <li>Unlawful promotion of drugs or regulated substances.</li>
          </ul>

          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>5. User Responsibility</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            You are responsible for ensuring that the ad content you submit complies with all applicable laws, regulations, and our platform guidelines. You must ensure that your business and ad content do not infringe upon the rights of others.
          </p>

          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>6. Termination of Service</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            We reserve the right to terminate or suspend your account at any time, with or without notice, if you breach these terms or engage in any activities that may harm our platform or its users.
          </p>

          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>7. Privacy and Data</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your personal information is protected under our Privacy Policy. We may collect certain information as described in the policy to improve our services and ensure a personalized experience.
          </p>

          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>8. Limitation of Liability</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            We are not liable for any damages or losses that result from the use of our services. We do not guarantee the success of any ad campaign or its performance on the platform.
          </p>

          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>9. Changes to Terms</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            We may update these terms and conditions from time to time. You will be notified of any changes, and by continuing to use our platform, you agree to the updated terms.
          </p>

          <h2 className={`text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>10. Contact Us</h2>
          <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            If you have any questions or concerns about these terms, please contact us at support@yourbusiness.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
