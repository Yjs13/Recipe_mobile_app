import {View, Text, Image, TouchableOpacity,Dimensions, StyleSheet} from 'react-native';
import { useFonts } from 'expo-font';

// component
import {useDarkMode} from '../components/darkMode';
import { useFontSize } from '../components/fontSize';

// categories json data for the logo
import meal from '../api/categories.json';

const CategoryCard = ({ scrollToCategorySection }) =>{

  // use to handle when the categoryCard in the search page was pressed
  const handleCategoryCardPress = (categoryName) => {
    // call the function passed from the SearchPage
    scrollToCategorySection(categoryName);
  };

  // categories logo
  // set it to be 3 columns per row
  const rows = [];
  const cellsPerRow = 3;

  for (let i = 0; i < meal.categories.length; i += cellsPerRow) {
    const rowCells = meal.categories.slice(i, i + cellsPerRow);
    rows.push(rowCells);
  }

  // darkMode function
  const { isDarkMode } = useDarkMode();

  // switch the fontsize
  const { fontSize } = useFontSize();

  // retrieve from open source google font website
  // using external fontto style the text
  const [isLoaded] = useFonts({
    "CR-regular": require("../assets/fonts/Crete_Round/CreteRound-Regular.ttf")
  });

  return(
    <View>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        Categories
      </Text>
      <View style={styles.table}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((meal, cellIndex) => (
              <View key={cellIndex} style={styles.cell}>
                <TouchableOpacity onPress={() => handleCategoryCardPress(meal.strCategory)}>
                  <Image source={{uri: meal.strCategoryThumb}} style={styles.logoPic}/>
                  <Text style={[styles.categoryName, isDarkMode && styles.darkCategoryName, {fontSize}]}>{meal.strCategory}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    padding:10,
    fontFamily: 'CR-regular',
    fontSize:30,
  },
  darkTitle: {
    color:'#FFF5E0'
  },
  table: {
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:6
  },
  logoPic: {
    width:Dimensions.get('window').width/4,
    height:80,
    backgroundColor:'#FFF5E0',
    borderRadius:11,
  },
  categoryName:{
    fontSize:15,
    fontWeight:'bold',
  },
  darkCategoryName: {
    color:'#FFF5E0'
  }
})

export default CategoryCard;