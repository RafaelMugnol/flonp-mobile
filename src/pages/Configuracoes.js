import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar,
  AsyncStorage, StyleSheet, FlatList, RefreshControl
} from 'react-native';



export default function Configuracoes({ navigation }) {

  async function handleSubmit() {

    await AsyncStorage.setItem('accessToken', '');

    navigation.navigate('Login');

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Configurações</Text>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Voltar para login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    height: 35,
    width: 200,
    backgroundColor: '#455a64',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
