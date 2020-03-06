import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function InputPhone({ label, value, onChangeText }) {
  function somenteNumero(texto) {
    return texto.replace(/[^0-9]+/g, '');
  }

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInputMask
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#999"
        type="cel-phone"
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
        value={value}
        maxLength={15}
        onChangeText={(newValue) => onChangeText(somenteNumero(newValue))}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
});
