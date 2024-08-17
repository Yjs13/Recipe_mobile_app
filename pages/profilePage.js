import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

// components
import ProfileInfo from '../components/profileInfo';
import CookBookRecipeCard from '../components/cookBookRecipeCard';
import {useDarkMode} from '../components/darkMode';

// image
// Settings icon by Icons8
import settingsImg from '../assets/images/icons8-settings-48.png';

const ProfilePage = () =>{
  const navigation = useNavigation();
  const goToSettingPage = () => {
    // navigate to the settings page
    navigation.navigate('Settings');
  };

  // darkMode function
  const { isDarkMode } = useDarkMode();

  // state the saved recipes name
  const [savedRecipes, setSavedRecipes] = useState([]);

  // function to load saved recipes from asyncstorage
  const getSavedRecipes = async () => {
    try {
      const savedRecipeData = await AsyncStorage.getItem('savedRecipes');
      if (savedRecipeData) {
        const parsedData = JSON.parse(savedRecipeData);
        setSavedRecipes(parsedData);
      }
    } catch (error) {
      console.error('Error in retrieving the saved recipe state:', error);
    }
  };

  // loads the saved recipe everytime the user navigate to the profile page
  useFocusEffect(
    React.useCallback(() => {
      getSavedRecipes();
    }, [])
  );

  // set it to be 2 columns per row
  const rows = [];
  const cellsPerRow = 2;

  if(savedRecipes !== null)
  {
    for (let i = 0; i < savedRecipes.length; i += cellsPerRow) {
      const rowCells = savedRecipes.slice(i, i + cellsPerRow);
      rows.push(rowCells);
    }
  }

  // alert the user that the remove function has been pressed
  const alertRemoveRecipe = (recipeName) => {
    // give response to show that a remove button is pressed
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
      'Remove Recipe',
      'Are you sure you want to remove this recipe?',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Remove Recipe'),
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {removeSavedRecipe(recipeName)},
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  // remove saved recipe from cookbook
  const removeSavedRecipe = async (recipeName) => {
    try {
      // retrieve the current saved recipes from the asyncstorage
      const savedRecipeData = await AsyncStorage.getItem('savedRecipes');
      if (savedRecipeData) {
        // parse the saved recipes from the cookbook asyncstorage as json
        const parsedData = JSON.parse(savedRecipeData);
        // remove the specific recipe from the parsedData array by filtering the recipeName
        const updatedData = parsedData.filter((name) => name !== recipeName);
        // save the new cookbook recipes back to the asyncstorage
        await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedData));
        // update the cookbook content to show that changes have been made and the recipe have been remove
        setSavedRecipes(updatedData);
      }
    } catch (error) {
      console.error('Error removing recipe from the cookbook:', error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView style={styles.content}>
        <View style={[styles.profileHeader, isDarkMode && styles.darkProfileHeader]}>
          {/*Settings button */}
          <TouchableOpacity style={styles.settingButton} onPress={() => goToSettingPage()}>
            <Image source={settingsImg} style={styles.settingImg}/>
          </TouchableOpacity>
          <ProfileInfo/>
        </View>

        {/*cookbook contents */}
        {/*displays the saved recipes */}
        <View>
          {/*header title */}
          <View style={[styles.titleContainer, isDarkMode && styles.darkTitleContainer]}>
            <Text style={[styles.cookbookTitle, isDarkMode && styles.darkCookBookTitle]}>
              Cookbook
            </Text>
          </View>

          <View style={styles.savedRecipes}>
            {/*saved recipe card*/}
            {rows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((recipeName, cellIndex) => (
                  <View key={cellIndex} style={styles.cell}>
                    <CookBookRecipeCard recipeName={recipeName} alertRemoveRecipe={alertRemoveRecipe}/>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    height: Dimensions.get('window').height,
    backgroundColor: '#EBE8D8',
  },
  darkContainer: {
    backgroundColor: 'black'
  },
  content: {
     marginBottom: '18%',
  },

  // profile header
  profileHeader:{
    width: Dimensions.get('window').width,
    padding: 27,
    paddingTop: 53,
    backgroundColor: '#FFF5E0',
  },
  darkProfileHeader: {
    backgroundColor: 'black'
  },
  settingButton: {
    alignSelf: 'flex-end',
    marginBottom: 5,
    backgroundColor:'#FFF5E0',
    borderRadius:18
  },
  settingImg: {
    height: 35,
    width: 35,
  },

  // cookbook content
  titleContainer: {
    padding: 8,
    width: Dimensions.get('window').width,
    backgroundColor:'#C38154',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  darkTitleContainer: {
    backgroundColor: '#363535'
  },
  cookbookTitle: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
  },
  darkCookBookTitle: {
    color: '#FFF5E0'
  },

  // Saved recipe card
  savedRecipes: {
    padding: 5
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    margin: 5,
    marginBottom: 0,
    marginLeft: 0,
  },
});

export default ProfilePage;
