import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

function SupermercadoResumo({ navigation, mercado }) {

  // https://storageprojmerc.blob.core.windows.net/mercados/<nomeImagem>

  function urlImage() {
    return "https://storageprojmerc.blob.core.windows.net/mercados/" + mercado.nomeImagem;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>{mercado.nome}</Text>

      <Image style={styles.thumbnail} source={{ uri: urlImage() }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 2,
    borderColor: '#555555',
    borderWidth: 2
  },


});

export default withNavigation(SupermercadoResumo);