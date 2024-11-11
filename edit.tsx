import React, { useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, ImageBackground  } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Dish } from './type';
import { StackNavigationProp } from '@react-navigation/stack';

type EditPageNavigationProp = StackNavigationProp<RootStackParamList, 'EditPage'>;

const EditPage: React.FC = () => {
  // Use the useRoute hook to access the route params
  const route = useRoute<RouteProp<RootStackParamList, 'EditPage'>>();
  const { dishesArray } = route.params;
  
  const [dishes, setDishes] = useState<Dish[]>(dishesArray);
  const navigation = useNavigation<EditPageNavigationProp>();

  const handleDelete = (index: number) => {
    const updatedDishes = dishes.filter((_, i) => i !== index);
    setDishes(updatedDishes);
  };

  const handleSave = () => {
    Alert.alert('Saved', 'Your changes have been saved!');
    navigation.goBack();
  };
  const backgroundImage = require('my-mast-app/_image/background.png');
  const source={backgroundImage}


  return (
    <View style={styles.container}>
        <ImageBackground
      source={{ uri: 'my-mast-app/_image/background.png' }}  
      style={styles.background}
      resizeMode="cover">
      <Text style={styles.header}>Edit Menu</Text>
      
      <FlatList
        data={dishes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.dishItem}>
            <Text>Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Curses: {item.course}</Text> {/* Fixed property name from 'course' to 'courses' */}
            <Text>Price: ${item.price}</Text>
            <Button title="Delete" onPress={() => handleDelete(index)} color="#FF6347" />
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={handleSave} />
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
  dishItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#1B1411'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditPage;

