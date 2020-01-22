import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

function ProdutoResumo({ navigation, produto }) {


  function urlImage() {
    if (produto.nomeImagem)
      return "https://storageprojmerc.blob.core.windows.net/produtos/" + produto.nomeImagem;
  }

  function AbreviacaoUnidadeMedida(codigo) {
    switch (codigo) {
      case 1:
        return 'UN';
      case 2:
        return 'KG';
      case 3:
        return 'G';
      case 4:
        return 'L';
      case 5:
        return 'ML';
      case 6:
        return 'M';
    }
  }

  function descricaoNome() {
    return produto.nome + ' - ' + produto.quantidadeEmbalagem + AbreviacaoUnidadeMedida(produto.unidade);
  }

  function converteNumero(valor, casasDecimais) {
    if (!casasDecimais)
      casasDecimais = 0;

    return parseFloat(valor).toFixed(casasDecimais).replace('.', ',');
  }

  function valorFinalProduto() {
    let valor = produto.valor;

    if (produto.campanha)
      valor = produto.campanha.valor;

    return 'R$ ' + converteNumero(valor, 2)
  }

  function textoPromocao() {
    if (produto.campanha) {
      switch (produto.campanha.tipo) {
        case 0:
          return "Oferta!";
        case 1:
          if (produto.campanha.quantidadeMinima == null)
            return "Até " + produto.campanha.quantidadeMaxima + " itens";
          if (produto.campanha.quantidadeMaxima == null)
            return "Acima de " + produto.campanha.quantidadeMinima + " itens";
          else
            return "De " + produto.campanha.quantidadeMinima + " a " + produto.campanha.quantidadeMaxima + " itens";
        case 2:
          return "Leve " + produto.campanha.quantidadeLeve + " e pague " + produto.campanha.quantidadePague;
      }
    }

    return "";
  }

  function handleClick() {
    navigation.navigate('ProdutoDetalhe', {
      produtoId: produto.id
    });

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.areaClicavel} onPress={handleClick} >
        <View style={styles.linha}>
          <Image style={styles.thumbnail} source={{ uri: urlImage() }} />

          <View style={styles.descricao}>
            <Text style={styles.nomeProduto}>{descricaoNome()}</Text>

            <Text style={styles.valor}>{valorFinalProduto()}</Text>

            {produto.campanha &&
              <Text style={styles.promocao}>{textoPromocao()}</Text>
            }
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
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
  },

  nomeProduto: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
    height: 40
  },

  valor: {
    height: 22,
    fontSize: 16,
  },

  promocao: {
    // backgroundColor: '#ff5f5f',
    alignSelf: 'flex-start',
    padding: 3,
    borderRadius: 5,
    borderColor: '#d31f1f',
    borderWidth: 2
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