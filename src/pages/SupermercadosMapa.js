import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar,
  StyleSheet, Image,
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import api from '../services/api';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function SupermercadosMapa({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [mercados, setMercados] = useState([]);
  const prevCurrentRegion = usePrevious(currentRegion);

  useEffect(() => {
    loadPage();

    return function cleanup() {
      // console.log('cleanup');
    };
  }, []);

  useEffect(() => {
    // para carregar os mercados somente uma vez
    if (prevCurrentRegion === null)
      loadMercados();
  }, [currentRegion]);

  async function loadPage() {
    await loadInitialPosition();
    loadMercados();
  }

  async function loadInitialPosition() {
    const { granted } = await requestPermissionsAsync();

    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      const { latitude, longitude } = coords;

      // const latitude = -29.19450149596465;
      // const longitude = -51.34827117925442;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    } else {
      // exibir mensagem que não possui permissão para pegar a localização
    }
  }

  async function loadMercados() {
    if (currentRegion) {
      const { data } = await api.get('/Mercado/ListaParaMapa');

      setMercados(data);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  function urlImage(mercado) {
    if (mercado.nomeImagem)
      return `https://storageprojmerc.blob.core.windows.net/mercados/${mercado.nomeImagem}`;
    return undefined;
  }

  function goToProdutos(mercado) {
    return () => {
      navigation.navigate('Produtos', {
        mercadoInfo: {
          id: mercado.id,
          nome: mercado.nome,
        },
      });
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000000" />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.buttonBack}>
            <FontAwesome name="angle-left" size={35} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Supermercados próximos</Text>
        </View>

        {!currentRegion && (
          <View style={styles.ampulheta}>
            <FontAwesome name="hourglass" size={70} color="#bbb" />
          </View>
        )}

        {/* {currentRegion && (
          <MapView
            onRegionChangeComplete={handleRegionChanged}
            initialRegion={currentRegion}
            style={styles.map}
          >
            {mercados.map((merc) => (
              <Marker
                key={merc.id}
                coordinate={{
                  longitude: merc.longitude,
                  latitude: merc.latitude,
                }}
              >
                <View style={styles.avatarBorda}>
                  <Image
                    style={styles.avatar}
                    source={{ uri: urlImage(merc) }}
                  />
                </View>

                <Callout onPress={goToProdutos(merc)}>
                  <View style={styles.callout}>
                    <Text style={styles.mercadoNome}>{merc.nome}</Text>
                    <Text style={styles.irParaProdutos}>Ver produtos</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )} */}

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

  titulo: {
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

  ampulheta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  map: {
    flex: 1,
  },

  avatar: {
    width: 50,
    height: 50,
  },

  avatarBorda: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#BBB',
  },

  callout: {
    width: 150,
  },

  mercadoNome: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  irParaProdutos: {
    fontStyle: 'italic',
  },

});
