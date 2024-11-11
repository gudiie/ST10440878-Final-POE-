import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Dish } from './type';
import { StackNavigationProp } from '@react-navigation/stack';

type CartPageNavigationProp = StackNavigationProp<RootStackParamList, 'CartPage'>;

const CartPage: React.FC = () => {
  // Use the useRoute hook to access route params
  const route = useRoute<RouteProp<RootStackParamList, 'CartPage'>>();
  const { cart } = route.params;
  
  const navigation = useNavigation<CartPageNavigationProp>();
  
  const calculateTotalPrice = () => {
    return cart.reduce((total: number, dish: { price: string; }) => total + parseFloat(dish.price), 0);
  };

  const handleOrder = () => {
    navigation.goBack();
    alert('Your order has been placed!');
  };

  return (
    <View style={styles.container}>
         <ImageBackground
      source={{ uri: 'my-mast-app/_image/background.png' }}  
      style={styles.background}
      resizeMode="cover">
      <Text style={styles.header}>Your Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text>Name: {item.name}</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        )}
      />

      <Text style={styles.totalText}>Total: ${calculateTotalPrice().toFixed(2)}</Text>

      <Button title="Place Order" onPress={handleOrder} />
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
    borderColor: '#4B3830',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#4B3830'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartPage;
