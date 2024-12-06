import React, { useEffect, useState } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import axiosInstance from "../../services/Api/axiosInstance";
import { handleAxiosError } from "../../utils/errorHandling";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {

},[])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axiosInstance.post("/users/feedback", formData, {
        withCredentials: true,
      });
      setStatus("Message sent successfully!");
        setTimeout(() => {
      window.location.reload(); 
    }, 2000)
      console.log(response);

    } catch (error) {
      let errormessage = error;
      handleAxiosError(errormessage);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
     
      <section className={`${darkMode ? "bg-gray-800" : "bg-blue-800"} text-white py-20 px-6`}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Escribir</h1>
          <p className="text-lg mb-6">
            Reach out to us for any inquiries or to start a project. We look
            forward to connecting with you!
          </p>
        </div>
      </section>

   
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} p-8 rounded-lg shadow-lg`}>
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"} focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-blue-500" : "focus:ring-blue-500"}`}
                  placeholder="Your Full Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"} focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-blue-500" : "focus:ring-blue-500"}`}
                  placeholder="Your Email Address"
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"} focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-blue-500" : "focus:ring-blue-500"}`}
                  placeholder="Type your message here..."
                  rows={5}
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-semibold transition ${darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              >
                Send Message
              </button>
            </form>
            {status && <p className="mt-4">{status}</p>}
          </div>

        
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg">
              Escribir is here to answer any questions or provide you with
              additional information. Feel free to reach out through any of the
              methods below.
            </p>
            <div className="flex items-center space-x-4">
              <HiOutlineEnvelope />
              <p> escribir@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
