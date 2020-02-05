import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar,
  AsyncStorage, StyleSheet, FlatList, RefreshControl,
} from 'react-native';
import api from '../services/api';
import SupermercadoResumo from '../components/SupermercadoResumo';


export default function Favoritos() {
  const [mercados, setMercados] = useState([]);

  useEffect(() => {
    loadMercados();
  }, []);

  async function loadMercados() {
    const response = await api.get('/Mercado/Lista');

    response.data.pop();
    response.data.splice(1, 1);
    setMercados(response.data);
  }

  const renderSeparator = () => (
    <View style={styles.divisor} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <FlatList
          style={styles.list}
          data={mercados}
          renderItem={({ item }) => <SupermercadoResumo mercado={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: '100%',
  },

  button: {
    height: 20,
    width: '100%',
    backgroundColor: '#455a64',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  list: {
    width: '100%',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 40,
    width: '85%',
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 2,
  },

  campoPesquisa: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonSearch: {
    paddingLeft: 10,
  },

  divisor: {
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
    marginLeft: 10,
    marginRight: 10,
  },
});
