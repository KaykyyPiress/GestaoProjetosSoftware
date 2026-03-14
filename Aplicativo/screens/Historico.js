import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Historico({ navigation }) {
  // Dados de exemplo (Mock)
  const ocorrencias = [
    { id: '1', tipo: 'POLÍCIA MILITAR', data: '05/03/2026', status: 'Concluído', cor: '#ef6c00' },
    { id: '2', tipo: 'SAÚDE (AMBULÂNCIA)', data: '01/03/2026', status: 'Em andamento', cor: '#2e7d32' },
    { id: '3', tipo: 'EMERGÊNCIA GERAL', data: '20/02/2026', status: 'Cancelado', cor: '#1a4f8b' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.barraLateral, { backgroundColor: item.cor }]} />
      <View style={styles.conteudoCard}>
        <View style={styles.linhaTopo}>
          <Text style={[styles.txtTipo, { color: item.cor }]}>{item.tipo}</Text>
          <Text style={styles.txtData}>{item.data}</Text>
        </View>
        <Text style={styles.txtStatus}>Status: <Text style={{fontWeight: 'bold'}}>{item.status}</Text></Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Minhas Ocorrências</Text>
        <Text style={styles.subtitulo}>Histórico de pedidos de ajuda</Text>
      </View>

      <FlatList
        data={ocorrencias}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma ocorrência registrada ainda.</Text>
        }
      />

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.txtVoltar}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 25, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1a4f8b' },
  subtitulo: { fontSize: 14, color: '#666' },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    paddingRight: 10
  },
  barraLateral: { width: 6, height: '100%' },
  conteudoCard: { flex: 1, padding: 15 },
  linhaTopo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  txtTipo: { fontWeight: 'bold', fontSize: 14 },
  txtData: { fontSize: 12, color: '#999' },
  txtStatus: { fontSize: 13, color: '#444' },
  botaoVoltar: {
    margin: 20,
    padding: 15,
    backgroundColor: '#1a4f8b',
    borderRadius: 10,
    alignItems: 'center'
  },
  txtVoltar: { color: '#fff', fontWeight: 'bold' },
  vazio: { textAlign: 'center', marginTop: 50, color: '#999' }
});