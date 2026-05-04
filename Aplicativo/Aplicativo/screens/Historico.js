import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../components/connectBD';

const STATUS_CONFIG = {
  'Aguardando':     { cor: '#f57c00', icone: 'clock-outline' },
  'Visualizado':    { cor: '#1565c0', icone: 'eye-check-outline' },
  'Em Atendimento': { cor: '#2e7d32', icone: 'shield-check-outline' },
  'Encerrado':      { cor: '#555',    icone: 'check-circle-outline' },
};

export default function Historico({ route }) {
  const cpf = route?.params?.cpf || null;
  const [ocorrencias, setOcorrencias] = useState([]);
  const [carregando, setCarregando]   = useState(true);
  const [refreshing, setRefreshing]   = useState(false);

  async function buscarOcorrencias() {
    setCarregando(true);
    const query = supabase
      .from('table_ocorrencia')
      .select('*')
      .order('criado_em', { ascending: false });

    // filtra pelo CPF do usuário logado se disponível
    if (cpf) query.eq('cpf_cidadao', cpf);

    const { data, error } = await query;
    if (!error) setOcorrencias(data || []);
    setCarregando(false);
    setRefreshing(false);
  }

  // Recarrega sempre que a tela ganhar foco
  useFocusEffect(useCallback(() => { buscarOcorrencias(); }, []));

  function onRefresh() { setRefreshing(true); buscarOcorrencias(); }

  // ── Simula envio para o COPOM ────────────────────────────────
  async function simularEnvioParaCOPOM(id) {
    // Aqui ficaria a chamada para a API real do COPOM
    // Ex: await fetch('https://api.copom.gov.br/ocorrencia', { method: 'POST', body: ... })
    // Por ora simulamos mudando o status para 'Visualizado'
    await supabase
      .from('table_ocorrencia')
      .update({ status: 'Visualizado' })
      .eq('id', id);

    buscarOcorrencias();
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1a4f8b" />
        <Text style={{ marginTop: 10, color: '#555' }}>Carregando ocorrências...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.titulo}>Minhas Ocorrências</Text>
      <Text style={styles.subtitulo}>Puxe para baixo para atualizar</Text>

      {ocorrencias.length === 0 && (
        <View style={styles.vazio}>
          <MaterialCommunityIcons name="clipboard-text-off-outline" size={48} color="#bbb" />
          <Text style={styles.vazioTexto}>Nenhuma ocorrência registrada.</Text>
        </View>
      )}

      {ocorrencias.map((item) => {
        const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG['Aguardando'];
        return (
          <View key={item.id} style={styles.card}>

            {/* Cabeçalho: tipo + status */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTipo}>{item.tipo}</Text>
              <View style={[styles.badge, { backgroundColor: cfg.cor }]}>
                <MaterialCommunityIcons name={cfg.icone} size={13} color="#fff" />
                <Text style={styles.badgeTexto}>{item.status}</Text>
              </View>
            </View>

            {/* Localização */}
            <Text style={styles.cardInfo}>
              📍 {item.rua}{item.bairro ? `, ${item.bairro}` : ''} — {item.cidade}
              {item.cep ? ` (${item.cep})` : ''}
            </Text>

            {/* Descrição resumida */}
            <Text style={styles.cardDescricao} numberOfLines={2}>
              {item.descricao}
            </Text>

            {/* Data */}
            <Text style={styles.cardData}>
              🕐 {new Date(item.criado_em).toLocaleString('pt-BR')}
            </Text>

            {/* Botão simular envio ao COPOM */}
            {item.status === 'Aguardando' && (
              <TouchableOpacity
                style={styles.btnCopom}
                onPress={() => simularEnvioParaCOPOM(item.id)}
              >
                <MaterialCommunityIcons name="send-outline" size={15} color="#fff" />
                <Text style={styles.btnCopomTexto}>Notificar COPOM</Text>
              </TouchableOpacity>
            )}

          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { padding: 16, backgroundColor: '#f0f4f7', paddingBottom: 40 },
  centro:       { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo:       { fontSize: 20, fontWeight: 'bold', color: '#1a4f8b', marginBottom: 4 },
  subtitulo:    { fontSize: 12, color: '#888', marginBottom: 16 },
  vazio:        { alignItems: 'center', marginTop: 60 },
  vazioTexto:   { color: '#aaa', fontSize: 15, marginTop: 12 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 14, elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.08,
    shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  cardHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTipo:     { fontSize: 15, fontWeight: 'bold', color: '#1a4f8b', flex: 1 },
  badge:        { flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, gap: 4 },
  badgeTexto:   { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  cardInfo:     { fontSize: 13, color: '#444', marginBottom: 6 },
  cardDescricao:{ fontSize: 13, color: '#666', marginBottom: 6, fontStyle: 'italic' },
  cardData:     { fontSize: 12, color: '#999' },
  btnCopom: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 10, backgroundColor: '#1a4f8b',
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 8, alignSelf: 'flex-start',
  },
  btnCopomTexto: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});
