import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Dish } from './type';
import { StackNavigationProp } from '@react-navigation/stack';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const HomePage: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'HomePage'>>();
  const { dishesArray } = route.params;
  const navigation = useNavigation<HomePageNavigationProp>();

  
  const calculateAveragePrice = (dishes: Dish[]) => {
    if (dishes.length === 0) return 0;
    const totalPrice = dishes.reduce((acc, dish) => acc + parseFloat(dish.price), 0);
    return totalPrice / dishes.length;
  };

  
  const calculateAveragePriceByCourse = (dishes: Dish[]) => {
    const coursePrices: { [key: string]: number[] } = {};

    dishes.forEach(dish => {
      if (!coursePrices[dish.course]) { 
        coursePrices[dish.course] = [];
      }
      coursePrices[dish.course].push(parseFloat(dish.price));
    });

    const averagePrices: { [key: string]: number } = {};
    Object.keys(coursePrices).forEach(course => {
      const totalPrice = coursePrices[course].reduce((acc, price) => acc + price, 0);
      averagePrices[course] = totalPrice / coursePrices[course].length;
    });

    return averagePrices;
  };

 
  const handleEditPageNavigation = () => {
    navigation.navigate('EditPage', { dishesArray });
  };

 
  const handleShowSavedPage = () => {
    navigation.navigate('ShowSavedPage', { dishesArray });
  };

  const averagePrice = calculateAveragePrice(dishesArray);
  const averagePriceByCourse = calculateAveragePriceByCourse(dishesArray);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      
      <Text>Average Price: ${averagePrice.toFixed(2)}</Text>

      <Text style={styles.subHeader}>Average Price by Course:</Text>
      {Object.keys(averagePriceByCourse).map((course) => (
        <Text key={course}>
          {course}: ${averagePriceByCourse[course].toFixed(2)}
        </Text>
      ))}

      <FlatList
        data={dishesArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text>Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Courses: {item.course}</Text> 
            <Text>Price: ${item.price}</Text>
          </View>
        )}
      />

      <Button title="Edit Page" onPress={handleEditPageNavigation} />
      <Button title="Show Saved Page" onPress={handleShowSavedPage} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {  flex: 1,
    padding: 20,
    borderBlockColor:'#705447'
 },
  header: {fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
 },
  subHeader: { /* sub-header styles */ },
  dishItem: { padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
 },
});

export default HomePage;

