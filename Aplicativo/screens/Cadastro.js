import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import firebase from '../config/config';

export default class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      nome: '',
      cpf: '',
      email: '', 
      senha: '', 
      confirmarSenha: '',
      carregando: false 
    };
  }

  /*cadastrarUsuario = () => {
    const { nome, cpf, email, senha, confirmarSenha } = this.state;

    // --- VALIDAÇÕES OBRIGATÓRIAS ---
    if (!nome || !cpf || !email || !senha || !confirmarSenha) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos (Nome, CPF, E-mail e Senha).');
      return;
    }

    if (cpf.length < 11) {
      Alert.alert('CPF Inválido', 'Por favor, insira um CPF válido com 11 dígitos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro nas senhas', 'A senha e a confirmação não são iguais.');
      return;
    }

    this.setState({ carregando: true });

    // 1. Cria o usuário no Firebase Auth
    firebase.auth().createUserWithEmailAndPassword(email.trim().toLowerCase(), senha)
      .then((userCredential) => {
        const uid = userCredential.user.uid;

        // 2. Salva os dados adicionais (Nome e CPF) no Database/Firestore
        // Aqui usamos o exemplo de salvamento que você tinha no projeto de pacientes
        firebase.database().ref('usuarios/' + uid).set({
          nome: nome,
          cpf: cpf,
          email: email.toLowerCase(),
          tipo: 'cidadao'
        });

        Alert.alert(
          'Sucesso!', 
          `Bem-vindo ao CIDADÃO+, ${nome}! Sua conta foi criada.`,
          [{ text: 'Ir para Login', onPress: () => this.props.navigation.navigate('LoginTab') }]
        );
      })
      .catch((error) => {
        Alert.alert('Erro', 'Não foi possível cadastrar: ' + error.message);
      })
      .finally(() => {
        this.setState({ carregando: false });
      });
  }*/

  cadastrarUsuario = () => {
    const { nome, cpf, email, senha } = this.state;

    if (!nome || !cpf || !email || !senha) {
      Alert.alert('Aviso', 'Preencha os campos para testar o fluxo.');
      return;
    }

    Alert.alert(
      'Sucesso (Modo Teste)', 
      `Usuário ${nome} criado com sucesso!`,
      [{ text: 'OK', onPress: () => this.props.navigation.navigate('LoginTab') }]
    );
    
    /* Quando estiver pronto para o Firebase, usaremos:
    firebase.auth().createUserWithEmailAndPassword(...)
    */
  }

  render() {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image 
              source={require('../assets/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.titulo}>Cadastro CIDADÃO+</Text>
          </View>

          <View style={styles.form}>
            {/* NOVO CAMPO: NOME */}
            <Text style={styles.label}>Nome Completo:</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Digite seu nome" 
              onChangeText={(txt) => this.setState({ nome: txt })}
            />

            {/* NOVO CAMPO: CPF */}
            <Text style={styles.label}>CPF:</Text>
            <TextInput 
              style={styles.input} 
              placeholder="000.000.000-00" 
              keyboardType="numeric"
              maxLength={11} // Limita a 11 números
              onChangeText={(txt) => this.setState({ cpf: txt })}
            />

            <Text style={styles.label}>E-mail:</Text>
            <TextInput 
              style={styles.input} 
              placeholder="exemplo@email.com" 
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(txt) => this.setState({ email: txt })}
            />

            <Text style={styles.label}>Senha:</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Mínimo 6 caracteres" 
              secureTextEntry 
              onChangeText={(txt) => this.setState({ senha: txt })}
            />

            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Repita a senha" 
              secureTextEntry 
              onChangeText={(txt) => this.setState({ confirmarSenha: txt })}
            />

            <TouchableOpacity 
              style={[styles.botao, this.state.carregando && { opacity: 0.7 }]} 
              onPress={this.cadastrarUsuario}
              disabled={this.state.carregando}
            >
              <Text style={styles.txtBotao}>
                {this.state.carregando ? 'PROCESSANDO...' : 'FINALIZAR CADASTRO'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { width:220, height: 100 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#1a4f8b', marginTop: 10 },
  form: { width: '100%' },
  label: { fontSize: 14, color: '#333', fontWeight: 'bold', marginBottom: 2 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 15, padding: 8, fontSize: 16 },
  botao: { backgroundColor: '#1a4f8b', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 15 },
  txtBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});