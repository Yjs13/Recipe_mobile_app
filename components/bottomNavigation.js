// bottom navigation components for the app pages to navigate between pages in the app
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from '../pages/homePage';
import SearchPage from '../pages/searchPage';
import CategoryPage from '../pages/categoryPage';
import ProfilePage from '../pages/profilePage';

const Tab = createBottomTabNavigator();
// export default function App()
const BottomTab = () =>
{
    return(
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          width: '100%',
        },
        
      }}>
          {/*Tab.Screen order is important */}
          <Tab.Screen 
            name='Home' 
            component={HomePage} 
            options={{headerShown:false, 
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
            )}} 
          />
          <Tab.Screen 
            name='Search' 
            component={SearchPage} 
            options={{headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="magnify" color={color} size={size} />
            )}}
          />
          <Tab.Screen 
            name='Category' 
            component={CategoryPage} 
            options={{headerShown:false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="notebook" color={color} size={size} />
            )}}
          />
          <Tab.Screen 
            name='Profile' 
            component={ProfilePage} 
            options={{headerShown:false, 
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
            )}}
          />
      </Tab.Navigator>
    );
};

export default BottomTab;