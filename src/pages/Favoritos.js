import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView,
  StyleSheet, FlatList, RefreshControl,
} from 'react-native';
import api from '../services/api';
import SupermercadoResumo from '../components/SupermercadoResumo';
import ProdutoResumo from '../components/ProdutoResumo';


export default function Favoritos() {
  const [mercados, setMercados] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMercados();
  }, []);

  async function loadMercados() {
    setRefreshing(true);

    const { data } = await api.get('/Mercado/ListaFavoritos');

    setMercados(data);

    setRefreshing(false);
  }

  async function loadProdutos() {
    setRefreshing(true);

    const { data } = await api.get('/Produto/ListaFavoritos');

    setProdutos(data);

    setRefreshing(false);
  }

  function alteraAba(abaId) {
    setActiveTab(abaId);

    if (abaId === 1 && produtos.length === 0)
      loadProdutos();
  }

  const renderSeparator = () => (
    <View style={styles.divisor} />
  );

  function ListaSupermercado() {
    return (
      <FlatList
        style={styles.list}
        data={mercados}
        renderItem={({ item }) => <SupermercadoResumo mercado={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={(
          <View style={styles.semDados}>
            <Text style={styles.textoDados}>Nenhum supermercado favorito.</Text>
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadMercados}
          />
        )}
      />
    );
  }

  function ListaProdutos() {
    return (
      <FlatList
        style={styles.list}
        data={produtos}
        renderItem={({ item }) => <ProdutoResumo produto={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={(
          <View style={styles.semDados}>
            <Text style={styles.textoSemDados}>Nenhum produto ativo favoritado.</Text>
          </View>
        )}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadProdutos}
          />
        )}
      />
    );
  }

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Ideias de como fazer as abas: https://github.com/kirankalyan5/react-native-segmented-control-tab */}
        <View style={styles.tabContent}>
          <TouchableOpacity
            onPress={() => alteraAba(0)}
            style={[
              styles.tabTitle,
              styles.tabSupermercados,
              activeTab === 0 ? styles.tabActive : {},
            ]}
          >
            <Text style={[styles.tabText, activeTab === 0 ? styles.tabActiveText : {}]}>
              Supermercados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alteraAba(1)}
            style={[
              styles.tabTitle,
              styles.tabProdutos,
              activeTab === 1 ? styles.tabActive : {},
            ]}
          >
            <Text style={[styles.tabText, activeTab === 1 ? styles.tabActiveText : {}]}>
              Produtos
            </Text>
          </TouchableOpacity>
        </View>


        {/* https://www.npmjs.com/package/react-native-app-intro-slider */}
        {/* Chamar as função dessa forma, pois da diferença no efeito de refresh se chamar assim,
        <ListaSupermercado /> */}

        {activeTab === 0 && ListaSupermercado()}

        {activeTab === 1 && ListaProdutos()}

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


  list: {
    width: '100%',
  },

  divisor: {
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
    marginLeft: 10,
    marginRight: 10,
  },

  tabContent: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
  },

  tabTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#455a64',
    borderWidth: 1,
    backgroundColor: '#455a64',
  },

  tabSupermercados: {
    // borderBottomLeftRadius: 8,
    borderLeftWidth: 0,

  },

  tabProdutos: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },

  tabText: {
    fontWeight: 'bold',
    color: '#ddd',
  },

  tabActive: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },

  tabActiveText: {
    color: '#455a64',
  },

  semDados: {
    alignItems: 'center',
    marginTop: 30,
  },

  textoSemDados: {
    fontWeight: 'bold',
  },


});
