import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
        navigate('/information');
    }, 3000); 
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('my-mast-app/_image/icon.png')}
        style={styles.profileIcon}
      />
      <Text style={styles.welcomeText}>Welcome Mr Christoffel</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B3830', 
  },
  profileIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
