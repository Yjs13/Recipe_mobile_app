// save recipe to cookbook component
import React from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

// image
import image from '../assets/images/icons8-heart-48.png';

const SaveRecipe = ({ name }) => {
  
  // saved the recipe name to asyncstorage when the heart button was pressed
  const saveRecipeName = async (recipeName) => {
    try {
      // get existing data from the asyncstorage
      const existingData = await AsyncStorage.getItem('savedRecipes');
      const parsedData = existingData ? JSON.parse(existingData) : [];

      // check if the recipe with the same name has been exist in the storage
      const recipeExists = parsedData.some((name) => name === recipeName);

      if(!recipeExists)
      {
        parsedData.push(recipeName);
        await AsyncStorage.setItem('savedRecipes', JSON.stringify(parsedData));
        Alert.alert(`${name} has been saved to your cookbook.`);
      }
      else{
        Alert.alert(`${name} is already in your cookbook.`);
      }
    } catch (error) {
      console.error(`Error saving recipe name: ${name}`);
    }
  };


  const handleSavePress = async () => {
    // when the saved action is pressed it would give out a haptic vibration
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      await saveRecipeName(name);
    } catch (error) {
      Alert.alert('Error occurred while saving the recipe.');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleSavePress} style={styles.button}>
        <Image source={image} style={styles.buttonImg} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    marginLeft: 29,
  },
  buttonImg: {
    height: 29,
    width: 29,
  },
});

export default SaveRecipe;
