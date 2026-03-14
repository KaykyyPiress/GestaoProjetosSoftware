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
// import firebase from '../config/config';
import { supabase } from '../components/connectBD'

console.log("URL:", supabase.supabaseUrl)

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
    console.log("entrou na função")

    this.validarCPF = (cpf) => {
      cpf = cpf.replace(/[^\d]+/g, '')

      if (cpf.length !== 11) return false

      if (/^(\d)\1+$/.test(cpf)) return false

      let soma = 0
      let resto

      for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)

      resto = (soma * 10) % 11

      if (resto === 10 || resto === 11)
        resto = 0

      if (resto !== parseInt(cpf.substring(9, 10)))
        return false

      soma = 0

      for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)

      resto = (soma * 10) % 11

      if (resto === 10 || resto === 11)
        resto = 0

      if (resto !== parseInt(cpf.substring(10, 11)))
        return false

      return true
    }

    this.cadastrarUsuario = async () => {
      const { nome, cpf, email, senha, confirmarSenha } = this.state

      // Verifica se os campos foram preenchidos
      if (!nome || !cpf || !email || !senha || !confirmarSenha) {
        Alert.alert('Atenção', 'Preencha todos os campos')
        return
      }

      // valida CPF
      if (!this.validarCPF(cpf)) {
        Alert.alert("CPF inválido", "Digite um CPF válido")
        return
      }

      // verifica se já existe
      const { data: cpfExistente, error: erroCpf } = await supabase
        .from('table_cidadao')
        .select('cpf_cidadao')
        .eq('cpf_cidadao', cpf)
        .limit(1)

      if (erroCpf) {
        Alert.alert("Erro", "Erro ao verificar CPF")
        return
      }

      if (cpfExistente.length > 0) {
        Alert.alert("CPF já cadastrado", "Este CPF já existe.")
        return
      }

      // se passou nas validações → insere
      const { data, error } = await supabase
        .from('table_cidadao')
        .insert([
          { nome_cidadao: nome,
            cpf_cidadao: cpf, 
            email_cidadao: email, 
            senha_cidadao: senha }
        ])
        .select()
      
      this.setState({ carregando: false })
      console.log("funcionou")
      if (error) {
        console.log('Erro ao cadastrar:', error)
        Alert.alert('Erro', error.message)
        return
      }


      console.log('Usuário cadastrado:', data)
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')

      this.setState({
        nome: '',
        cpf: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        carregando: false
      })
    }
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
              placeholder="00000000000" 
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