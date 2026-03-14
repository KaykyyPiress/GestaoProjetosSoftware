import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
// Note que não precisamos mais importar ícones aqui, pois usaremos a logo.
import firebase from '../config/config';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', senha: '' };
  }
  
  logar = () => {
  const { email, senha } = this.state;
  
  // Lógica temporária: aceita qualquer coisa que não esteja vazia
  if (email && senha) {
    this.props.navigation.replace('HomeApp'); 
  } else {
    Alert.alert('Aviso', 'Por favor, preencha algo para testar o login.');
  }

  /* Deixaremos o Firebase guardado aqui para depois:
  firebase.auth().signInWithEmailAndPassword(email.trim().toLowerCase(), senha)
    .then(() => { this.props.navigation.replace('HomeApp'); })
    .catch(error => Alert.alert("Erro", "Falha no login"));
  */
}

  /*logar = () => {
    const { email, senha } = this.state;
    if (!email || !senha) {
      Alert.alert('Preencha os campos', 'Por favor, insira e-mail e senha.');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email.trim().toLowerCase(), senha)
      .then(() => {
        // Redireciona para a central, limpando o histórico de navegação do login
        this.props.navigation.replace('HomeApp');
      })
      .catch(error => Alert.alert("Erro de Acesso", "E-mail ou senha incorretos."));
  }*/

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Adicionando sua logo aqui */}
        <View style={styles.header}>
          <Image 
            source={require('../assets/logo.png')} // Caminho para sua logo
            style={styles.logo}
            resizeMode="contain" // Mantém a proporção da imagem
          />
          <Text style={styles.subtitulo}>Sua conexão direta com a segurança</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="exemplo@email.com" 
            keyboardType="email-address"
            onChangeText={(txt) => this.setState({email: txt})}
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Sua senha" 
            secureTextEntry 
            onChangeText={(txt) => this.setState({senha: txt})}
          />

          <TouchableOpacity style={styles.botao} onPress={this.logar}>
            <Text style={styles.txtBotao}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

// Estilos adaptados com as cores da logo
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 30, backgroundColor: '#fff', justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 50 },
  logo: { width: 220, height: 100 },
  subtitulo: { fontSize: 16, color: '#555', marginTop: 10, textAlign: 'center' },
  form: { width: '100%' },
  label: { fontSize: 16, color: '#333', fontWeight: 'bold', marginBottom: 5 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 25, padding: 10, fontSize: 16 },
  botao: { backgroundColor: '#1a4f8b', padding: 18, borderRadius: 10, alignItems: 'center' }, // Azul da logo
  txtBotao: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});