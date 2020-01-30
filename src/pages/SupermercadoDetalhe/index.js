import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import styles from './styles';

export default function SupermercadoDetalhe({ navigation }) {
  const [mercado, setMercado] = useState({});

  useEffect(() => {
    carregaMercado(navigation.getParam('supermercadoId'));
  }, []);

  async function carregaMercado(id) {
    // Sem a barra dava problema para pegar o mercado de id 1
    const response = await api.get(`/Mercado/${id}/`);

    setMercado(response.data);
  }

  function urlImage() {
    if (mercado.nomeImagem)
      return `https://storageprojmerc.blob.core.windows.net/mercados/${mercado.nomeImagem}`;
    return undefined;
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000000" />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.buttonBack}>
            <Icon name="angle-left" size={35} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.nomeMercadoHeader}>{mercado.nome}</Text>
        </View>

        {!mercado.nome && (
          <View style={styles.ampulheta}>
            <Icon name="hourglass" size={70} color="#bbb" />
          </View>
        )}

        {mercado.nome && (
          <View>
            <View style={styles.linhaImagem}>
              {mercado.nomeImagem
                && <Image style={styles.thumbnail} source={{ uri: urlImage() }} />}
            </View>

            <View style={styles.informacoes}>
              <Text>
                <Text style={styles.nome}>{mercado.nome}</Text>
              </Text>

              <Text style={styles.marca}>{mercado.marca}</Text>

            </View>

          </View>
        )}
      </View>

    </SafeAreaView>
  );
}
