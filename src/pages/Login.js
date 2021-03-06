import React, { useState, useContext } from 'react';
import {
  View, AsyncStorage, KeyboardAvoidingView, Platform, Text,
  TextInput, Image, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator,
} from 'react-native';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { sha256 } from 'js-sha256';
import AuthContext from '../services/authContext';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [menssagemErro, setMenssagemErro] = useState('');
  const [processando, setProcessando] = useState(false);

  const { signIn } = useContext(AuthContext);

  // Realiza essa ação ao abrir a tela, como o array de dependencias (segundo parâmetro) está vazio
  // useEffect(() => {
  //   AsyncStorage.getItem('accessToken').then((accessToken) => {
  //     if (accessToken && accessToken !== '')
  //       navigation.navigate('PrincipalTab');
  //   });
  // }, []);

  async function handleSubmit() {
    // alert('No notification permissions!');
    // Alert.alert('Alert Title', 'My Alert Msg');

    setMenssagemErro('');
    setProcessando(true);

    let pushToken = null;
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted')
      pushToken = await Notifications.getExpoPushTokenAsync();

    const response = await api.post('/AccountCliente/Login', {
      email,
      accessKey: sha256(senha).toUpperCase(),
      grantType: 'password',
      pushToken,
    });

    const { authenticated } = response.data;

    setProcessando(false);

    if (authenticated) {
      const { nome, accessToken, refreshToken } = response.data;

      await AsyncStorage.setItem('usuarioNome', nome);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      signIn({ accessToken });
      // navigation.navigate('PrincipalTab');
    } else
      setMenssagemErro(response.data.message);
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image style={styles.logo} source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={senha}
          onChangeText={setSenha}
        />

        <View style={styles.viewInfo}>
          {menssagemErro !== '' && <Text style={styles.errorText}>{menssagemErro}</Text>}
          {processando && <ActivityIndicator />}
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp} style={styles.signup}>
          <Text>Não possui cadastro? Clique aqui.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: '#455a64',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  logo: {
    height: 85,
    width: 210,
  },

  signup: {
    alignItems: 'center',
    marginTop: 25,
  },

  viewInfo: {
    alignItems: 'center',
    marginBottom: 20,
    height: 16,
  },

  errorText: {
    color: '#d31f1f',
    fontWeight: 'bold',
  },
});
