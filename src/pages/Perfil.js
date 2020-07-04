import React, { useState, useEffect } from 'react';
import {
  View, KeyboardAvoidingView, Platform, Text, ScrollView,
  ActivityIndicator, TouchableOpacity, StyleSheet,
} from 'react-native';

import CampoTexto from '../components/CampoTexto';
import InputPhone from '../components/InputPhone';
import api from '../services/api';

export default function Perfil({ route, navigation }) {
  const [dados, setDados] = useState({
    email: '',
    nome: '',
    telefone: '',
  });

  useEffect(() => {
    console.log(route.params.dadosUsuario);

    setDados(route.params.dadosUsuario);
  }, []);

  const [menssagemErro, setMenssagemErro] = useState('');
  const [processando, setProcessando] = useState(false);

  function setDado(value, campo) {
    setDados({ ...dados, [campo]: value });
  }

  async function handleSubmit() {
    const mensagemErro = valida();
    if (mensagemErro)
      setMenssagemErro(mensagemErro);
    else {
      setMenssagemErro('');
      setProcessando(true);

      await api.post('/AccountCliente/Atualizar', {
        nome: dados.nome,
        telefone: dados.telefone,
      });

      navigation.goBack();
      route.params.onGoBack(dados);

      setProcessando(false);
    }
  }

  function valida() {
    if (dados.nome === '')
      return 'Informe seu nome.';

    if (dados.telefone.length < 10)
      return 'Informe seu celular.';

    return null;
  }

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>

      <ScrollView style={styles.form}>

        <Text style={styles.cadastro}>Perfil</Text>

        <CampoTexto
          label="E-mail"
          value={dados.email}
          onChangeText={(value) => setDado(value, 'email')}
          maxLength={50}
          keyboardType="email-address"
          editable={false}
          style={{
            color: '#aaa',
          }}
        />

        <CampoTexto
          label="Nome"
          value={dados.nome}
          onChangeText={(value) => setDado(value, 'nome')}
          maxLength={50}
          autoCapitalize="words"
        />

        <InputPhone
          label="Celular"
          value={dados.telefone}
          onChangeText={(value) => setDado(value, 'telefone')}
        />

        <View style={styles.viewInfo}>
          {menssagemErro !== '' && <Text style={styles.errorText}>{menssagemErro}</Text>}
          {processando && <ActivityIndicator />}
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
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

  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },

  buttonBack: {
    paddingLeft: 10,
    paddingRight: 20,
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

  cadastro: {
    color: '#455a64',
    fontSize: 35,
    marginBottom: 15,
  },
});
