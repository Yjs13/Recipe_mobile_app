import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useFontSize } from '../components/fontSize';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import {useDarkMode} from '../components/darkMode'

const FontSizePage = () =>{

  const { fontSize, changeFontSize } = useFontSize();

  // radio button default state
  const [checked, setChecked] = useState('Default');

  // darkMode function
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // get the saved radio button state from asyncstorage when the app reloads 
    const getRadioButtonState = async () => {
      try {
        const savedRadioButtonState = await AsyncStorage.getItem('radioButtonState');
        if (savedRadioButtonState !== null) {
          setChecked(savedRadioButtonState);
        }
      } catch (error) {
        console.error('Error in retrieving radio button state:', error);
      }
    };

    getRadioButtonState();
  }, []);

  const saveRadioButtonState = async (value) => {
    try {
      // save the radio button state to asyncstorage
      await AsyncStorage.setItem('radioButtonState', value);
    } catch (error) {
      console.error('Error in retrieving radio button state:', error);
    }
  };

  const normalFontSize = () => {
    // set the radio button to default option
    setChecked('Default')
    // default font size 16
    changeFontSize(16);
    // save the default state to asyncstorage
    saveRadioButtonState('Default');
  };

  const largeFontSize = () => {
    // set the radio button to large option
    setChecked('Large')
    // increase the font size to 19
    changeFontSize(19);
    // save the large state to asyncstorage
    saveRadioButtonState('Large');
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.button}>
        <RadioButton
          value="Default"
          // if the checked value is 'Default' select this button
          status={ checked === 'Default' ? 'checked' : 'unchecked' }
          onPress={() => normalFontSize()}
          uncheckedColor='#F6635C'
        />
        <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText, {fontSize}]}>
          Default
        </Text>
      </View>

      <View style={styles.button}>
        <RadioButton
          value="Large"
          // if the checked value is 'Large' select this button
          status={ checked === 'Large' ? 'checked' : 'unchecked' }
          onPress={() => largeFontSize()}
          uncheckedColor='#F6635C'
        />
        <Text style={[styles.buttonText, isDarkMode && styles.darkButtonText, {fontSize}]}>
          Large
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
    padding: 12,
  },
  darkContainer: {
    backgroundColor: 'black'
  },
  button: {
    flexDirection:'row'
  },
  buttonText: {
    padding:3,
    paddingTop:6,
  },
  darkButtonText: {
    color: '#FFF5E0'
  }
});

export default FontSizePage;
