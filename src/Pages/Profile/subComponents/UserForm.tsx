import React, { useState, useEffect } from 'react';
import { Skeleton } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import axiosInstance from '../../../services/Api/axiosInstance';
import { handleAxiosError } from '../../../utils/errorHandling';
import FormField from './FormField'; 
import useToast from '../../../Components/UseToast';
import ToastComponent from '../../../Components/ToastNotification';
import { User } from '../../../Interfaces/slice';
import { setUser } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<User | null>(user);
  const { showToast, setShowToast, toastMessage, toastType, triggerToast } = useToast();
  const [isSaved, setIsSaved] = useState(false); 

  useEffect(() => {
    setUserData(user);
  }, [user]);
  console.log(userData);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setUserData((prevData) => {
      if (!prevData) return null; 

      return {
        ...prevData,
        [name]: name === 'phone' ? value.replace(/\D/g, '') : value,
      } as User; 
    });
  };

  const handleEdit = () => setEditMode(!editMode);

  const handleSave = async () => {
    try {
      if (!userData) return; 

      const updatedFormData = {
        ...userData,
        phone: userData.phone ? parseInt(userData.phone, 10) : undefined,
      };
      const response = await axiosInstance.post('/users/profile', updatedFormData, { withCredentials: true });
         console.log(response);
      if (response.status === 200) {
        triggerToast("Profile updated successfully", "success");
        setIsSaved(true); 

        const getResponse = await axiosInstance.get('/users/profile', { withCredentials: true });
      
        
        if (getResponse.status === 200) {
             console.log("this responeese");
         dispatch(setUser(getResponse.data.user));
        }
      } else {
        triggerToast("Failed to update profile. Please try again.", "error");
        console.log('Failed to update profile:', response.statusText);
      }
    
    } catch (err) {
      const errorMessage = handleAxiosError(err);
      console.log(errorMessage);
    }
  };

  return (
    <div className={`flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-10 rounded-xl shadow-md w-full max-w-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}>
        <h2 className="text-3xl font-bold text-blue-600 mb-8">
          @{userData?.username || <Skeleton className="h-8 w-1/2 bg-gray-300" />}
        </h2>
        <form className="space-y-4">
          <section>
            <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
            <FormField label="Name" name="username" value={userData?.username || ''} editMode={editMode} onChange={handleChange} darkMode={darkMode} />
            <FormField label="Email" name="email" value={userData?.email || ''} editMode={editMode} type="email" onChange={handleChange} darkMode={darkMode} />
           
            <FormField label="Date of Birth" name="dob" value={userData?.dob ? new Date(userData.dob).toISOString().split('T')[0] : ''} 
             editMode={editMode} 
                    type="date" 
                      onChange={handleChange} 
                     darkMode={darkMode} 
                     />
              </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Portfolio Links</h3>
            <FormField label="Portfolio" name="portfolio" value={userData?.portfolio || ''} editMode={editMode} onChange={handleChange} darkMode={darkMode} />
            <FormField label="LinkedIn" name="linkedIn" value={userData?.linkedIn || ''} editMode={editMode} onChange={handleChange} darkMode={darkMode} />
            <FormField label="GitHub" name="github" value={userData?.github || ''} editMode={editMode} onChange={handleChange} darkMode={darkMode} />
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <FormField label="Bio" name="bio" value={userData?.bio || ''} editMode={editMode} onChange={handleChange} darkMode={darkMode} isTextArea />
            <FormField label="Location" name="location" value={userData?.location || ''} editMode={editMode} onChange={handleChange} darkMode={darkMode} />
          </section>

          <button
            type="button"
            onClick={handleEdit}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${darkMode ? 'hover:bg-blue-600' : ''}`}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
          {editMode && !isSaved && ( 
            <button
              type="button"
              onClick={handleSave}
              className={`w-full bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition ${darkMode ? 'hover:bg-blue-600' : ''}`}
            >
              Save
            </button>
          )}
          <ToastComponent
            open={showToast}
            setOpen={setShowToast}
            message={toastMessage}
            type={toastType}
          />
        </form>

  
      </div>
    </div>
  );
};

export default ProfilePage;
