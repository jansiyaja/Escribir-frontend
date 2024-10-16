
import { HiOutlineMoon,HiOutlineSun } from "react-icons/hi2";
import { setTheme } from '../redux/slices/themeSlice';
import { IconButton } from '@radix-ui/themes';
import { useDispatch,useSelector } from 'react-redux';


const ToggleTheme = () => {

  const dispatch = useDispatch();

  const { darkMode } = useSelector((state: any) => state.theme);
  

  const handleDarkMode = () => {
    document.body.classList.toggle('dark', !darkMode)
    dispatch(setTheme(!darkMode));
  }
    
  const CurrentIcon = darkMode ? HiOutlineSun : HiOutlineMoon;

  return (
    <>
      <IconButton onClick={handleDarkMode}  className="bg-white p-2 rounded-lg hover:bg-gray-200">
      <CurrentIcon  className="text-gray-600 w-6 h-6"/>
     </IconButton>
    </>
  );
};

export default ToggleTheme;
