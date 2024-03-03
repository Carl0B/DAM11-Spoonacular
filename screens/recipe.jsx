import React, { useState, useEffect } from "react";
import {Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView,} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation, useRoute } from "@react-navigation/native";

const colorPalette = {
  green: "rgba(0, 66, 37, 1)" /*Hex  #004225*/,
  whitelight: "rgba(245, 245, 220, 1)" /*Hex  #F5F5DC*/,
  yellow: "rgba(255, 176, 0, 1)" /*Hex  #FFB000*/,
  pinklight: "rgba(255, 207, 157, 1)" /*Hex  #FFCF9D*/,
  white: "rgba(255, 255, 255, 1)" /*Hex  #FFFFFF*/,
};

export default function Recipe() {
  //Object to can obtain the params
  const route = useRoute();
  //Obtain the params we receive from the previous screen
  const { id } = route.params;

  const [foodID, setFoodID] = useState(JSON.stringify(id));

  
  //Fonts used on this screen
  const [fontsLoaded] = useFonts({
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  const [prueba, setPrueba] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Define an async function

      try {
        let response_prueba = await fetch(
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}"
        );
        let data_prueba = await response_prueba.json();
        setPrueba(data_prueba);
      } catch (error) {
        setPrueba(null);
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const navigation = useNavigation();

  const navigateToRecipe = (idMeal) => {
    navigation.navigate('Recipe', {id: idMeal});
  };

  return (
    <SafeAreaView style = {RecipeStyles.container}>
    <View style = {RecipeStyles.bar}>
      <Image source={require('../assets/icons/logo.png')} style={RecipeStyles.logo}/>
      <Text style={RecipeStyles.title}>Deli-Meals</Text>
    </View>
    <View style={RecipeStyles.recipes}>
      {prueba && (
        <>
          <View 
          style = {RecipeStyles.container}
          data={prueba.meals}
          keyExtractor={(item) => item.foodID}
          renderItem={({ item }) => (
            <>
              <View style ={RecipeStyles.recipeContainer}>

              <Text style ={RecipeStyles.recipeTitle}>{item.srtMeal}</Text>
              <Text style ={RecipeStyles}>{item.strMealThumb}</Text>
              <Text style ={RecipeStyles.recipeTitle}>{item.strImageSource}</Text>
              <Text style ={RecipeStyles.recipeTitle}>{item.strCreativeCommonsConfirmed}</Text>
              <Text style ={RecipeStyles}>{item.dateModified}</Text>



              <Text style ={RecipeStyles.recipeTitle}>{item.strTags}</Text>
              <Text style ={RecipeStyles.recipeTitle}>{item.BeaverTails}</Text>


              <Text style ={RecipeStyles.recipeTitle}>{item.strIngredient1}</Text>
              <Text style ={RecipeStyles.recipeTitle}>{item.strMeasure1}</Text>


              <Text style ={RecipeStyles.recipeTitle}>{item.strInstructions}</Text>
              <Text style ={RecipeStyles.recipeTitle}>{item.strYoutube}</Text>
              <Text style ={RecipeStyles.recipeTitle}>{item.strSource}</Text>


              

              </View>
              
              
            </>
             
          )}
        
        >
          <Text>{foodID}</Text>

        </View>
          
        </>
      )}
    
    </View>
    </SafeAreaView>
  );
}

const RecipeStyles = StyleSheet.create({
  bar: 
  {
    backgroundColor: colorPalette.green,
    width: '100%',
    height: '10%',
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:
  {
    fontFamily: 'Inter-ExtraBold',
    color: colorPalette.whitelight,
    fontSize: 16,
  },
  logo:
  {
      height: 40,
      width: 40,
      marginRight: 10,
  },
  container: {
    backgroundColor: colorPalette.whitelight,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 5,
  },

  recipes: {
    flex: 1,
    display: 'flex',
  },
  recipeContainer:{
    top:150,
    backgroundColor: colorPalette.white,
    height: 150,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  recipeText:{
    width: '50%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  recipeTitle:{
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    textAlign: 'center',
  },

  
});

