import React, { useState, useRef } from 'react';
import { ScrollView, Dimensions, Image, View, StyleSheet, TouchableOpacity } from 'react-native';

// components
import HomeRecipesCard from '../components/homeRecipesCard';
import {useDarkMode} from '../components/darkMode';

// image
// Photo by Eaters Collective on Unsplash 
import pastaImage from '../assets/images/pasta.jpg';
// Arrow Up icon by Icons8
import arrowImage from '../assets/images/icons8-arrow-up-48.png';

const HomePage = () =>{

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

  // home recipes card content
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView style={styles.content} ref={scrollViewRef} onScroll={handleScroll}>
        <Image source={pastaImage} style={styles.headerImage}/>
        <HomeRecipesCard/>
      </ScrollView>
      {/* scroll to top button */}
      {showScrollButton && (
        <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
          {/*Arrow Up icon by Icons8 */}
          <Image source={arrowImage} style={styles.scrollButtonImage}/>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  headerImage: {
    width: Dimensions.get('window').width,
    height: 230,
  },

  // scroll to top button style
  scrollButton: {
    position: 'absolute',
    bottom: 84,
    right: '4%',
    backgroundColor: '#F6635C',
    borderRadius: 32,
    padding:15,
  },
  scrollButtonImage: {
    width:31,
    height:25,
  },

});

export default HomePage;
