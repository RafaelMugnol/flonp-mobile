import React from 'react';
import { withNavigation } from 'react-navigation';
import {
  View, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';

import { unidadeAbreviada } from '../helpers/unidades';
import { enumTipoCampanha } from '../helpers/tipoCampanha';
import { formataPreco } from '../helpers/convercoes';

function ProdutoResumo({ navigation, produto }) {
  function urlImage() {
    if (produto.nomeImagem)
      return `https://storageprojmerc.blob.core.windows.net/produtos/${produto.nomeImagem}`;
    return undefined;
  }

  function descricaoNome() {
    return `${produto.nome} - ${produto.quantidadeEmbalagem}${unidadeAbreviada(produto.unidade)}`;
  }

  function valorFinalProduto() {
    let { valor } = produto;

    if (produto.campanha)
      valor = produto.campanha.valor;

    return formataPreco(valor, 2);
  }

  function textoPromocao() {
    if (produto.campanha) {
      switch (produto.campanha.tipo) {
        case enumTipoCampanha.SIMPLES:
          return 'Oferta!';
        case enumTipoCampanha.QUANTIDADES_MIN_MAX:
          if (produto.campanha.quantidadeMinima == null)
            return `Até ${produto.campanha.quantidadeMaxima} itens`;
          if (produto.campanha.quantidadeMaxima == null)
            return `Acima de ${produto.campanha.quantidadeMinima} itens`;
          return `De ${produto.campanha.quantidadeMinima} a ${produto.campanha.quantidadeMaxima} itens`;
        case enumTipoCampanha.LEVE_PAGUE:
          return `Leve ${produto.campanha.quantidadeLeve} e pague ${produto.campanha.quantidadePague}`;
        default: return '';
      }
    }

    return '';
  }


  function handleClick() {
    navigation.navigate('ProdutoDetalhe', {
      produtoId: produto.id,
    });
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.areaClicavel} onPress={handleClick}>
        <View style={styles.linha}>
          <Image style={styles.thumbnail} source={{ uri: urlImage() }} />

          <View style={styles.descricao}>
            <Text style={styles.nomeProduto}>{descricaoNome()}</Text>

            <Text style={styles.valor}>{valorFinalProduto()}</Text>

            <View style={styles.linha}>
              {produto.campanha
                && <Text style={styles.promocao}>{textoPromocao()}</Text>}

              {produto.mercadoNome
                && <Text style={styles.mercadoNome}>{produto.mercadoNome}</Text>}
            </View>
          </View>
        </View>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  areaClicavel: {
    flex: 1,
    padding: 10,
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
    height: 40,
  },

  valor: {
    height: 22,
    fontSize: 16,
  },

  mercadoNome: {
    marginTop: 4,
  },

  promocao: {
    alignSelf: 'flex-start',
    padding: 3,
    borderRadius: 5,
    borderColor: '#d31f1f',
    borderWidth: 2,
    marginRight: 15,
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
