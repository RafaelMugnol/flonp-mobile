import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar,
  AsyncStorage, StyleSheet, FlatList, RefreshControl
} from 'react-native';

import api from '../services/api';

import ProdutoResumo from '../components/ProdutoResumo';

export default function Produtos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [mercadoId, setMercadoId] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const mercado = navigation.getParam('mercaodId', 'Produtos');
    setMercadoId(mercado);
    doRefresh(mercado);
  }, []);


  async function handleSubmit() {
    navigation.navigate('Supermercados');
  };


  async function doRefresh(mercado) {
    setRefreshing(true);

    const response = await api.get('/Produto/Lista/' + (mercado || mercadoId));

    setProdutos(response.data);

    setRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>

      <FlatList
        style={styles.list}
        data={produtos}
        renderItem={({ item }) => <ProdutoResumo produto={item} />}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={doRefresh}
          />
        }
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Voltar</Text>
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