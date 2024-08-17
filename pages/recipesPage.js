// fetch array data from a local JSON file in React Native
// perform faster than reading from an array
//  if the array is too long can use this method
import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// components
import ViewAllCard from '../components/viewAllCard';
import {useDarkMode} from '../components/darkMode'

// image
// image from unsplash website (open source)
import image from '../assets/images/cutting_board.jpg';
// Arrow Up icon by Icons8
import arrowImage from '../assets/images/icons8-arrow-up-48.png';

// local json data
import Breakfast from '../api/breakfast.json';
import Dessert from '../api/dessert.json';
import Pasta from '../api/pasta.json';
import Side from '../api/side.json';
import Starter from '../api/starter.json';
import Vegan from '../api/vegan.json';
import Vegetarian from '../api/vegetarian.json';
import Recommendations from '../api/recommendations.json';
import LatestRecipe from '../api/latest.json';

const RecipesPage = ({route}) =>{
  const { categoryName } = route.params;
  let localData;
  // Latest recipes file name is different from the category name
  if(categoryName !== 'Latest Recipes')
  {
    localData = require(`../api/${categoryName.toLowerCase()}.json`);
  }
  const [data, setData] = useState([]);

  // breakfast
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      // when the fetch function is called
      .then((response) => {
        // when the response status is 404 or 500
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        console.log(response.json())
        return response.json();
      })
      .then((json) => {
        if (!json || !json.meals) {
          console.log('API fetch failed. Using local data instead.');
          // Use the local data when API fetch is null
          // to ensure that the recommendations and latest recipes data does not crash the server
          if (categoryName === 'Latest Recipes') {
            setData(LatestRecipe.meals);
          } else {
            setData(localData.meals);
          }
        } else {
          // API data is available, use it
          setData(json.meals);
        }
      })
      .catch(() => {
        console.log('API fetch failed. Using local data instead.');
        // Use the local data when API fetch fails
        if(categoryName == 'Latest Recipes')
        {
          setData(LatestRecipe.meals)
        }
        else 
        {
          setData(localData.meals);
        }
      });
  }, [categoryName, localData]);
  
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.strMealThumb }} style={styles.mealThumbNail} />
      <Text>{item.strMeal}</Text>
    </View>
  );

  const scrollViewRef = useRef(null);

  // scroll to top function
  // set the state of the scroll to top button
  const [showScrollButton, setShowScrollButton] = useState(false);

  // scroll the page to top logic
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  // function that shows and hide the scroll to top button
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // set the showScrollButton state to true when the offsetY > 130
    setShowScrollButton(offsetY > 130);
  };

  // darkMode function
  const { isDarkMode } = useDarkMode();
  
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView style={styles.content} ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16}>
        {/*recipe card from each different category*/}
        <ViewAllCard title={categoryName} data={data}/>
      </ScrollView>

      {/* scroll to top button */}
      {showScrollButton && (
        <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
          {/*Arrow Up icon by Icons8 */}
          <Image source={arrowImage} style={styles.scrollButtonImage}/>
        </TouchableOpacity>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: '5%',
    flex: 1,
    backgroundColor: '#FFF5E0',
    alignItems: 'flex-start',
  },
  darkContainer: {
    backgroundColor: 'black'
  },
  content:{
     width:'100%',
  },

  // scroll to top button style
  scrollButton: {
    position: 'absolute',
    bottom: '4%',
    right: '3%',
    backgroundColor: '#F6635C',
    borderRadius: 32,
    padding:15
  },
  scrollButtonImage: {
    width:31,
    height:25,
  },
});

export default RecipesPage;
