import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView,
  StyleSheet, FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import ProdutoResumo from '../components/ProdutoResumo';


export default function Pesquisa() {
  const [nomePesquisar, setNomePesquisar] = useState('');
  const [produtos, setProdutos] = useState([]);

  async function handleSearch() {
    setProdutos([]);
    if (nomePesquisar) {
      const response = await api.get(`/Produto/Pesquisa?palavraChave=${nomePesquisar}`);

      setProdutos(response.data);
    }
  }

  const renderSeparator = () => (
    <View style={styles.divisor} />
  );

  function ConteudoPesquisa() {
    return (
      <FlatList
        style={styles.list}
        data={produtos}
        renderItem={({ item }) => <ProdutoResumo produto={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={(
          <View style={styles.semProduto}>
            <Text style={styles.textoSemProduto}>Nenhum produto encontrado.</Text>
          </View>
        )}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.campoPesquisa}>
          <TextInput
            style={styles.input}
            placeholder="Pesuisar produto"
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

        <ConteudoPesquisa />

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
    backgroundColor: '#ffffff',
    height: '100%',
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

  semProduto: {
    alignItems: 'center',
    marginTop: 30,
  },

  textoSemProduto: {
    fontWeight: 'bold',
  },

  list: {
    width: '100%',
  },

  divisor: {
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
    marginLeft: 10,
    marginRight: 10,
  },
});
