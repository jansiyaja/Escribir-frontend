import React, { useState, useEffect } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import { FaCrown, FaSave } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import axiosInstance from "../../../services/Api/axiosInstance";
import ToastComponent from "../../../Components/ToastNotification";
import { handleAxiosError } from "../../../utils/errorHandling";
import useToast from "../../../Components/UseToast";
import { setUser } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { User } from "../../../Interfaces/slice";
import { AlertDialog, Card } from "@radix-ui/themes";


const Sidebar = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const [image, setImage] = useState<string | null>(null);
  const { showToast, setShowToast, toastMessage, toastType, triggerToast } =
    useToast();
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
      formData.append("profileImage", file);

      const response = await axiosInstance.post(
        "/users/profileImage",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      triggerToast(
        "Your profile picture has been uploaded successfully!",
        "success"
      );
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
    <aside className=" p-4  w-80 rounded-lg">
      {/* Profile Image Section */}
      <div className="relative mb-6 flex justify-center">
        <div className="relative">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className={`w-28 h-28 rounded-full border-4 ${
                darkMode ? "border-blue-300" : "border-blue-500"
              } shadow-md`}
            />
          ) : (
            <div
              className={`w-28 h-28 rounded-full border-4 ${
                darkMode ? "border-blue-300" : "border-blue-500"
              } flex items-center justify-center shadow-md`}
            >
              <HiOutlineCamera
                className={`w-12 h-12 ${
                  darkMode ? "text-blue-300" : "text-blue-500"
                }`}
              />
            </div>
          )}

          <div
            className={`absolute bottom-0 right-0 p-1 rounded-full shadow-lg ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              <button
                onClick={file ? handleConfirmUpload : undefined}
                disabled={uploading || !file}
                className={`w-10 h-10 flex items-center justify-center text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {uploading ? (
                  <FaSave className="w-5 h-5" />
                ) : (
                  <HiOutlineCamera className="w-5 h-5" />
                )}
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
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Premium Status Section */}
      <Card
        className={
          user?.isPremium
            ? "bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg"
            : "p-4 rounded-lg"
        }
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <FaCrown
            className={`w-5 h-5 ${
              user?.isPremium ? "text-yellow-600" : "text-gray-500"
            }`}
          />
          {user?.isPremium ? "Premium Member" : "Upgrade to Premium"}
        </h2>
        <p className="text-gray-500 mt-2">
          {user?.isPremium
            ? "You're enjoying premium benefits! Your subscription is active."
            : "Get access to exclusive features and benefits."}
        </p>
        <div className="mt-4 space-y-4">
          {!user?.isPremium && (
            <>
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                
                    <button className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                    Upgrade Now
               
                  </button>
                  
                </AlertDialog.Trigger>
              </AlertDialog.Root>
            </>
          )}
        </div>
      </Card>

      {/* Toast Notifications */}
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
