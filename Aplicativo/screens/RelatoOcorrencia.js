import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function RelatoOcorrencia({ route }) {
  const { tipoOcorrencia } = route.params || {};
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  function handleEnviar() {
    if (!cidade.trim() || !rua.trim() || !descricao.trim()) {
      setErro('Cidade, rua e descrição são obrigatórios.');
      return;
    }

    setErro('');

    const dadosOcorrencia = {
      tipo: tipoOcorrencia || 'Não informado',
      cidade,
      bairro: bairro.trim() || null,
      rua,
      descricao,
    };

    console.log(dadosOcorrencia);
    // aqui depois você envia para o backend / Firebase
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        {tipoOcorrencia ? tipoOcorrencia : 'Relato de Ocorrência'}
      </Text>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <Text style={styles.label}>Bairro (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o bairro"
        value={bairro}
        onChangeText={setBairro}
      />

      <Text style={styles.label}>Rua</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a rua"
        value={rua}
        onChangeText={setRua}
      />

      <Text style={styles.label}>Descrição da ocorrência</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o que aconteceu"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.botao} onPress={handleEnviar}>
        <Text style={styles.textoBotao}>Enviar ocorrência</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  erro: {
    color: 'red',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#004AAD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
