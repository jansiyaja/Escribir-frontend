import { useState } from 'react';

import { HiMoon as Brightness4Icon, HiSun as Brightness7Icon } from 'react-icons/hi'; // Importing from 'react-icons/hi'
import { IconButton } from '@radix-ui/themes';

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode); // Ensure correct toggling of class
  }

  return (
    <>
      <IconButton onClick={handleDarkMode} color="iris">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
     
    </>
  );
};

export default ToggleTheme;
