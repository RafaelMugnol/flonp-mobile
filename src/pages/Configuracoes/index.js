import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView,
  AsyncStorage,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import styles from './styles';
import api from '../../services/api';

export default function Configuracoes({ navigation }) {
  const [dadosUsuario, setDadosUsuario] = useState({});

  useEffect(() => {
    carregaDados();
  }, []);

  async function carregaDados() {
    const { data } = await api.get('/AccountCliente/Dados/');

    setDadosUsuario(data);
  }

  async function handleLogout() {
    await AsyncStorage.setItem('accessToken', '');
    navigation.navigate('Login');
  }

  function handleEdit() {
    navigation.navigate('Perfil', {
      dados: dadosUsuario,
      onGoBack(dadosStualizados) {
        setDadosUsuario(dadosStualizados);
      },
    });
  }

  function handleRedefinirSenha() {
    navigation.navigate('RedefinicaoSenha');
  }

  function handleSugestaoSupermercado() {
    navigation.navigate('SugestaoSupermercado');
  }

  function getMascaraTelefone(texto) {
    switch (texto.length) {
      case 11:
        return '(99) 99999-9999';
      case 10:
        return '(99) 9999-9999';
      case 9:
        return '99999-9999';
      default:
        return '9999-9999';
    }
  }

  function formataTelefone(texto) {
    if (!texto)
      return '';

    const mascara = getMascaraTelefone(texto);
    let retorno = '';
    let pos = 0;
    for (let i = 0; i < mascara.length; i++) {
      const caracter = mascara.charAt(i);
      if (caracter !== '9') {
        if (texto.length > pos)
          retorno += caracter;
      } else if (texto.length > pos)
        retorno += texto.charAt(pos++);
      else
        break;
    }

    return retorno;
  }

  function Botao(params) {
    return (
      <>
        <TouchableOpacity style={styles.button} onPress={params.handler}>
          <params.componentIcon style={styles.buttonIcon} name={params.icon} size={30} color="#455a64" />
          <Text style={styles.buttonText}>{params.label}</Text>
          <FontAwesome style={styles.buttonIconArrow} name="angle-right" size={35} color="#455a64" />
        </TouchableOpacity>

        <View style={styles.divisor} />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaDados}>
        <Text style={styles.textNome}>{dadosUsuario.nome}</Text>
        <Text style={styles.textInfo}>{dadosUsuario.email}</Text>
        <Text style={styles.textInfo}>
          <Text style={styles.textLabelInfo}>Celular: </Text>
          <Text style={styles.textInfo}>{formataTelefone(dadosUsuario.telefone)}</Text>
        </Text>
      </View>

      <View style={styles.divisor} />

      <Botao label="Editar perfil" icon="edit" handler={handleEdit} componentIcon={FontAwesome} />
      <Botao label="Redefinir senha" icon="key" handler={handleRedefinirSenha} componentIcon={FontAwesome} />
      <Botao label="Sugerir supermercado" icon="shop" handler={handleSugestaoSupermercado} componentIcon={Entypo} />
      <Botao label="Sair" icon="sign-out" handler={handleLogout} componentIcon={FontAwesome} />

      <Text style={styles.versao}>{`Versão ${Constants.manifest.version}`}</Text>
    </SafeAreaView>
  );
}
