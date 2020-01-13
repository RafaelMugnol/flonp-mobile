import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar,
  AsyncStorage, StyleSheet, FlatList, RefreshControl
} from 'react-native';

import api from '../services/api';

import SupermercadoResumo from '../components/SupermercadoResumo';

export default function Supermercados({ navigation }) {
  const [mercados, setMercados] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    doRefresh();
  }, []);


  async function handleSubmit() {

    await AsyncStorage.setItem('accessToken', '');

    navigation.navigate('Login');

  };


  async function doRefresh() {
    setRefreshing(true);

    const response = await api.get('/Mercado/Lista');

    setMercados(response.data);

    setRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>

      <FlatList
        style={styles.list}
        data={mercados}
        renderItem={({ item }) => <SupermercadoResumo mercado={item} />}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={doRefresh}
          />
        }
      />

      {/* {mercados.map(mercado => <SupermercadoResumo key={mercado.id} mercado={mercado} />)} */}

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
    height: 20,
    width: '100%',
    backgroundColor: '#455a64',
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

  list: {
    width: '100%',
  },
});