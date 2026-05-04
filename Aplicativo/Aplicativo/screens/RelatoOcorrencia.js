import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../components/connectBD';

export default function RelatoOcorrencia({ route }) {
  const { tipo, cor, cpf } = route.params || {};

  const [cep, setCep]             = useState('');
  const [cidade, setCidade]       = useState('');
  const [bairro, setBairro]       = useState('');
  const [rua, setRua]             = useState('');
  const [descricao, setDescricao] = useState('');
  const [buscandoCep, setBuscandoCep]       = useState(false);
  const [carregando, setCarregando]         = useState(false);
  const [erros, setErros]                   = useState({});
  const [modalAvaliacao, setModalAvaliacao] = useState(false);
  const [estrelas, setEstrelas]             = useState(0);
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);

  async function buscarCep(valor) {
    const limpo = valor.replace(/\D/g, '').slice(0, 8);
    setCep(limpo);
    setErros(e => ({ ...e, cep: null }));
    if (limpo.length !== 8) return;
    setBuscandoCep(true);
    try {
      const res  = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
      const data = await res.json();
      if (data.erro) {
        setErros(e => ({ ...e, cep: 'CEP não encontrado.' }));
        setCidade(''); setBairro(''); setRua('');
      } else {
        setCidade(data.localidade || '');
        setBairro(data.bairro    || '');
        setRua(data.logradouro   || '');
        setErros(e => ({ ...e, cidade: null, rua: null }));
      }
    } catch {
      setErros(e => ({ ...e, cep: 'Erro ao buscar CEP.' }));
    } finally {
      setBuscandoCep(false);
    }
  }

  function formatarCep(v) {
    const l = v.replace(/\D/g, '').slice(0, 8);
    return l.length > 5 ? `${l.slice(0, 5)}-${l.slice(5)}` : l;
  }

  function validar() {
    const e = {};
    if (!cidade.trim()) e.cidade = 'Cidade é obrigatória.';
    if (!rua.trim())    e.rua    = 'Rua é obrigatória.';
    if (!descricao.trim()) {
      e.descricao = 'Descrição é obrigatória.';
    } else if (descricao.trim().length < 80) {
      e.descricao = `Mínimo 80 caracteres. (${descricao.trim().length}/80)`;
    }
    return e;
  }

  async function handleEnviar() {
    const e = validar();
    if (Object.keys(e).length > 0) { setErros(e); return; }
    setErros({});
    setCarregando(true);
    const dadosOcorrencia = {
      tipo:        tipo || 'Ocorrência Geral',
      cep:         cep  || null,
      cidade,
      bairro:      bairro.trim() || null,
      rua,
      descricao,
      cpf_cidadao: cpf  || null,
    };
    const { error } = await supabase
      .from('table_ocorrencia')
      .insert([dadosOcorrencia]);
    if (error) {
      console.log('ERRO SUPABASE:', JSON.stringify(error));
      setErros({ geral: 'Erro ao enviar ocorrência. Tente novamente.' });
      setCarregando(false);
      return;
    }
    setCarregando(false);
    setCep(''); setCidade(''); setBairro(''); setRua(''); setDescricao('');
    setEstrelas(0);
    setAvaliacaoEnviada(false);
    setModalAvaliacao(true);
  }

    async function handleAvaliar(nota) {
    setEstrelas(nota);
    setAvaliacaoEnviada(true);

    // Salva a nota no banco
    const { error } = await supabase
      .from('table_avaliacao')
      .insert([{
        nota,
        cpf_cidadao: cpf || null,
      }]);

    if (error) {
      console.log('Erro ao salvar avaliação:', JSON.stringify(error));
    }
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Modal
        visible={modalAvaliacao}
        transparent
        animationType="fade"
        onRequestClose={() => setModalAvaliacao(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {!avaliacaoEnviada ? (
              <>
                <MaterialCommunityIcons name="check-circle-outline" size={52} color="#2e7d32" />
                <Text style={styles.modalTitulo}>Ocorrência enviada!</Text>
                <Text style={styles.modalSubtitulo}>Como você avalia o nosso app?</Text>
                <View style={styles.estrelaRow}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <TouchableOpacity key={n} onPress={() => handleAvaliar(n)}>
                      <MaterialCommunityIcons
                        name={n <= estrelas ? 'star' : 'star-outline'}
                        size={38}
                        color="#f9a825"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.modalBtnPular} onPress={() => setModalAvaliacao(false)}>
                  <Text style={styles.modalBtnPularTexto}>Pular</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="emoticon-happy-outline" size={52} color="#f9a825" />
                <Text style={styles.modalTitulo}>Obrigado!</Text>
                <Text style={styles.modalSubtitulo}>
                  Sua avaliação de {estrelas} {estrelas === 1 ? 'estrela' : 'estrelas'} foi registrada.
                </Text>
                <TouchableOpacity style={styles.modalBtnFechar} onPress={() => setModalAvaliacao(false)}>
                  <Text style={styles.modalBtnFecharTexto}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Text style={[styles.titulo, cor ? { color: cor } : null]}>
        {tipo || 'Relato de Ocorrência'}
      </Text>

      {erros.geral && (
        <View style={styles.boxErro}>
          <Text style={styles.txtErroGeral}>{erros.geral}</Text>
        </View>
      )}

      <Text style={styles.label}>CEP (opcional)</Text>
      <View style={styles.cepRow}>
        <TextInput
          style={[styles.input, styles.inputCep, erros.cep && styles.inputErro]}
          placeholder="00000-000"
          value={formatarCep(cep)}
          onChangeText={buscarCep}
          keyboardType="numeric"
          maxLength={9}
        />
        {buscandoCep && (
          <ActivityIndicator size="small" color={cor || '#1a4f8b'} style={{ marginLeft: 10 }} />
        )}
      </View>
      {erros.cep && <Text style={styles.erroTexto}>{erros.cep}</Text>}

      <Text style={styles.label}>Cidade <Text style={styles.obrigatorio}>*</Text></Text>
      <TextInput
        style={[styles.input, erros.cidade && styles.inputErro]}
        placeholder="Preenchido pelo CEP ou digite"
        value={cidade}
        onChangeText={t => { setCidade(t); setErros(e => ({ ...e, cidade: null })); }}
      />
      {erros.cidade && <Text style={styles.erroTexto}>{erros.cidade}</Text>}

      <Text style={styles.label}>Bairro (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Preenchido pelo CEP ou digite"
        value={bairro}
        onChangeText={setBairro}
      />

      <Text style={styles.label}>Rua <Text style={styles.obrigatorio}>*</Text></Text>
      <TextInput
        style={[styles.input, erros.rua && styles.inputErro]}
        placeholder="Preenchido pelo CEP ou digite"
        value={rua}
        onChangeText={t => { setRua(t); setErros(e => ({ ...e, rua: null })); }}
      />
      {erros.rua && <Text style={styles.erroTexto}>{erros.rua}</Text>}

      <View style={styles.labelRow}>
        <Text style={styles.label}>Descrição <Text style={styles.obrigatorio}>*</Text></Text>
        <Text style={[styles.contador, descricao.trim().length >= 80 ? styles.contadorOk : styles.contadorPendente]}>
          {descricao.trim().length}/80
        </Text>
      </View>
      <TextInput
        style={[styles.input, styles.textArea, erros.descricao && styles.inputErro]}
        placeholder="Descreva o que aconteceu (mínimo 80 caracteres)"
        value={descricao}
        onChangeText={t => {
          setDescricao(t);
          if (t.trim().length >= 80) setErros(e => ({ ...e, descricao: null }));
        }}
        multiline
        numberOfLines={4}
      />
      {erros.descricao && <Text style={styles.erroTexto}>{erros.descricao}</Text>}

      <Text style={styles.obrigatorioLegenda}>* Campos obrigatórios</Text>

      <TouchableOpacity
        style={[styles.botao, cor ? { backgroundColor: cor } : null, carregando && { opacity: 0.7 }]}
        onPress={handleEnviar}
        disabled={carregando}
      >
        <Text style={styles.txtBotao}>
          {carregando ? 'ENVIANDO...' : 'ENVIAR OCORRÊNCIA'}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:           { padding: 24, backgroundColor: '#fff' },
  titulo:              { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1a4f8b' },
  labelRow:            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label:               { fontSize: 14, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  obrigatorio:         { color: '#d32f2f' },
  obrigatorioLegenda:  { fontSize: 12, color: '#888', marginTop: 8, marginBottom: 4 },
  cepRow:              { flexDirection: 'row', alignItems: 'center' },
  inputCep:            { flex: 1 },
  contador:            { fontSize: 12 },
  contadorOk:          { color: '#2e7d32' },
  contadorPendente:    { color: '#888' },
  input: {
    borderWidth: 1, borderColor: '#CCC', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8,
    marginBottom: 4, fontSize: 15,
  },
  inputErro:           { borderColor: '#d32f2f' },
  textArea:            { height: 120, textAlignVertical: 'top' },
  erroTexto:           { color: '#d32f2f', fontSize: 12, marginBottom: 10 },
  boxErro:             { backgroundColor: '#ffebee', borderLeftWidth: 4, borderLeftColor: '#d32f2f', borderRadius: 6, padding: 14, marginBottom: 16 },
  txtErroGeral:        { color: '#d32f2f', fontWeight: 'bold', fontSize: 14 },
  botao:               { backgroundColor: '#1a4f8b', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  txtBotao:            { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  modalOverlay:        { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalBox:            { backgroundColor: '#fff', borderRadius: 16, padding: 28, width: '82%', alignItems: 'center', elevation: 10 },
  modalTitulo:         { fontSize: 20, fontWeight: 'bold', color: '#1a4f8b', marginTop: 12, marginBottom: 6 },
  modalSubtitulo:      { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 20 },
  estrelaRow:          { flexDirection: 'row', gap: 8, marginBottom: 20 },
  modalBtnPular:       { paddingVertical: 8, paddingHorizontal: 24 },
  modalBtnPularTexto:  { color: '#888', fontSize: 14 },
  modalBtnFechar:      { backgroundColor: '#1a4f8b', paddingVertical: 10, paddingHorizontal: 32, borderRadius: 8, marginTop: 8 },
  modalBtnFecharTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
