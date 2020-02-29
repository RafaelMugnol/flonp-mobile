import React from 'react';
import { withNavigation } from 'react-navigation';
import {
  View, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';


function SupermercadoResumo({ navigation, mercado }) {
  // https://storageprojmerc.blob.core.windows.net/mercados/<nomeImagem>

  function urlImage() {
    return `https://storageprojmerc.blob.core.windows.net/mercados/${mercado.nomeImagem}`;
  }

  function handleClick() {
    // Tentando deixar que quando clicar no mercado na aba favorito ele
    // aparecesse na aba supermercados, mas fica co o ultimo aberto

    // const mercadoInfo = {
    //   id: mercado.id,
    //   nome: mercado.nome,
    // };

    // navigation.dispatch(StackActions.reset({

    //   key: 1,
    //   actions: [NavigationActions.navigate({ routeName: 'Produtos', params: { mercadoInfo } })],
    // }));

    navigation.navigate('Produtos', {
      mercadoInfo: {
        id: mercado.id,
        nome: mercado.nome,
      },
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.areaClicavel} onPress={handleClick}>
        <View style={styles.linha}>
          <Image style={styles.thumbnail} source={{ uri: urlImage() }} />

          <View style={styles.descricao}>
            <Text style={styles.nomeMercado}>{mercado.nome}</Text>
            <Text style={styles.texto}>{mercado.cidade}</Text>
            <Text style={styles.texto}>{mercado.bairro}</Text>
            <Text style={styles.texto}>{mercado.endereco}</Text>
          </View>
        </View>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  areaClicavel: {
    flex: 1,
    padding: 10,
  },

  descricao: {
    marginLeft: 15,
  },

  nomeMercado: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },

  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },

  linha: {
    flex: 1,
    flexDirection: 'row',
  },


});

export default withNavigation(SupermercadoResumo);
