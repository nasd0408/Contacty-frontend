import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleLogin = async (email, password) => {
    try {
      const requestBody = {
        email,
        password,
      };
      const response = await axios.post('http://192.168.1.103:5001/api/users/login', requestBody);
  
     
  
      const { accessToken } = response.data;
      await SecureStore.setItemAsync("accessToken", accessToken)
      console.log(accessToken);
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert('Error de validación: ' + error.response.data.message);
            break;
  
          case 404:
            alert('No encontrado: ' + error.response.data.message);
            break;
  
          case 401:
            alert('Sin autorización: ' + error.response.data.message);
            break;
  
          case 403:
            alert('Prohibido: ' + error.response.data.message);
            break;
  
          case 500:
            alert('Error de servidor: ' + error.response.data.message);
            break;
  
          default:
            alert('Error: ' + error.response.data.message);
            break;
        }
      } else {
        alert('Error en la solicitud: ' + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.title}>{email}</Text>
      <TouchableOpacity style={styles.button} onPress={()=>handleLogin(email,password)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.registerLinkText}>Don't have an account? Register here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 20
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    fontSize: 16
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  registerLink: {
    marginTop: 20
  },
  registerLinkText: {
    color: '#fff',
    textDecorationLine: 'underline'
  }
});

export default LoginScreen;
