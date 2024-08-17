import React, { useCallback} from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
// lotties open source library for react native
// use json based animation
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';

// components
import {useDarkMode} from '../components/darkMode'

// TheMealDB website url
const mealdbUrl = 'https://www.themealdb.com/api.php';
// Icons8 website url
const icons8Url = 'https://icons8.com/';

const Link = ({url}) => {
  
  // function to direct user to website when the link is pressed 
  const handleLinkPress = useCallback(async () => {
    // check if the link is supported
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // give haptic alert to user when it exit the app to the website in outer browser
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      // open url in the mobile browser (direct to the browser by exit the application)
      await Linking.openURL(url);
    } else {
      Alert.alert(`URL is not supported: ${url}`);
    }
  }, [url]);

  return(
    <TouchableOpacity onPress={handleLinkPress}>
      <Text style={styles.link}>
        {url}
      </Text>
    </TouchableOpacity>
  )
}

const AboutPage = () =>{
  
  // retrieve from open source google font website
  // using external fontto style the text
  const [isLoaded] = useFonts({
    "Courgette-regular": require("../assets/fonts/Courgette/Courgette-Regular.ttf")
  });

  // darkMode function
  const { isDarkMode } = useDarkMode();

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView>
        <View style={styles.aboutInfo}>
          <Text style={[styles.appName, isDarkMode && styles.darkAppName]}>
            Dino Culinary
          </Text>
          <Text style={[styles.paragraph, isDarkMode && styles.darkParagraph]}>
           Dino Culinary is a food recipe application that shares the recipes retrieved from the "TheMealDB" website with the user. "TheMealDB" is an open-source database that stores recipes from around the world. This application allows users to easily search, save, and share recipes using their mobile devices.
          </Text>

          {/*Recipe source information */}
          <View>
            <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
              Recipe Source
            </Text>
            {/*touchable link that direct the user to the mealdb website in outer browser view */}
            <Link url={mealdbUrl}/>
          </View>

          {/*Icons by Icons8 */}
          <View>
            <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
              Icons by Icons8
            </Text>
            {/*touchable link that direct the user to the mealdb website in outer browser view */}
            <Link url={icons8Url}/>
          </View>
        </View>

        <View>
          {/* display the animation from the local json file */}
          {/* free cooking animations retrieved from an open source website lottie*/}
          {/* https://lottiefiles.com/ */}
          <LottieView source={require("../assets/animation/animation_lm5onitt.json")} style={styles.cooking} loop autoPlay/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF5E0',
    padding: 8,
  },
  darkContainer: {
    backgroundColor: 'black'
  },

  // app info paragraph styling
  aboutInfo: {
    flex: 1,
    margin: 27,
    marginTop: 20,
  },
  appName: {
    marginBottom: 15,
    fontFamily: 'Courgette-regular',
    fontSize: 37,
    textAlign: 'center',
  },
  darkAppName: {
    color: '#FFF5E0'
  },
  paragraph: {
    fontSize: 19,
    marginBottom: 10,
  },
  darkParagraph: {
    color: '#FFF5E0'
  },

  // recipe source styling
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  darkTitle: {
    color: '#FFF5E0'
  },
  link: {
    fontSize:17,
    color:'#F6635C',
  },

  // animation styling
  cooking: {
    alignSelf: 'center',
    height: 190,
    width: 190
  },
});

export default AboutPage;
