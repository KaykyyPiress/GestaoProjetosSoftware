import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// --- IMPORTAÇÃO DAS TELAS ---
// Certifique-se de criar esses arquivos na pasta 'screens'
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import SelecaoEmergencia from './screens/SelecaoEmergencia';
import RelatoOcorrencia from './screens/RelatoOcorrencia';
import Historico from './screens/Historico';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// --- ABA DE AUTENTICAÇÃO (Login e Cadastro juntas) ---
function AuthTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff4444',
      }}>
      <Tab.Screen
        name="LoginTab"
        component={Login}
        options={{
          tabBarLabel: 'Entrar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CadastroTab"
        component={Cadastro}
        options={{
          tabBarLabel: 'Criar Conta',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// --- FLUXO PRINCIPAL DO APP ---
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          {/* Tela inicial: Abas de Login/Cadastro */}
          <Stack.Screen
            name="Auth"
            component={AuthTabs}
            options={{ headerShown: false }}
          />

          {/* Tela de Seleção de Ocorrência (Após o Login) */}
          <Stack.Screen
            name="HomeApp"
            component={SelecaoEmergencia}
            options={{
              title: 'Central de Emergência',
              headerLeft: null, // Impede de voltar para o login
            }}
          />

          {/* Tela para descrever o que houve */}
          <Stack.Screen
            name="Relato"
            component={RelatoOcorrencia}
            options={{ title: 'Detalhes da Ocorrência' }}
          />

          {/* Tela de Histórico */}
          <Stack.Screen
            name="Historico"
            component={Historico}
            options={{ title: 'Meus Registros' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
