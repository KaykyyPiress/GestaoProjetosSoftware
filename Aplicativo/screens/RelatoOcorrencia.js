import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RelatoOcorrencia({ route, navigation }) {
  // Recebe os dados da tela anterior (tipo de emergência e cor)
  const { tipo, cor } = route.params || { tipo: 'Geral', cor: '#1a4f8b' };
  const [relato, setRelato] = useState('');

  const enviarRelato = () => {
    if (relato.trim().length < 10) {
      Alert.alert("Detalhes insuficientes", "Por favor, descreva a ocorrência com mais detalhes.");
      return;
    }

    // Simulação de envio (já que deixamos o Firebase para depois)
    Alert.alert(
      "Ocorrência Enviada", 
      "Sua solicitação foi registrada com sucesso. As autoridades foram notificadas.",
      [{ text: "OK", onPress: () => navigation.navigate('HomeApp') }]
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.headerTipo, { backgroundColor: cor }]}>
          <Text style={styles.txtTipo}>{tipo}</Text>
        </View>

        <Text style={styles.label}>Descreva o que está acontecendo:</Text>
        <TextInput
          style={styles.inputArea}
          placeholder="Ex: Acidente na Av. Principal envolvendo dois carros..."
          multiline
          numberOfLines={8}
          textAlignVertical="top"
          onChangeText={setRelato}
        />

        <TouchableOpacity style={[styles.botaoEnviar, { backgroundColor: cor }]} onPress={enviarRelato}>
          <MaterialCommunityIcons name="send" size={20} color="#fff" />
          <Text style={styles.txtBotao}>ENVIAR AGORA</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Mini Menu inferior para navegação rápida */}
      <View style={styles.footerMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HomeApp')}>
          <MaterialCommunityIcons name="home" size={24} color="#666" />
          <Text style={styles.txtMenu}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Historico')}>
          <MaterialCommunityIcons name="clipboard-text-clock" size={24} color="#666" />
          <Text style={styles.txtMenu}>Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  headerTipo: { padding: 15, borderRadius: 10, marginBottom: 20, alignItems: 'center' },
  txtTipo: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  inputArea: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 10, 
    padding: 15, 
    fontSize: 16, 
    backgroundColor: '#f9f9f9',
    height: 200 
  },
  botaoEnviar: { 
    flexDirection: 'row', 
    padding: 18, 
    borderRadius: 10, 
    marginTop: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  txtBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  footerMenu: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    padding: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#eee',
    backgroundColor: '#fff'
  },
  menuItem: { alignItems: 'center' },
  txtMenu: { fontSize: 12, color: '#666' }
});