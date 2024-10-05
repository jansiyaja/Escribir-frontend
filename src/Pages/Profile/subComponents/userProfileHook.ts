import { useState, useEffect } from 'react';
import axiosInstance from '../../../services/Api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { setUser } from '../../../redux/slices/authSlice';
import { handleAxiosError } from '../../../utils/errorHandling';
import useToast from '../../../Components/Hooks/UseToast';
import { User } from '../../../Interfaces/slice';

const useProfileHook = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<User | null>(user);
  const [isSaved, setIsSaved] = useState(false);
  const { showToast, setShowToast, toastMessage, toastType, triggerToast } = useToast();

  useEffect(() => {
    setUserData(user);
  }, [user]);

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

      if (response.status === 200) {
        triggerToast("Profile updated successfully", "success");
        setIsSaved(true);

        const getResponse = await axiosInstance.get('/users/profile', { withCredentials: true });
        if (getResponse.status === 200) {
          dispatch(setUser(getResponse.data.user));
        }
      } else {
        triggerToast("Failed to update profile. Please try again.", "error");
      }
    } catch (err) {
      handleAxiosError(err);
     
    }
  };

  return {
    userData,
    handleChange,
    editMode,
    setEditMode,
    handleEdit,
    handleSave,
    isSaved,
    showToast,
    setShowToast,
    toastMessage,
    toastType,
    triggerToast,
  };
};

export default useProfileHook;
