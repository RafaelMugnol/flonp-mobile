import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar,
  AsyncStorage, StyleSheet, FlatList, RefreshControl
} from 'react-native';

import api from '../services/api';
import ProdutoResumo from '../components/ProdutoResumo';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Produtos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [mercadoInfo, setMercadoInfo] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const mercado = navigation.getParam('mercaodInfo', 'Produtos');
    setMercadoInfo(mercado);
    doRefresh(mercado.id);
  }, []);


  async function handleSubmit() {
    navigation.navigate('Supermercados');
  };


  async function doRefresh(mercado) {
    setRefreshing(true);

    const response = await api.get('/Produto/Lista/' + (mercado || mercadoInfo.id));

    setProdutos(response.data);

    setRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000000"></StatusBar>

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonBack}>
            <Icon name="angle-left" size={35} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.nomeMercado}>{mercadoInfo.nome}</Text>
        </View>

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
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#455a64"
  },

  content: {
    backgroundColor: "#ffffff",
    height: '100%'
  },

  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    borderBottomColor: '#333',
    borderBottomWidth: 2,
    backgroundColor: "#455a64"
  },

  nomeMercado: {
    fontSize: 20,
    color: "#fff",
  },

  buttonBack: {
    paddingLeft: 10,
    paddingRight: 20
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