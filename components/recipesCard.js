// for the category page
import React, { useEffect, useState } from 'react';
import {View, Text, Image} from 'react-native';

// component
import RecipeCard from './recipeCard';

// local json data
import breakfast from '../api/breakfast.json';
import dessert from '../api/dessert.json';
import pasta from '../api/pasta.json';
import side from '../api/side.json';
import starter from '../api/starter.json';
import vegan from '../api/vegan.json';
import vegetarian from '../api/vegetarian.json';

const RecipesCard = () =>{
  // breakfast json data from the local api folder
  const [breakData, setBreakData] = useState([]);
  // dessert json data
  const [dessertData, setDessertData] = useState([]);
  // pasta json data
  const [pastaData, setPastaData] = useState([]);
  // side json data
  const [sideData, setSideData] = useState([]);
  // starter json data
  const [starterData, setStarterData] = useState([]);
  // vegan json data
  const [veganData, setVeganData] = useState([]);
  // vegetarian
  const [vegeData, setVegeData] = useState([]);

  // breakfast
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast')
      // when the fetch function is called
      .then((response) => {
        // when the response status is 404 or 500
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        return response.json();
      })
      .then((json) => {
        // limit the data by 5
        const limit = json.meals.slice(0,5);
        setBreakData(limit)
      })
      .catch(() => {
        console.log('API fetch failed. Using local data instead.'); // Print an error message
        // Use the local data when API fetch fails
        // retrieve only 5 data from the local file
        setBreakData(breakfast.meals.slice(0,5));
      });
  }, []);

  // dessert
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
      // when the fetch function is called
      .then((response) => {
        // when the response status is 404 or 500
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        return response.json();
      })
      .then((json) => {
        // limit the data by 5
        const limit = json.meals.slice(0,5);
        setDessertData(limit)
      })
      .catch(() => {
        console.log('API fetch failed. Using local data instead.'); // Print an error message
        // Use the local data when API fetch fails
        setDessertData(dessert.meals.slice(0,5));
      });
  }, []);

  // pasta
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta')
      // when the fetch function is called
      .then((response) => {
        // when the response status is 404 or 500
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        return response.json();
      })
      .then((json) => {
        // limit the data by 5
        const limit = json.meals.slice(0,5);
        setPastaData(limit)
      })
      .catch(() => {
        console.log('API fetch failed. Using local data instead.'); // Print an error message
        // Use the local data when API fetch fails
        setPastaData(pasta.meals.slice(0,5));
      });
  }, []);

  // side
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Side')
      // when the fetch function is called
      .then((response) => {
        // when the response status is 404 or 500
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        return response.json();
      })
      .then((json) => {
        // limit the data by 5
        const limit = json.meals.slice(0,5);
        setSideData(limit)
      })
      .catch(() => {
        console.log('API fetch failed. Using local data instead.'); // Print an error message
        // Use the local data when API fetch fails
        setSideData(side.meals.slice(0,5));
      });
  }, []);

  // starter
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter')
      // when the fetch function is called
      .then((response) => {
        // when the response status is 404 or 500
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        return response.json();
      })
      .then((json) => {
        // limit the data by 5
        const limit = json.meals.slice(0,5);
        setStarterData(limit)
      })
      .catch(() => {
        console.log('API fetch failed. Using local data instead.'); // Print an error message
        // Use the local data when API fetch fails
        setStarterData(starter.meals.slice(0,5));
      });
  }, []);

  // vegan
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan')
      // when the fetch function is called
      .then((response) => {
        // when the response status is 404 or 500
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        return response.json();
      })
      .then((json) => {
        // limit the data by 5
        const limit = json.meals.slice(0,5);
        setVeganData(limit)
      })
      .catch(() => {
        console.log('API fetch failed. Using local data instead.'); // Print an error message
        // Use the local data when API fetch fails
        setVeganData(vegan.meals.slice(0,5));
      });
  }, []);

  // vegetarian
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian')
      // when the fetch function is called
      .then((response) => {
        // when the response status is 404 or 500
        if (!response.ok) {
          throw new Error('Network response status 404');
        }
        return response.json();
      })
      .then((json) => {
        // limit the data by 5
        const limit = json.meals.slice(0,5);
        setVegeData(limit)
      })
      .catch(() => {
        console.log('API fetch failed. Using local data instead.'); // Print an error message
        // Use the local data when API fetch fails
        setVegeData(vegetarian.meals.slice(0,5));
      });
  }, []);
  
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.strMealThumb }} style={styles.mealThumbNail} />
      <Text>{item.strMeal}</Text>
    </View>
  );
  
  return(
    <View>
      {/*breakfast recipes */}
      <RecipeCard title='Breakfast' data={breakData}/>
      {/* dessert recipes */}
      <RecipeCard title='Dessert' data={dessertData}/>
      {/* pasta recipes */}
      <RecipeCard title='Pasta' data={pastaData}/>
      {/* side recipes */}
      <RecipeCard title='Side' data={sideData}/>
      {/* starter recipes */}
      <RecipeCard title='Starter' data={starterData}/>
      {/* vegan recipes */}
      <RecipeCard title='Vegan' data={veganData}/>
      {/* vegetarian recipes */}
      <RecipeCard title='Vegetarian' data={vegeData}/>
    </View>
  )
}

export default RecipesCard;

