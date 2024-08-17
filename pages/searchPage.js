import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// components
import { useFontSize } from '../components/fontSize';
import {useDarkMode} from '../components/darkMode'

// image
// Arrow Up icon by Icons8
import arrowImage from '../assets/images/icons8-arrow-up-48.png';

const SearchRecipePage = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // fetch the recipes from open api with the searchQuery
    const fetchRecipes = async () => {
      try {
        // if the search query is empty
        if (searchQuery.trim() === '') {
          setRecipesData([]);
          return;
        }

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        const json = await response.json();

        if (!json || !json.meals) {
          console.log('API fetch failed. Using local data instead.');
          setRecipesData([]);
        } else {
          setRecipesData(json.meals);
        }
      } catch (error) {
        console.error('API fetch failed:', error);
        setRecipesData([]);
      }
    };

    fetchRecipes();
  }, [searchQuery]);

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

  // switch the fontsize
  const { fontSize } = useFontSize();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/*search bar input*/}
      <TextInput
        style={[styles.searchInput, isDarkMode && styles.darkSearchInput]}
        placeholder="Search for recipes..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />

      <ScrollView style={styles.content} ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16}>
        {recipesData.map((item, index) => (
          <View key={index} style={[styles.item, isDarkMode && styles.darkItem]}>
            <TouchableOpacity onPress={() => goToRecipePage(item.strMeal)}>
              <Image source={{ uri: item.strMealThumb }} style={styles.mealThumbNail} />
              <Text style={[styles.itemName, isDarkMode && styles.darkItemName, { fontSize }]}>{item.strMeal}</Text>
            </TouchableOpacity>
          </View>
        ))}
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
    backgroundColor: 'black',
  },
  content: {
    width: '100%',
  },

  // scroll to top button style
  scrollButton: {
    position: 'absolute',
    bottom: '10%',
    right: '3%',
    backgroundColor: '#F6635C',
    borderRadius: 32,
    padding:15
  },
  scrollButtonImage: {
    width:31,
    height:25,
  },

  // Search input style
  searchInput: {
    marginTop: 80,
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#C38154',
    borderRadius: 5,
  },
  darkSearchInput: {
    color: 'white',
  },

  // recipes card css
  item: {
    margin: 40,
    marginBottom: 0,
    marginTop: 20,
    paddingBottom:5,
    maxWidth:Dimensions.get('window').width,
    flexDirection: 'column',
    borderRadius: 8,
    backgroundColor:'white',
    shadowOffset:{
      width:0,
      height:4,
    },
    shadowRadius:4,
    shadowOpacity:0.5,
    shadowColor:'grey',
    elevation: 6,
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
    alignSelf:'center',
    width: '100%', 
    height: 170,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  }
});

export default SearchRecipePage;
