import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar,
  StyleSheet, FlatList, RefreshControl, Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
import ProdutoResumo from '../components/ProdutoResumo';
import ProdutoCategoria from '../components/ProdutoCategoria';

export default function Produtos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mercadoInfo, setMercadoInfo] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const mercado = navigation.getParam('mercadoInfo');
    setMercadoInfo(mercado);
    doRefresh(mercado.id);
  }, []);


  function handleSubmit() {
    navigation.goBack();
  }

  function handleOpenMercado() {
    navigation.navigate('SupermercadoDetalhe', {
      supermercadoId: mercadoInfo.id,
    });
  }

  async function doRefresh(mercado) {
    setRefreshing(true);

    const { data } = await api.get(`/Produto/Lista/${mercado || mercadoInfo.id}`);

    const listaProdutos = [];
    const listaCategorias = [];
    let ultimaCategoria = -1;
    let indice = 0;

    data.forEach((produto) => {
      if (produto.categoria !== ultimaCategoria) {
        ultimaCategoria = produto.categoria;

        if (listaProdutos.length > 0)
          listaProdutos[listaProdutos.length - 1].ultimoDaCategoria = true;

        listaProdutos.push({ itemCategoria: true, categoria: ultimaCategoria, index: indice });
        listaCategorias.push(indice++);
      }

      produto.index = indice;
      listaProdutos.push(produto);
      indice++;
    });

    setProdutos(listaProdutos);
    setCategorias(listaCategorias);

    setRefreshing(false);
  }

  const renderSeparator = ({ leadingItem }) => {
    if (leadingItem.itemCategoria || leadingItem.ultimoDaCategoria)
      return null;

    return (
      <View style={styles.divisor} />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000000" />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonBack}>
            <Icon name="angle-left" size={35} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenMercado} style={styles.acaoMercadoInfo}>
            <Text style={styles.nomeMercado}>{mercadoInfo.nome}</Text>
            <MaterialIcon style={styles.iconeInfoMercado} name="info-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.list}
          data={produtos}
          renderItem={({ item }) => (
            item.itemCategoria
              ? <ProdutoCategoria categoria={item.categoria} />
              : <ProdutoResumo produto={item} />
          )}
          keyExtractor={(item) => item.index.toString()}
          ItemSeparatorComponent={renderSeparator}
          stickyHeaderIndices={Platform.OS === 'ios' ? categorias : null}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={doRefresh}
            />
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

  nomeMercado: {
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

  acaoMercadoInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconeInfoMercado: {
    marginRight: 10,
  },

  divisor: {
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
    marginLeft: 10,
    marginRight: 10,
  },
});
