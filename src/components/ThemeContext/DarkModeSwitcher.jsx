// src/components/DarkModeSwitcher.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from './ThemeContext';

const DarkModeSwitcher = () => {
  const { mode, toggleMode } = useThemeContext();

  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default DarkModeSwitcher;
