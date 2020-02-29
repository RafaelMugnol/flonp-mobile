import React, { useState, useEffect } from 'react';
import {
  View, SafeAreaView, StatusBar, TextInput, Text,
  StyleSheet, FlatList, RefreshControl, TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Foundation } from '@expo/vector-icons';
import api from '../services/api';
import SupermercadoResumo from '../components/SupermercadoResumo';

export default function Supermercados({ navigation }) {
  const [mercados, setMercados] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [nomePesquisar, setNomePesquisar] = useState('');


  useEffect(() => {
    doRefresh();
  }, []);

  async function doRefresh() {
    setRefreshing(true);

    const response = await api.get(`/Mercado/Lista?palavraChave=${nomePesquisar}`);

    setMercados(response.data);

    setRefreshing(false);
  }

  function handleMap() {
    navigation.navigate('SupermercadosMapa');
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
          ListEmptyComponent={(
            <View style={styles.semDados}>
              <Text style={styles.textoSemDados}>Nenhum supermercado encontrado.</Text>
            </View>
          )}
          ListHeaderComponent={(
            <View style={styles.campoPesquisa}>
              <TouchableOpacity onPress={handleMap} style={styles.buttonMap}>
                <Foundation name="map" size={25} color="#DDD" />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Pesuisar supermercado"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={nomePesquisar}
                onChangeText={setNomePesquisar}
                onSubmitEditing={doRefresh}
              />
              <View style={styles.buttonSearch}>
                <TouchableOpacity onPress={doRefresh}>
                  <Icon name="search" size={25} color="#888" />
                </TouchableOpacity>
              </View>
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
    borderRadius: 2,
    paddingHorizontal: 10,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    fontSize: 16,
    color: '#444',
    height: 40,
    width: '73%',
  },

  campoPesquisa: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonSearch: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 2,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  divisor: {
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
    marginLeft: 10,
    marginRight: 10,
  },

  buttonMap: {
    backgroundColor: '#455a64',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    width: 40,
    height: 40,
    marginRight: 10,
  },

  semDados: {
    alignItems: 'center',
    marginTop: 30,
  },

  textoSemDados: {
    fontWeight: 'bold',
  },

});
