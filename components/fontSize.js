import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FONT_SIZE_KEY = 'fontSize';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  
  // default font size
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    // load font size from AsyncStorage when the app reloads or starts
    const getFontSize = async () => {
      try {
        const savedFontSize = await AsyncStorage.getItem(FONT_SIZE_KEY);
        if (savedFontSize) {
          // radix based on the decimal (10) by default
          setFontSize(parseInt(savedFontSize, 10));
        }
      } catch (error) {
        console.error('Font Size error:', error);
      }
    };

    getFontSize();
  }, []);

  const changeFontSize = (newSize) => {
    setFontSize(newSize);

    // save the new font size choosed by the user to the async storage
    AsyncStorage.setItem(FONT_SIZE_KEY, newSize.toString());
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, changeFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('must implement the useFontSize inside the FontSizeProvider');
  }
  return context;
};
