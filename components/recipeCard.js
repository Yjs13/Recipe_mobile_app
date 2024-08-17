//recipe card layout and gui elements
import {View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

// components
import {useDarkMode} from '../components/darkMode';
import { useFontSize } from '../components/fontSize';

const RecipeCard = ({title,data}) =>{
  
  const navigation = useNavigation();

  const goToRecipePage = (itemName) => {
    // navigate to the recipe page when the recipe card was pressed
    navigation.navigate('Recipe',{recipeName:itemName});
  };

  const goToViewAllPage = (categoryTitle)=> {
    navigation.navigate('Recipes', {categoryName:categoryTitle})
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
      <View style={styles.cardHeader}>
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
          {title}
        </Text>
        <TouchableOpacity style={styles.viewAll} onPress={() => goToViewAllPage(title)}>
          <Text style={[styles.itemName, isDarkMode && styles.darkItemName, {fontSize}]}>View all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  title: {
    padding: 10,
    paddingBottom: 5,
    fontFamily: 'CR-regular',
    fontSize: 27,
  },
  darkTitle: {
    color:'#FFF5E0'
  },

  // view all recipes of the selected category button
  viewAll: {
    marginRight: 10,
    alignSelf: 'center',
    backgroundColor: '#C38154',
    borderRadius: 5,
  },

  // category items css
  item: {
    flexDirection: 'column',
    margin:10,
    paddingBottom:5,
    maxWidth:Dimensions.get('window').width/2,
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
    width: Dimensions.get('window').width/2, 
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  }
})

export default RecipeCard;

