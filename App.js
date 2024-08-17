import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// components
import RecipePage from './pages/recipePage';
import RecipesPage from './pages/recipesPage';
import SettingsPage from './pages/settingPage';
import FontSizePage from './pages/fontSizePage';
import AboutPage from './pages/aboutPage';
import BottomTab from './components/bottomNavigation';
import {DarkModeProvider} from './components/darkMode';
import { FontSizeProvider } from './components/fontSize';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DarkModeProvider>
      <FontSizeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="BottomTab">
            <Stack.Screen name="Recipe" component={RecipePage}/>
            <Stack.Screen name="Recipes" component={RecipesPage}/>
            <Stack.Screen name="Settings" component={SettingsPage}/>
            <Stack.Screen name="Font Size" component={FontSizePage}/>
            <Stack.Screen name="Dino Culinary" component={AboutPage}/>
            <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </FontSizeProvider>
    </DarkModeProvider>
  );
}