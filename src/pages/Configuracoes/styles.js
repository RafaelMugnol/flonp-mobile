import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    height: 65,
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#455a64',
    fontSize: 16,
  },

  buttonIcon: {
    marginLeft: 20,
    marginRight: 10,
  },

  buttonIconArrow: {
    marginLeft: 'auto',
    marginRight: 25,
  },

  areaDados: {
    margin: 15,
    marginBottom: 50,
  },

  textNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  textInfo: {
    fontSize: 16,
    marginTop: 4,
  },

  textLabelInfo: {
    fontStyle: 'italic',
  },

  divisor: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginLeft: 10,
    marginRight: 10,
  },

  versao: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 10,
  },
});

export default styles;
