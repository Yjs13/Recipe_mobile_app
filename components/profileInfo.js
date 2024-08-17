import { Text, View, StyleSheet} from 'react-native';

// components
import {useDarkMode} from '../components/darkMode'

// lotties open source library for react native
// use json based animation
import LottieView from 'lottie-react-native';

const ProfileInfo = () =>{

  // darkMode function
  const { isDarkMode } = useDarkMode();

  return(
    <View style={styles.profileInfo}>
          <View style={[styles.profilePic, isDarkMode && styles.darkProfilePic]}>
            {/* display the animation from the local json file */}
            {/* free dinosaur animations retrieved from an open source website lottie*/}
            {/* https://lottiefiles.com/ */}
            <LottieView source={require("../assets/animation/animation_lm49oh8g.json")} style={styles.dinosaur} loop autoPlay/>
          </View>
          <Text style={[styles.username, isDarkMode && styles.darkUsername]}>
            Soo Yit Jing
          </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileInfo: {
    flexDirection:'row',
  },
  profilePic: {
    padding:8,
    marginRight: 22,
    borderRadius:60,
    backgroundColor:'#FC847E'
  },
  darkProfilePic: {
    backgroundColor:'#FFF5E0'
  },
  dinosaur: {
    height:96,
    width:96
  },
  username: {
    paddingTop: 15,
    fontSize: 21,
    fontWeight:'bold',
  },
  darkUsername: {
    color:'#FFF5E0'
  }
})


export default ProfileInfo;