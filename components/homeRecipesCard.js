import React, { useEffect, useState } from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// component
import RecipeCard from './recipeCard';
import {useDarkMode} from '../components/darkMode';
import { useFontSize } from '../components/fontSize';

// local json data
import recom from '../api/recommendations.json';
import latestRecipe from '../api/latest.json';
import brie from '../api/brie.json';
import chickPea from '../api/chickPea.json';
import vegan from '../api/vegan.json';

const HomeRecipesCard = () =>{

  // recommendation menu json data from the local api folder
  const [recomData, setRecomData] = useState([]);
  const [latestData, setLatestData] = useState([]);
  // vegan json data
  const [veganData, setVeganData] = useState([]);

  // darkMode function
  const { isDarkMode } = useDarkMode();

  // switch the fontsize
  const { fontSize } = useFontSize();
  
  // recommendations data
  useEffect(() => {
    setRecomData(recom.meals.slice(0, 5));
  }, []);

  // Latest recipe data
  useEffect(() => {
    setLatestData(latestRecipe.meals.slice(0, 5));
  }, []);

  // vegan data
  useEffect(() => {
    setVeganData(vegan.meals.slice(0,5));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.strMealThumb }} style={styles.mealThumbNail} />
      <Text>{item.strMeal}</Text>
    </View>
  );

  const navigation = useNavigation();

  const goToRecipePage = (itemName) => {
    // navigate to the recipe page when the recipe card was pressed
    navigation.navigate('Recipe',{recipeName:itemName});
  };

  return(
    <View>
      {/*recommendations recipes */}
      <RecipeCard title='Recommendations' data={recomData}/>
      {/*latest recipes */}
      <RecipeCard title='Latest Recipes' data={latestData}/>

      {/*Brie recipes (individual recipe card) */}
      <View style={[styles.card, isDarkMode && styles.darkCard]}>
        <TouchableOpacity onPress={() => goToRecipePage(brie.strMeal)}>
          <Image source={{ uri: brie.strMealThumb }} style={styles.cardThumbNail} />
          <Text style={[styles.cardName, isDarkMode && styles.darkCardName, {fontSize}]}>{brie.strMeal}</Text>
        </TouchableOpacity>
      </View>
      {/*Chickpea recipes */}
      <View style={[styles.card, isDarkMode && styles.darkCard]}>
        <TouchableOpacity onPress={() => goToRecipePage(chickPea.strMeal)}>
          <Image source={{ uri: chickPea.strMealThumb }} style={styles.cardThumbNail} />
          <Text style={[styles.cardName, isDarkMode && styles.darkCardName, {fontSize}]}>{chickPea.strMeal}</Text>
        </TouchableOpacity>
      </View>

      {/*Vegan recipes */}
      <RecipeCard title='Vegan' data={veganData}/>
    </View>
  )
}

const styles = StyleSheet.create({
  // category items css
  item: {
    flexDirection: 'column', // Display text and image side by side
    marginBottom: 10,
    paddingBottom:5,
    maxWidth:Dimensions.get('window').width/2,
    borderRadius: 8,
    backgroundColor:'white',
    margin:10,
  },
  mealThumbNail:{
    alignSelf:'center',
    width: Dimensions.get('window').width/2, 
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  // individual recipe card
  card: {
    marginBottom: 10,
    maxWidth:Dimensions.get('window').width,
    paddingBottom: 5,
    borderRadius: 8,
    backgroundColor:'white',
    margin:10,
    shadowOffset:{
      width:0,
      height:4,
    },
    shadowRadius:4,
    shadowOpacity:0.5,
    shadowColor:'grey',
    elevation: 6,
  },
  darkCard: {
    backgroundColor:'#282828'
  },
  cardThumbNail:{
    alignSelf:'center',
    width: Dimensions.get('window').width - 20, 
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardName: {
    fontSize:15,
    fontWeight:'bold',
    padding:7,
  },
  darkCardName: {
    color: '#FFF5E0'
  }
})

export default HomeRecipesCard;