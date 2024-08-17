//view all recipe of a category components
import {View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

// components
import {useDarkMode} from '../components/darkMode';
import { useFontSize } from '../components/fontSize';

const ViewAllCard = ({title,data}) =>{
  
  const navigation = useNavigation();

  const goToRecipePage = (itemName) => {
    // navigate to the recipe page when the recipe card was pressed
    navigation.navigate('Recipe',{recipeName:itemName});
  };

  const goToViewAllPage = (title)=> {
    navigation.navigate('Recipes', {title:title})
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

  return(
    <View>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        {title}
      </Text>
      <ScrollView>
        {data.map((item, index) => (
          <View key={index} style={[styles.item, isDarkMode && styles.darkItem]}>
            <TouchableOpacity onPress={() => goToRecipePage(item.strMeal)}>
              <Image source={{ uri: item.strMealThumb }} style={styles.mealThumbNail} />
              <Text style={[styles.itemName, isDarkMode && styles.darkItemName, {fontSize}]}>{item.strMeal}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    padding: 10,
    paddingBottom: 5,
    fontFamily: 'CR-regular',
    fontSize: 27,
  },
  darkTitle: {
    color:'#FFF5E0'
  },
  
  // category items css
  item: {
    flexDirection: 'column',
    margin:40,
    marginBottom: 0,
    paddingBottom:5,
    maxWidth:Dimensions.get('window').width,
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
})

export default ViewAllCard;

