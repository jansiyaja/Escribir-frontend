import React, { useState, useEffect } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import { FaSave } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import axiosInstance from "../../../services/Api/axiosInstance";
import ToastComponent from "../../../Components/ToastNotification";
import { handleAxiosError } from "../../../utils/errorHandling";
import useToast from "../../../Components/Hooks/UseToast";
import { setUser } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { User } from "../../../Interfaces/slice";

const Sidebar = () => {
  const features = ['Profile', 'Customization', 'Notification', 'Account'];
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const [image, setImage] = useState<string | null>(null);
  const { showToast, setShowToast, toastMessage, toastType, triggerToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.image) {
      setImage(user.image);
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleConfirmUpload = async () => {
    if (!file) return; 

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await axiosInstance.post('/users/profileImage', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      triggerToast("Your profile picture has been uploaded successfully!", "success");
      console.log(response);
      
     
      dispatch(setUser({ ...user, image: response.data.secureUrl } as User)); 
      setShowToast(true);
      setImage(response.data.secureUrl); 
      setFile(null); 
    } catch (err) {
      const errorMessage = handleAxiosError(err);
      triggerToast(errorMessage, "error");
      setShowToast(true); 
    } finally {
      setUploading(false); 
    }
  };

  return (
    <aside className={`flex flex-col items-center p-6 rounded-lg shadow-lg m-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'} lg:sticky top-4`}>
      <div className="relative mb-8">
        {image ? (
          <img
            src={image}
            alt="Profile"
            className={`w-28 h-28 rounded-full border-4 ${darkMode ? 'border-blue-300' : 'border-blue-500'} shadow-md`}
          />
        ) : (
          <div className={`w-28 h-28 rounded-full border-4 ${darkMode ? 'border-blue-300' : 'border-blue-500'} flex items-center justify-center shadow-md`}>
            <HiOutlineCamera className={`w-12 h-12 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`} />
          </div>
        )}
        <div className={`absolute bottom-0 right-0 ${darkMode ? 'bg-gray-900' : 'bg-white'} p-1 rounded-full shadow-lg`}>
          <label htmlFor="file-upload" className={`cursor-pointer`}>
            <button
              onClick={file ? handleConfirmUpload : undefined} 
              disabled={uploading || !file}
              className={`w-10 h-10 flex items-center justify-center text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploading ? <FaSave className="w-5 h-5" /> : <HiOutlineCamera className="w-5 h-5" />}
            </button>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="space-y-4 mt-8">
        {features.map((label, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-center py-3 px-6 text-lg font-semibold rounded-lg hover:bg-opacity-90 transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'} focus:outline-none shadow-lg ${darkMode ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800' : 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <ToastComponent
        open={showToast}
        setOpen={setShowToast}
        message={toastMessage}
        type={toastType}
      />
    </aside>
  );
};

export default Sidebar;
