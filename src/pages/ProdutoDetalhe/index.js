import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image,
} from 'react-native';

import { Ionicons, FontAwesome } from '@expo/vector-icons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import styles from './styles';
import semImagem from '../../assets/semImagem.png';

import { unidadeAbreviada } from '../../helpers/unidades';
import { formataPreco, formataData } from '../../helpers/convercoes';
import { enumTipoCampanha } from '../../helpers/tipoCampanha';

export default function ProdutoDetalhe({ navigation }) {
  const [produto, setProduto] = useState({});
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    carregaProduto(navigation.getParam('produtoId'));
  }, []);

  async function carregaProduto(id) {
    // Sem a barra dava problema para pegar o produto de id 1
    const { data } = await api.get(`/Produto/${id}/`);

    setFavorito(data.favorito);

    setProduto(data);
  }

  function urlImage() {
    if (produto.nomeImagem)
      return { uri: `https://storageprojmerc.blob.core.windows.net/produtos/${produto.nomeImagem}` };
    return semImagem;
  }

  function qtdeEmbalagem() {
    return ` - ${produto.quantidadeEmbalagem}${unidadeAbreviada(produto.unidade)}`;
  }

  function descricaoCampanha() {
    if (produto.campanha) {
      switch (produto.campanha.tipo) {
        case enumTipoCampanha.SIMPLES:
          return 'Em oferta por';
        case enumTipoCampanha.QUANTIDADES_MIN_MAX:
          if (produto.campanha.quantidadeMinima == null)
            return `Até ${produto.campanha.quantidadeMaxima} itens por`;
          if (produto.campanha.quantidadeMaxima == null)
            return `Acima de ${produto.campanha.quantidadeMinima} itens por`;
          return `De ${produto.campanha.quantidadeMinima} a ${produto.campanha.quantidadeMaxima} itens por`;
        case enumTipoCampanha.LEVE_PAGUE:
          return `Leve ${produto.campanha.quantidadeLeve} e pague ${produto.campanha.quantidadePague} por`;
        default: return '';
      }
    }

    return '';
  }

  function handleOpenMercado() {
    navigation.navigate('SupermercadoDetalhe', {
      supermercadoId: produto.mercadoId,
    });
  }

  function handleFavoritar() {
    api.post('/Produto/AlterarFavorito', {
      produtoId: produto.id,
      favoritar: !favorito,
    });

    setFavorito(!favorito);
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000000" />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.buttonIcon}>
            <FontAwesome name="angle-left" size={35} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.nomeProdutoHeader}>{produto.nome}</Text>
          <TouchableOpacity
            onPress={handleFavoritar}
            style={[styles.buttonIcon, styles.buttonStar]}
          >
            <Ionicons name={favorito ? 'ios-star' : 'ios-star-outline'} size={30} color="#e6b800" />
          </TouchableOpacity>
        </View>

        {!produto.nome && (
          <View style={styles.ampulheta}>
            <FontAwesome name="hourglass" size={70} color="#bbb" />
          </View>
        )}

        {produto.nome && (
          <View>
            <View style={styles.linhaImagem}>
              <Image style={styles.thumbnail} source={urlImage()} />
            </View>

            <View style={styles.informacoes}>
              <Text>
                <Text style={styles.nome}>{produto.nome}</Text>
                <Text style={styles.qtdeEmbalagem}>{qtdeEmbalagem()}</Text>
              </Text>

              <Text style={styles.marca}>{produto.marca}</Text>

              <View style={styles.viewPreco}>
                <View style={styles.viewInternalPreco}>
                  <Text style={produto.campanha ? styles.precoComCampanha : styles.preco}>
                    {formataPreco(produto.valor)}
                  </Text>
                </View>
              </View>

              {produto.campanha && (
                <View style={styles.contentCampanha}>
                  <Text style={styles.descricaoOferta}>{descricaoCampanha()}</Text>
                  <View style={styles.viewPreco}>
                    <View style={styles.viewInternalPrecoCampanha}>
                      <Text style={styles.preco}>{formataPreco(produto.campanha.valor)}</Text>
                    </View>
                  </View>
                  {produto.campanha.tipo !== enumTipoCampanha.SIMPLES && (
                    <View style={styles.descricaoPosPrecoOferta}>
                      <Text style={styles.descricaoOferta}>a unidade</Text>
                    </View>
                  )}
                </View>
              )}

              <View style={styles.viewNomeMercado}>
                <Text style={styles.descricaoMercado}>Supermercado: </Text>
                <TouchableOpacity onPress={handleOpenMercado} style={styles.viewNomeMercado}>
                  <Text style={styles.nomeMercado}>
                    {produto.mercadoNome}
                  </Text>
                  <MaterialIcon name="info-outline" size={18} style={styles.iconeInfo} />
                </TouchableOpacity>
              </View>

              {produto.quantidadeMinima
                && (
                  <Text style={{ marginTop: 8 }}>
                    <Text style={styles.descricaoValor}>Quantidade min: </Text>
                    <Text style={styles.conteudoValor}>{produto.quantidadeMinima}</Text>
                  </Text>
                )}

              {produto.quantidadeMaxima
                && (
                  <Text style={{ marginTop: produto.quantidadeMaxima ? 0 : 8 }}>
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

              {produto.campanha
                && (
                  <Text style={{ marginTop: 8 }}>
                    <Text style={styles.descricaoValor}>Oferta valida até: </Text>
                    <Text style={styles.conteudoValor}>{formataData(produto.campanha.dataFim)}</Text>
                  </Text>
                )}

              {produto.descricao !== ''
                && (
                  <Text style={{ marginTop: 8 }}>
                    <Text style={styles.descricaoValor}>Mais detalhes: </Text>
                    <Text style={styles.detalhes}>{produto.descricao}</Text>
                  </Text>
                )}
            </View>

          </View>
        )}
      </View>

    </SafeAreaView>
  );
}
