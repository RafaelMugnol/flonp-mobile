import React, { useState, useEffect } from 'react';
import {
  View, SafeAreaView, StatusBar, TextInput,
  StyleSheet, FlatList, RefreshControl, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import SupermercadoResumo from '../components/SupermercadoResumo';

export default function Supermercados() {
  const [mercados, setMercados] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [nomePesquisar, setNomePesquisar] = useState('');


  useEffect(() => {
    doRefresh();
  }, []);

  async function doRefresh() {
    setRefreshing(true);

    const response = await api.get('/Mercado/Lista');

    setMercados(response.data);

    setRefreshing(false);
  }

  async function handleSearch() {
    /* setProdutos([]);
    if (nomePesquisar) {
      const response = await api.get(`/Produto/Pesquisa?palavraChave=${nomePesquisar}`);

      setProdutos(response.data);
    } */
  }

  const renderSeparator = () => (
    <View style={styles.divisor} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <View style={styles.content}>

        <FlatList
          style={styles.list}
          data={mercados}
          renderItem={({ item }) => <SupermercadoResumo mercado={item} />}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={doRefresh}
            />
          )}
          ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={(
            <View style={styles.campoPesquisa}>
              <TextInput
                style={styles.input}
                placeholder="Pesuisar supermercado"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={nomePesquisar}
                onChangeText={setNomePesquisar}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity onPress={handleSearch} style={styles.buttonSearch}>
                <Icon name="search" size={25} color="#888" />
              </TouchableOpacity>
            </View>
          )}
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
