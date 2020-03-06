import React, { useState } from 'react';
import {
  View, KeyboardAvoidingView, Platform, Text, ScrollView,
  ActivityIndicator, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';

import { sha256 } from 'js-sha256';
import CampoTexto from '../components/CampoTexto';
import InputPhone from '../components/InputPhone';
import api from '../services/api';

export default function SignUp({ navigation }) {
  const [dados, setDados] = useState({
    email: '',
    senha: '',
    senhaConfirmacao: '',
    nome: '',
    telefone: '',
  });
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

      const response = await api.post('/AccountCliente/Criar', {
        email: dados.email,
        accessKey: sha256(dados.senha),
        nome: dados.nome,
        telefone: dados.telefone,
      });

      if (response.data.valido)
        navigation.goBack();
      else
        setMenssagemErro(response.data.mensagem);

      setProcessando(false);
    }
  }

  function valida() {
    const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regEmail.test(dados.email))
      return 'E-mail inválido.';

    if (dados.senha.length < 6)
      return 'A senha deve ser acima de 6 caracteres.';

    if (dados.senha !== dados.senhaConfirmacao)
      return 'As senhas não são iguais.';

    if (dados.nome === '')
      return 'Informe seu nome.';

    if (dados.telefone.length < 10)
      return 'Informe seu celular.';

    return null;
  }


  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView style={styles.form}>

        <Text style={styles.cadastro}>Cadastro</Text>

        <CampoTexto
          label="E-mail"
          value={dados.email}
          onChangeText={(value) => setDado(value, 'email')}
          maxLength={50}
          keyboardType="email-address"
        />

        <CampoTexto
          label="Senha"
          value={dados.senha}
          onChangeText={(value) => setDado(value, 'senha')}
          maxLength={30}
          secureTextEntry
        />

        <CampoTexto
          label="Confirmação senha"
          value={dados.senhaConfirmacao}
          onChangeText={(value) => setDado(value, 'senhaConfirmacao')}
          maxLength={30}
          secureTextEntry
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
