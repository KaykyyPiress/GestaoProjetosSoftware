import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Image, Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SelecaoEmergencia({ navigation, route }) {
  const cpf  = route?.params?.cpf  || null;
  const nome = route?.params?.nome || '';

  function handleLigar() {
    Linking.openURL('tel:40028900');
  }

  const botoes = [
    { id: 1, nome: 'OCORRÊNCIA GERAL',   desc: 'Ajuda imediata',      icon: 'alert-decagram', cor: '#1a4f8b' },
    { id: 2, nome: 'POLÍCIA MILITAR',    desc: 'Segurança e crimes',  icon: 'police-badge',   cor: '#ef6c00' },
    { id: 3, nome: 'SAÚDE (AMBULÂNCIA)', desc: 'Acidentes e saúde',   icon: 'ambulance',      cor: '#2e7d32' },
    { id: 4, nome: 'BOMBEIROS',          desc: 'Incêndio e resgate',  icon: 'fire-truck',     cor: '#54a3ff' },
    { id: 5, nome: 'DEFESA CIVIL',       desc: 'Riscos e desastres',  icon: 'home-alert',     cor: '#607d8b' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />

          {/* Saudação com o nome do usuário logado */}
          {nome ? (
            <Text style={styles.saudacao}>Olá, {nome.split(' ')[0]}! 👋</Text>
          ) : null}

          <Text style={styles.boasVindas}>Selecione o tipo de emergência</Text>

          <TouchableOpacity style={styles.btnTelefone} onPress={handleLigar}>
            <MaterialCommunityIcons name="phone" size={20} color="#fff" />
            <Text style={styles.txtTelefone}>4002-8900</Text>
          </TouchableOpacity>
        </View>

        {botoes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { borderLeftColor: item.cor }]}
            onPress={() =>
              navigation.navigate('Relato', {
                tipo: item.nome,
                cor:  item.cor,
                cpf,            // ← passa cpf para o relato
              })
            }
          >
            <View style={styles.cardContent}>
              <MaterialCommunityIcons name={item.icon} size={36} color={item.cor} />
              <View style={styles.textos}>
                <Text style={[styles.nomeBotao, { color: item.cor }]}>{item.nome}</Text>
                <Text style={styles.descBotao}>{item.desc}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#aaa" />
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.btnHistorico}
          onPress={() => navigation.navigate('Historico', { cpf })} // ← passa cpf
        >
          <MaterialCommunityIcons name="history" size={26} color="#1a4f8b" />
          <Text style={styles.txtHistorico}>Ver histórico de ocorrências</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: '#f0f4f7' },
  scroll:        { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20, paddingBottom: 100 },
  header:        { alignItems: 'center', marginBottom: 28 },
  logo:          { width: 220, height: 90, marginBottom: 6 },
  saudacao:      { fontSize: 15, color: '#333', fontWeight: '600', marginBottom: 2 },
  boasVindas:    { fontSize: 17, color: '#1a4f8b', fontWeight: '600', letterSpacing: 0.4, marginBottom: 12 },
  btnTelefone:   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#d32f2f', paddingVertical: 8, paddingHorizontal: 18, borderRadius: 24, gap: 8 },
  txtTelefone:   { color: '#fff', fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5 },
  card:          { backgroundColor: '#fff', borderRadius: 12, marginBottom: 14, padding: 16, borderLeftWidth: 6, elevation: 3, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  cardContent:   { flexDirection: 'row', alignItems: 'center' },
  textos:        { flex: 1, marginLeft: 14 },
  nomeBotao:     { fontSize: 16, fontWeight: 'bold', marginBottom: 3 },
  descBotao:     { fontSize: 13, color: '#555' },
  bottomMenu:    { height: 76, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e5ea', justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: -2 } },
  btnHistorico:  { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20 },
  txtHistorico:  { marginLeft: 10, color: '#1a4f8b', fontWeight: '600', fontSize: 15 },
});
