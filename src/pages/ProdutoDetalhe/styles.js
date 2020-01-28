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

  nomeProdutoHeader: {
    fontSize: 20,
    color: '#fff',
  },

  buttonBack: {
    paddingLeft: 10,
    paddingRight: 20,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  list: {
    width: '100%',
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

  nome: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  marca: {
    fontSize: 25,
  },

  qtdeEmbalagem: {
    fontSize: 18,
  },

  viewPreco: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },

  viewInternalPreco: {
    backgroundColor: '#4682B4',
    borderRadius: 5,
    padding: 5,
  },

  preco: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  descricaoValor: {
    fontSize: 15,
  },

  conteudoValor: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  detalhes: {
    fontSize: 15,
    fontStyle: 'italic',
  },

});

export default styles;
