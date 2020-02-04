import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
  },

  content: {
    backgroundColor: '#fff',
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

  nomeMercadoHeader: {
    fontSize: 20,
    color: '#fff',
  },

  buttonBack: {
    paddingLeft: 10,
    paddingRight: 20,
  },

  ampulheta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  thumbnail: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 5,
  },

  linhaImagem: {
    marginTop: 12,
    alignItems: 'center',
  },

  informacoes: {
    margin: 10,
  },

  informacoesEndereco: {
    marginTop: 15,
  },

  nome: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  informacaoEndereco: {
    fontSize: 18,
  },
});

export default styles;
