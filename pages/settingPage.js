import { SafeAreaView, StyleSheet, Switch, Dimensions} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useNavigation } from '@react-navigation/native';

// components
import { useDarkMode } from '../components/darkMode';
import { useFontSize } from '../components/fontSize';

const SettingsPage = () =>{

  // switch between dark and light
  const { isDarkMode, switchDarkMode } = useDarkMode();

  // switch the fontsize
  const { fontSize } = useFontSize();

  // apply dark mode styles based on the state
  const containerStyle = isDarkMode ? styles.containerDark : styles.containerLight;
  const cellStyle = isDarkMode ? styles.cellDark : styles.cellLight;
  const cellTextStyle = isDarkMode ? styles.cellTextDark : styles.cellTextLight;

  const navigation = useNavigation();
  const goToAboutPage = () => {
    // navigate to the about page
    navigation.navigate('Dino Culinary');
  };

  const goToFontSizePage = () => {
    // navigate to the font size page
    navigation.navigate('Font Size');
  };

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <TableView style={styles.table}>
        <Section header="Preferences" headerTextStyle={styles.headerText}>
          <Cell
            cellStyle="Basic"
            title="Dark Mode"
            titleTextStyle={[cellTextStyle, {fontSize}]}
            cellAccessoryView={<Switch value={isDarkMode}
                onValueChange={switchDarkMode}/>}
            contentContainerStyle={cellStyle}
          />
          <Cell
            cellStyle="Basic"
            accessory="DisclosureIndicator"
            title="Font Size"
            titleTextStyle={[cellTextStyle, {fontSize}]}
            onPress={() => goToFontSizePage()}
            contentContainerStyle={cellStyle}
          />
        </Section>
        
        <Section header="More" headerTextStyle={styles.headerText}>
          <Cell
            cellStyle="Basic"
            accessory="DisclosureIndicator"
            title="About Us"
            titleTextStyle={[cellTextStyle, {fontSize}]}
            onPress={() => goToAboutPage()}
            contentContainerStyle={cellStyle}
          />
        </Section>
      </TableView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    height:Dimensions.get('window').height,
  },

  // tableView styling
  table: {
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 20, 
    fontWeight:'bold', 
    color:'#675D50'
  },

  // Dark mode on
  containerDark: {
    backgroundColor: 'black',
  },
  containerLight: {
    backgroundColor: '#FFF5E0',
  },
  cellDark: {
    backgroundColor: '#282828',
  },
  cellLight: {
    backgroundColor: 'white',
  },
  cellTextDark: {
    color:'#FFF5E0'
  },
  cellTextLight: {
    color: 'black'
  }
});

export default SettingsPage;
