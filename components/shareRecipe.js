import {Alert, Share, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as Haptics from 'expo-haptics';

// image
// Share icon by Icons8
// https://icons8.com
import image from '../assets/images/icons8-share-32.png';

// source the specific recipe source url
// it contains the recipe content
const ShareRecipe = ({ source }) => {
  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message:
          source,
      });
      // if an share action is made
      if (result.action === Share.sharedAction) 
      {
        // when the shared action success it would give out a haptic vibration
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (result.activityType) 
        {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) 
      {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={handleSharePress} style={styles.button}>
        <Image source={image} style={styles.buttonImg}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button:{
    marginTop:15,
    padding:3,
    backgroundColor:'#FFF5E0',
    borderRadius:30,
  },
  buttonImg: {
    height: 26,
    width: 26
  }
})

export default ShareRecipe;