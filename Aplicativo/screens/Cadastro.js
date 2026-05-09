import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { supabase } from '../components/connectBD';

export default class Cadastro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cpf: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      carregando: false,
      sucesso: false,
      erros: {},
    };
  }

  validar() {
    const { nome, cpf, email, senha, confirmarSenha } = this.state;
    const erros = {};

    // Nome: pelo menos 2 palavras com 2+ letras cada
    const partes = nome.trim().split(/\s+/);
    if (!nome.trim()) {
      erros.nome = 'Informe seu nome completo.';
    } else if (partes.length < 2 || partes.some((p) => p.length < 2)) {
      erros.nome = 'Informe nome e sobrenome (mínimo 2 letras cada).';
    }

    // CPF: exatamente 11 dígitos
    if (!cpf.trim()) {
      erros.cpf = 'Informe o CPF.';
    } else if (!/^\d{11}$/.test(cpf)) {
      erros.cpf = 'CPF deve ter exatamente 11 números, sem pontos ou traços.';
    }

    // E-mail
    if (!email.trim()) {
      erros.email = 'Informe o e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      erros.email = 'Informe um e-mail válido. Ex: exemplo@email.com';
    }

    // Senha
    if (!senha) {
      erros.senha = 'Informe uma senha.';
    } else if (senha.length < 6) {
      erros.senha = 'A senha deve ter no mínimo 6 caracteres.';
    }

    // Confirmar senha
    if (!confirmarSenha) {
      erros.confirmarSenha = 'Confirme sua senha.';
    } else if (senha !== confirmarSenha) {
      erros.confirmarSenha = 'As senhas não coincidem.';
    }

    return erros;
  }

  async enviarEmailCadastro(nome, email) {
  const data = {
    service_id: 'service_hgdg1fy',
    template_id: 'template_kkl35gd',
    user_id: 'U6rkQZ1xkWYHuHTbP',
    accessToken: 'VOZK3IOdne0B0CTDH3uyL',
    template_params: {
      nome: nome,
      email: email,
      cta_url: 'https://snack.expo.dev/@kayky_pires/cidadao?platform=android',
      ano: new Date().getFullYear(),
    },
  };

    try {
      const response = await fetch(
        'https://api.emailjs.com/api/v1.0/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const textoErro = await response.text();
        console.log('Falha ao enviar e-mail:', textoErro);
      } else {
        console.log('E-mail enviado com sucesso.');
      }
    } catch (error) {
      console.log('Erro ao enviar e-mail:', error);
    }
  }

  cadastrarUsuario = async () => {
    const erros = this.validar();

    if (Object.keys(erros).length > 0) {
      this.setState({ erros, sucesso: false });
      return;
    }

    this.setState({ carregando: true, erros: {}, sucesso: false });

    const { nome, cpf, email, senha } = this.state;
    const emailFormatado = email.trim().toLowerCase();
    const nomeFormatado = nome.trim();
    const cpfFormatado = cpf.trim();

    try {
      // Verifica CPF duplicado
      const { data: cpfExistente, error: erroCpf } = await supabase
        .from('table_cidadao')
        .select('cpf_cidadao')
        .eq('cpf_cidadao', cpfFormatado)
        .single();

      if (erroCpf && erroCpf.code !== 'PGRST116') {
        this.setState({
          carregando: false,
          erros: { geral: 'Erro ao verificar CPF. Tente novamente.' },
        });
        return;
      }

      if (cpfExistente) {
        this.setState({
          carregando: false,
          erros: { cpf: 'Este CPF já está cadastrado.' },
        });
        return;
      }

      // Verifica e-mail duplicado
      const { data: emailExistente, error: erroEmail } = await supabase
        .from('table_cidadao')
        .select('email_cidadao')
        .eq('email_cidadao', emailFormatado)
        .single();

      if (erroEmail && erroEmail.code !== 'PGRST116') {
        this.setState({
          carregando: false,
          erros: { geral: 'Erro ao verificar e-mail. Tente novamente.' },
        });
        return;
      }

      if (emailExistente) {
        this.setState({
          carregando: false,
          erros: { email: 'Este e-mail já está cadastrado.' },
        });
        return;
      }

      // Insere no banco
      const { error } = await supabase.from('table_cidadao').insert([
        {
          nome_cidadao: nomeFormatado,
          cpf_cidadao: cpfFormatado,
          email_cidadao: emailFormatado,
          senha_cidadao: senha,
        },
      ]);

      if (error) {
        this.setState({
          carregando: false,
          erros: { geral: 'Erro ao cadastrar. Tente novamente.' },
        });
        return;
      }

      // Envia e-mail de confirmação
      await this.enviarEmailCadastro(nomeFormatado, emailFormatado);

      // Limpa campos e mostra sucesso
      this.setState({
        carregando: false,
        sucesso: true,
        erros: {},
        nome: '',
        cpf: '',
        email: '',
        senha: '',
        confirmarSenha: '',
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso.');
    } catch (e) {
      console.log('Erro geral no cadastro:', e);
      this.setState({
        carregando: false,
        erros: { geral: 'Ocorreu um erro inesperado. Tente novamente.' },
      });
    }
  };

  render() {
    const {
      nome,
      cpf,
      email,
      senha,
      confirmarSenha,
      erros,
      sucesso,
      carregando,
    } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.titulo}>Criar Conta</Text>
            <Text style={styles.subtitulo}>
              Preencha os dados abaixo para se cadastrar
            </Text>

            {sucesso ? (
              <Text style={styles.sucesso}>
                Cadastro realizado com sucesso.
              </Text>
            ) : null}

            {erros.geral ? <Text style={styles.erro}>{erros.geral}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              value={nome}
              onChangeText={(text) => this.setState({ nome: text })}
            />
            {erros.nome ? <Text style={styles.erro}>{erros.nome}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="CPF"
              keyboardType="numeric"
              value={cpf}
              onChangeText={(text) =>
                this.setState({ cpf: text.replace(/\D/g, '') })
              }
              maxLength={11}
            />
            {erros.cpf ? <Text style={styles.erro}>{erros.cpf}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
            />
            {erros.email ? <Text style={styles.erro}>{erros.email}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={(text) => this.setState({ senha: text })}
            />
            {erros.senha ? <Text style={styles.erro}>{erros.senha}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={(text) =>
                this.setState({ confirmarSenha: text })
              }
            />
            {erros.confirmarSenha ? (
              <Text style={styles.erro}>{erros.confirmarSenha}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.botao, carregando && styles.botaoDesabilitado]}
              onPress={this.cadastrarUsuario}
              disabled={carregando}
            >
              <Text style={styles.botaoTexto}>
                {carregando ? 'Cadastrando...' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#2f7e8c',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  erro: {
    color: '#dc2626',
    fontSize: 13,
    marginTop: 6,
  },
  sucesso: {
    color: '#15803d',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});