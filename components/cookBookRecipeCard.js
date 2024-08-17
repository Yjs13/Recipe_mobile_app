// saved recipe card layout on cookbook in profilePage
import React, { useEffect, useState } from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

// components
import { useDarkMode } from '../components/darkMode';
import { useFontSize } from '../components/fontSize';

// image
// More icon by Icons8
// https://icons8.com
import moreImg from '../assets/images/icons8-more-48.png';


const CookBookRecipeCard = ({recipeName, alertRemoveRecipe}) =>{
  
  const navigation = useNavigation();

  const goToRecipePage = (itemName) => {
    // navigate to the recipe page when the recipe card was pressed
    navigation.navigate('Recipe',{recipeName:itemName});
  };

  // darkMode function
  const { isDarkMode } = useDarkMode();

  // switch the fontsize
  const { fontSize } = useFontSize();

  // retrieve from open source google font website
  // using external font to style the text
  const [isLoaded] = useFonts({
    "CR-regular": require("../assets/fonts/Crete_Round/CreteRound-Regular.ttf")
  });

  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
      // when the fetch function is called
      .then((response) => {
        // when the response status is 404 or 500
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        return response.json();
      })
      .then((json) => {
        setRecipeData(json.meals);
      })
      .catch(() => {
        console.log('API fetch failed.');
      });
  }, [recipeName]);

  return(
    <View>
      {recipeData.map((item, index) => (
        <View key={index} style={[styles.item, isDarkMode && styles.darkItem]}>
          <TouchableOpacity onPress={() => goToRecipePage(item.strMeal)}>
            <ImageBackground source={{ uri: item.strMealThumb }} style={styles.mealThumbNail} imageStyle={{ borderRadius: 7}}>
              {/*to remove recipe from cookbook button */}
              <TouchableOpacity style={styles.moreButton} onPress={() => {alertRemoveRecipe(item.strMeal)}}>
                <Image source={moreImg} style={styles.moreImg}/>
              </TouchableOpacity>
            </ImageBackground>
            <Text style={[styles.itemName, isDarkMode && styles.darkItemName, {fontSize}]}>{item.strMeal}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

  // saved recipe items css
  item: {
    marginBottom: 5,
    paddingBottom: 5,
    width: Dimensions.get('window').width/2 -10,
    borderRadius: 7,
    backgroundColor: 'white',
  },
  darkItem: {
    backgroundColor: '#282828'
  },
  itemName: {
    fontSize:15,
    fontWeight:'bold',
    padding:7,
  },
  darkItemName: {
    color:'#FFF5E0'
  },
  mealThumbNail:{
    height: 170,
  },

  // remove recipe button
  moreButton: {
    alignSelf: 'flex-end',
    margin: 8,
    backgroundColor: 'black',
    opacity: 0.7,
    borderRadius: 21,
  },
  moreImg: {
    margin: 3,
    width: 31,
    height: 31,
  },
})

export default CookBookRecipeCard;

