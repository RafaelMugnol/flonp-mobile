import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

function ProdutoResumo({ navigation, produto }) {


  function urlImage() {
    if (produto.nomeImagem)
      return "https://storageprojmerc.blob.core.windows.net/produtos/" + produto.nomeImagem;
  }

  async function handleProduto() {


  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.areaClicavel} onPress={handleProduto} >
        <View style={styles.linha}>
          <Image style={styles.thumbnail} source={{ uri: urlImage() }} />

          <View style={styles.descricao}>
            <Text style={styles.nomeProduto}>{produto.nome}</Text>
            {/* <Text style={styles.texto}>{produto.cidade}</Text>
            <Text style={styles.texto}>{produto.bairro}</Text>
            <Text style={styles.texto}>{produto.endereco}</Text> */}
          </View>
        </View>

      </TouchableOpacity>

      <View style={styles.divisor} />
    </View>
  );
}

const styles = StyleSheet.create({
  areaClicavel: {
    flex: 1,
    padding: 10,
  },

  divisor: {
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
    marginLeft: 10,
    marginRight: 10,
  },

  descricao: {
    marginLeft: 15,
  },

  nomeProduto: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },

  texto: {

  },

  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },

  linha: {
    flex: 1,
    flexDirection: 'row',
  },


});

export default withNavigation(ProdutoResumo);