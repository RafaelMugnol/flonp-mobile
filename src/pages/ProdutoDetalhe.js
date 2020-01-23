import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar,
  StyleSheet, Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

export default function ProdutoDetalhe({ navigation }) {
  const [produto, setProduto] = useState({});

  useEffect(() => {
    carregaProduto(navigation.getParam('produtoId'));
  }, []);

  async function carregaProduto(id) {
    const response = await api.get(`/ProdutoWeb/${id}`);

    setProduto(response.data);
  }

  function urlImage() {
    if (produto.nomeImagem) { return `https://storageprojmerc.blob.core.windows.net/produtos/${produto.nomeImagem}`; }
    return '';
  }

  function handleBack() {
    navigation.navigate('Produtos');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000000" />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.buttonBack}>
            <Icon name="angle-left" size={35} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.nomeProduto}>{produto.nome}</Text>
        </View>

        <View style={styles.linhaImagem}>
          {produto.nomeImagem
            && <Image style={styles.thumbnail} source={{ uri: urlImage() }} />}
        </View>

        <Text>{produto.nome}</Text>
        <Text>{produto.marca}</Text>
        <Text>{produto.quantidadeEmbalagem}</Text>
        <Text>{produto.unidade}</Text>
        <Text>{produto.validade}</Text>
        <Text>{produto.valor}</Text>
        <Text>{produto.quantidadeMaxima}</Text>
        <Text>{produto.quantidadeMinima}</Text>

        <Text>Detalhes:</Text>
        <Text>{produto.descricao}</Text>
        {/* Mostrar o mercado */}


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

  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    borderBottomColor: '#333',
    borderBottomWidth: 2,
    backgroundColor: '#455a64',
  },

  nomeProduto: {
    fontSize: 20,
    color: '#fff',
  },

  buttonBack: {
    paddingLeft: 10,
    paddingRight: 20,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  list: {
    width: '100%',
  },

  thumbnail: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 5,
  },

  linhaImagem: {
    marginTop: 12,
    alignItems: 'center',
  },
});
