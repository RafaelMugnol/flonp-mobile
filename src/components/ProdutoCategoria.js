import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';

import { categoriaDescricao } from '../helpers/categorias';

function ProdutoCategoria({ categoria }) {
  return (
    <View style={styles.container}>

      <Text style={styles.descricao}>{categoriaDescricao(categoria)}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01579B',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },

  descricao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default ProdutoCategoria;
