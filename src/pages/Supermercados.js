import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, AsyncStorage, StyleSheet } from 'react-native';

import api from '../services/api';

import SupermercadoResumo from '../components/SupermercadoResumo';

export default function Login({ navigation }) {
  const [mercados, setMercados] = useState([]);

  async function handleSubmit() {

    await AsyncStorage.setItem('accessToken', '');

    navigation.navigate('Login');

  };

  async function handleBuscar() {

    const response = await api.get('/Mercado/Lista');

    console.log(response.data);

    setMercados(response.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>

      <Text>Supermercados</Text>

      {mercados.map(mercado => <SupermercadoResumo key={mercado.id} mercado={mercado} />)}

      <TouchableOpacity onPress={handleBuscar} style={styles.button}>
        <Text style={styles.buttonText}>Buscar mercados</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Voltar para login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    height: 42,
    width: 200,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});