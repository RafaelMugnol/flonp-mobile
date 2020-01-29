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

  ampulheta: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  precoComCampanha: {
    fontSize: 20,
    textDecorationLine: 'line-through',
  },

  descricaoMercado: {
    fontSize: 18,
  },

  nomeMercado: {
    fontSize: 18,
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

  contentCampanha: {
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#d31f1f',
    borderWidth: 3,
  },

  viewInternalPrecoCampanha: {
    backgroundColor: '#229954',
    borderRadius: 5,
    padding: 5,
  },

  descricaoOferta: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  descricaoPosPrecoOferta: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'flex-end',
  },
});

export default styles;
