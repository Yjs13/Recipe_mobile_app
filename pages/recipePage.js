// fetch array data from a local JSON file in React Native
// perform faster than reading from an array
//  if the array is too long can use this method
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, Dimensions, StyleSheet, Text, View, ImageBackground} from 'react-native';

// components
// share function
import ShareRecipe from '../components/shareRecipe';
import SaveRecipe from '../components/saveRecipe';
import {useDarkMode} from '../components/darkMode';
import { useFontSize } from '../components/fontSize';

const RecipePage = ({route}) =>{

  // extract recipe data name when the recipe card was pressed
  const { recipeName } = route.params;
  // recipe json data from the local api folder
  const [recipeData, setRecipeData] = useState([]);

  // darkMode function
  const { isDarkMode } = useDarkMode();

  // switch the fontsize
  const { fontSize } = useFontSize();

  // from the selected recipe card
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
        console.log('API fetch failed. Using local data instead.');
      });
  }, [recipeName]);

  //to store all the ingredients retrieved from the json data into an array 
  const ingredients = [];
  // make sure the recipe data was loaded and not null
  if(recipeData.length !== 0)
  {
    for (let i = 1; i <= 20; i++) 
    {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      const ingredient = recipeData[0][ingredientKey];
      const measure = recipeData[0][measureKey];
      
      // only retrieve the ingredients that is not null
      if (ingredient !== null && ingredient !== '') 
      {
        ingredients.push({ ingredient, measure });
      }
    }
  }

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView>
        {recipeData.map((item) => (
          <View>
            {/*Recipe image */}
            <View>
              <ImageBackground source={{ uri: item.strMealThumb }} style={styles.backgroundImg}>
                <View>
                  <Text style={styles.recipeName}>{item.strMeal}</Text>
                </View>
              </ImageBackground>
              <View style={styles.shareSave}>
                {/*share the recipe source link*/}
                <ShareRecipe source={item.strSource}/>
                {/*save the recipe to cookbook in profile page */}
                <SaveRecipe name={item.strMeal}/>
              </View>
            </View>

            {/*Recipe ingredients and measurements*/}
            <View>
              <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
                Ingredients
              </Text>
              <View style={styles.content}>
                {ingredients.map((item) => (
                  <View style={styles.ingredients}>
                    <View style={styles.cells}>
                      <Text style={[styles.text, isDarkMode && styles.darkText, {fontSize}]}>
                          {item.ingredient}
                      </Text>
                    </View>
                    <View style={styles.cells}>
                      <Text style={[styles.text, isDarkMode && styles.darkText, {fontSize}]}>
                        {item.measure}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/*Recipe instructions to cook */}
            <View>
              <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
                Instructions
              </Text>
              <View style={styles.content}>
                <Text style={[styles.text, isDarkMode && styles.darkText, {fontSize}]}>
                  {item.strInstructions}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0'
  },
  darkContainer: {
    backgroundColor: 'black'
  },
  content:{
    padding:18,
    paddingTop:0,
  },

  backgroundImg:{
    justifyContent:'center',
    resizeMode:'cover',
    height:Dimensions.get('window').height/2,
    width:'100%'
  },
  recipeName: {
    alignSelf: 'flex-start',
    marginTop:Dimensions.get('window').height/2.5,
    marginLeft:10,
    fontSize:30,
    fontWeight:'bold',
    color:'#fff',
  },
  shareSave: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    padding:10,
    paddingLeft:18,
    fontSize:27,
    fontWeight:'bold',
  },
  darkTitle: {
    color: '#FFF5E0'
  },
  text:{
    fontSize:18,
  },
  darkText: {
    color: '#FFF5E0'
  },
  ingredients:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:5,
  },
  cells:{
    flex:1,
  },
});

export default RecipePage;
