import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar,
  StyleSheet, FlatList, RefreshControl,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import api from '../services/api';

export default function SupermercadosMapa({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    loadPage();
  }, []);

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

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    }
  }

  async function loadMercados() {
    if (currentRegion) {
      //
      //
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
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

        {currentRegion && (
          <MapView
            onRegionChangeComplete={handleRegionChanged}
            initialRegion={currentRegion}
            style={styles.map}
          />
        )}

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
});
