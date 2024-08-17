// perform faster than reading from an array
//  if the array is too long can use this method
import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

// components
import RecipesCard from '../components/recipesCard';
import CategoryCard from '../components/categoryCard';
import {useDarkMode} from '../components/darkMode'

// image
// image from unsplash website (open source)
import image from '../assets/images/cutting_board.jpg';
// Arrow Up icon by Icons8
import arrowImage from '../assets/images/icons8-arrow-up-48.png';

const SearchPage = () =>{
  const scrollViewRef = useRef(null);

  // function to scroll to the category section based on category name when the categoryCard is pressed
  const scrollToCategorySection = (categoryName) => {

    let categorySectionOffset;

    // when specific categoryCard was pressed it would scroll down to its category section based on the category name
    // i manually calculated the scrollview offset that would allow the user reach the category section
    switch (categoryName) {
      case 'Breakfast':
        categorySectionOffset = 550;
        break;
      case 'Dessert':
        categorySectionOffset = 820;
        break;
      case 'Pasta':
        categorySectionOffset = 1080;
        break;
      case 'Side':
        categorySectionOffset = 1360;
        break;
      case 'Starter':
        categorySectionOffset = 1650;
        break;
      default:
        categorySectionOffset = 0;
    }
    // vegan and vegetarian category section is at the end of the scrollView so i just implemented the scrollToEnd method
    // others use calculated offset value
    if (categoryName === 'Vegan' || categoryName === 'Vegetarian') 
    {
        scrollViewRef.current.scrollToEnd({ animated: true });
    } else 
    {
      scrollViewRef.current.scrollTo({ y: categorySectionOffset, animated: true });
    }
  };

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
        {/* search recipe bar*/}
        <View>
          <ImageBackground source={image} style={styles.backgroundImg}>
            <View style={styles.headerContainer}>
              <Text style={styles.searchHeader}>What Do You Want To Cook For Today?</Text>
            </View>
          </ImageBackground>
        </View>

        {/* categories logo */}
        <CategoryCard scrollToCategorySection={scrollToCategorySection
        }/>
        
        {/*recipe card from each different category*/}
        <RecipesCard/>
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
    flex: 1,
    backgroundColor: '#FFF5E0',
    alignItems: 'flex-start',
  },
  darkContainer: {
    backgroundColor: 'black'
  },
  content:{
     marginBottom: '18%',
  },

  // header css
  headerContainer:{
    paddingTop:65,
    paddingBottom:25,
  },
  searchHeader: {
    alignSelf: 'center',
    marginTop:30,
    marginBottom:10,
    fontSize:30,
    fontWeight:'bold',
  },
  backgroundImg:{
    justifyContent:'center',
    resizeMode:'cover',
    width:'100%',
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
});

export default SearchPage;