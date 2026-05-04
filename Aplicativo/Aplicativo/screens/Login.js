import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, ScrollView
} from 'react-native';
import { supabase } from '../components/connectBD';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      carregando: false,
      erros: {},
    };
  }

  validar() {
    const { email, senha } = this.state;
    const erros = {};
    if (!email.trim()) {
      erros.email = 'Informe o e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      erros.email = 'Informe um e-mail válido.';
    }
    if (!senha) erros.senha = 'Informe a senha.';
    return erros;
  }

  logar = async () => {
    const erros = this.validar();
    if (Object.keys(erros).length > 0) { this.setState({ erros }); return; }

    this.setState({ carregando: true, erros: {} });

    const { email, senha } = this.state;

    const { data, error } = await supabase
      .from('table_cidadao')
      .select('*')
      .eq('email_cidadao', email.trim().toLowerCase())
      .eq('senha_cidadao', senha)
      .single();

    this.setState({ carregando: false });

    if (error || !data) {
      this.setState({
        erros: { geral: 'E-mail ou senha incorretos. Verifique seus dados e tente novamente.' },
      });
      return;
    }

    // ← passa cpf e nome para o HomeApp
    this.props.navigation.replace('HomeApp', {
      cpf:  data.cpf_cidadao,
      nome: data.nome_cidadao,
    });
  };

  render() {
    const { erros, carregando } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.subtitulo}>Sua conexão direta com a segurança</Text>
        </View>

        <View style={styles.form}>
          {erros.geral && (
            <View style={styles.boxErro}>
              <Text style={styles.txtErroGeral}>{erros.geral}</Text>
            </View>
          )}

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={[styles.input, erros.email && styles.inputErro]}
            placeholder="exemplo@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={txt => this.setState({ email: txt, erros: { ...this.state.erros, email: null, geral: null } })}
          />
          {erros.email && <Text style={styles.erroTexto}>{erros.email}</Text>}

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={[styles.input, erros.senha && styles.inputErro]}
            placeholder="Sua senha"
            secureTextEntry
            value={this.state.senha}
            onChangeText={txt => this.setState({ senha: txt, erros: { ...this.state.erros, senha: null, geral: null } })}
          />
          {erros.senha && <Text style={styles.erroTexto}>{erros.senha}</Text>}

          <TouchableOpacity
            style={[styles.botao, carregando && { opacity: 0.7 }]}
            onPress={this.logar}
            disabled={carregando}
          >
            <Text style={styles.txtBotao}>{carregando ? 'ENTRANDO...' : 'ENTRAR'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:    { flexGrow: 1, padding: 25, backgroundColor: '#fff' },
  header:       { alignItems: 'center', marginBottom: 30 },
  logo:         { width: 220, height: 100 },
  subtitulo:    { fontSize: 14, color: '#1a4f8b', marginTop: 8, textAlign: 'center' },
  form:         { width: '100%' },
  label:        { fontSize: 14, color: '#333', fontWeight: 'bold', marginBottom: 2 },
  input:        { borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 4, padding: 8, fontSize: 16 },
  inputErro:    { borderBottomColor: '#d32f2f' },
  erroTexto:    { color: '#d32f2f', fontSize: 12, marginBottom: 12 },
  boxErro:      { backgroundColor: '#ffebee', borderLeftWidth: 4, borderLeftColor: '#d32f2f', borderRadius: 6, padding: 14, marginBottom: 20 },
  txtErroGeral: { color: '#d32f2f', fontWeight: 'bold', fontSize: 14 },
  botao:        { backgroundColor: '#1a4f8b', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 15 },
  txtBotao:     { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
