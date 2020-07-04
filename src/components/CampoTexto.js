import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';


export default function CampoTexto({
  label, value, onChangeText, style, ...rest
}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={label}
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        {...rest}
        style={[styles.input, style]}
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
