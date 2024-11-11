import React, { useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Alert, ImageBackground} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Dish } from './type';
import { StackNavigationProp } from '@react-navigation/stack';

type ShowSavedPageNavigationProp = StackNavigationProp<RootStackParamList, 'ShowSavedPage'>;

const ShowSavedPage: React.FC = () => {
  // Use the useRoute hook to access route params
  const route = useRoute<RouteProp<RootStackParamList, 'ShowSavedPage'>>();
  const { dishesArray } = route.params;
  
  const navigation = useNavigation<ShowSavedPageNavigationProp>();
  const [cart, setCart] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(dishesArray);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleFilterByCourse = (course: string) => {
    setSelectedCourse(course);
    const filtered = dishesArray.filter((dish: { course: string; }) => dish.course === course);
    setFilteredDishes(filtered);
  };

  const handleAddToCart = (dish: Dish) => {
    setCart(prevCart => [...prevCart, dish]);
    Alert.alert('Added to Cart', `${dish.name} has been added to your cart.`);
  };

  const handleGoToCart = () => {
    navigation.navigate('CartPage', { cart });
  };

  const dishesToDisplay = selectedCourse ? filteredDishes : dishesArray;

  const backgroundImage = require('my-mast-app/_image/background.png');
  const source={backgroundImage}

  return (
    <View style={styles.container}>
        <ImageBackground
      source={{ uri: 'my-mast-app/_image/background.png' }}  
      style={styles.background}
      resizeMode="cover">
      <Text style={styles.header}>Saved Menu Items</Text>

      <View style={styles.filterContainer}>
        <Button title="All Courses" onPress={() => setFilteredDishes(dishesArray)} />
        {['Appetizer', 'Main Course', 'Dessert'].map(course => (
          <Button key={course} title={course} onPress={() => handleFilterByCourse(course)} />
        ))}
      </View>

      <FlatList
        data={dishesToDisplay}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text>Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Courses: {item.course}</Text>
            <Text>Price: ${item.price}</Text>

            <TouchableOpacity onPress={() => handleAddToCart(item)}>
              <Text style={styles.addItemButton}>Add Item</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button title="Items" onPress={handleGoToCart} />
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterContainer: {
    marginBottom: 20,
  },
  dishItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  addItemButton: {
    color: 'blue',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#1B1411'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShowSavedPage;

