import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, Dish } from './type'; 
import { StackNavigationProp } from '@react-navigation/stack';

type InfoPageNavigationProp = StackNavigationProp<RootStackParamList, 'InfoPage'>;

const InfoPage: React.FC = () => {
  const navigation = useNavigation<InfoPageNavigationProp>();
  const [dishData, setDishData] = useState<Dish>({
    name: '',
    description: '',
    course: '',
    price: '',
  });
  const [dishesArray, setDishesArray] = useState<Dish[]>([]);

  const handleSaveData = () => {
    if (dishData.name && dishData.description && dishData.course && dishData.price) {
      setDishesArray([...dishesArray, dishData]);
      Alert.alert('Success', 'Dish information saved successfully!');
      setDishData({ name: '', description: '', course: '', price: '' });
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const handleClear = () => {
    setDishData({ name: '', description: '', course: '', price: '' });
  };

  const handleGoToHomePage = () => {
    navigation.navigate('HomePage', { dishesArray });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishData.name}
        onChangeText={(text) => setDishData({ ...dishData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Dish Description"
        value={dishData.description}
        onChangeText={(text) => setDishData({ ...dishData, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Courses"
        value={dishData.course}
        onChangeText={(text) => setDishData({ ...dishData, course: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Dish Price"
        keyboardType="numeric"
        value={dishData.price}
        onChangeText={(text) => setDishData({ ...dishData, price: text })}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSaveData} />
        <Button title="Clear" onPress={handleClear} color="#FF6347" />
        <Button title="Home" onPress={handleGoToHomePage} color="#1E90FF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderBlockColor:'#705447',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#4B3830' ,
  },
});

export default InfoPage;
