import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import styles from './styles';

import { unidadeAbreviada } from '../../helpers/unidades';
import { formataPreco, formataData } from '../../helpers/convercoes';

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
    if (produto.nomeImagem)
      return `https://storageprojmerc.blob.core.windows.net/produtos/${produto.nomeImagem}`;
    return '';
  }

  function qtdeEmbalagem() {
    return ` - ${produto.quantidadeEmbalagem}${unidadeAbreviada(produto.unidade)}`;
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
          <Text style={styles.nomeProdutoHeader}>{produto.nome}</Text>
        </View>

        <View style={styles.linhaImagem}>
          {produto.nomeImagem
            && <Image style={styles.thumbnail} source={{ uri: urlImage() }} />}
        </View>

        <View style={styles.informacoes}>
          <Text>
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.qtdeEmbalagem}>{qtdeEmbalagem()}</Text>
          </Text>

          <Text style={styles.marca}>{produto.marca}</Text>

          <View style={styles.viewPreco}>
            <View style={styles.viewInternalPreco}>
              <Text style={styles.preco}>{formataPreco(produto.valor)}</Text>
            </View>
          </View>

          {produto.quantidadeMinima
            && (
              <Text>
                <Text style={styles.descricaoValor}>Quantidade min: </Text>
                <Text style={styles.conteudoValor}>{produto.quantidadeMinima}</Text>
              </Text>
            )}

          {produto.quantidadeMaxima
            && (
              <Text>
                <Text style={styles.descricaoValor}>Quantidade máx: </Text>
                <Text style={styles.conteudoValor}>{produto.quantidadeMaxima}</Text>
              </Text>
            )}

          {produto.validade
            && (
              <Text style={{ marginTop: 8 }}>
                <Text style={styles.descricaoValor}>Validade do produto: </Text>
                <Text style={styles.conteudoValor}>{formataData(produto.validade)}</Text>
              </Text>
            )}

          {produto.descricao !== ''
            && (
              <Text style={{ marginTop: 8 }}>
                <Text style={styles.descricaoValor}>Mais detalhes: </Text>
                <Text style={styles.detalhes}>{produto.descricao}</Text>
              </Text>
            )}
          {/* Mostrar o mercado */}
        </View>


      </View>

    </SafeAreaView>
  );
}
