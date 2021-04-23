import * as React from 'react';
import { AsyncStorage, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { navigationRef } from './services/rootNavigation';

import Login from './pages/Login';
import SignUp from './pages/SignUp';

import Favoritos from './pages/Favoritos';

import Supermercados from './pages/Supermercados';
import SupermercadosMapa from './pages/SupermercadosMapa';
import Produtos from './pages/Produtos';
import SupermercadoDetalhe from './pages/SupermercadoDetalhe';
import ProdutoDetalhe from './pages/ProdutoDetalhe';

import Pesquisa from './pages/Pesquisa';

import Configuracoes from './pages/Configuracoes';
import Perfil from './pages/Perfil';
import RedefinicaoSenha from './pages/RedefinicaoSenha';
import SugestaoSupermercado from './pages/SugestaoSupermercado';
import AuthContext from './services/authContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      // screenOptions={{ gestureEnabled: false }}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function FavoritosTab() {
  return (
    <Stack.Navigator
      initialRouteName="Favoritos"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Favoritos" component={Favoritos} />
      <Stack.Screen name="Produtos" component={Produtos} />
      <Stack.Screen name="ProdutoDetalhe" component={ProdutoDetalhe} />
      <Stack.Screen name="SupermercadoDetalhe" component={SupermercadoDetalhe} />
    </Stack.Navigator>
  );
}

function PrincipalTab() {
  return (
    <Stack.Navigator
      initialRouteName="Supermercados"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Supermercados" component={Supermercados} />
      <Stack.Screen name="SupermercadosMapa" component={SupermercadosMapa} />
      <Stack.Screen name="SupermercadoDetalhe" component={SupermercadoDetalhe} />
      <Stack.Screen name="Produtos" component={Produtos} />
      <Stack.Screen name="ProdutoDetalhe" component={ProdutoDetalhe} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function PesquisaTab() {
  return (
    <Stack.Navigator
      initialRouteName="Pesquisa"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Pesquisa" component={Pesquisa} />
      <Stack.Screen name="ProdutoDetalhe" component={ProdutoDetalhe} />
      <Stack.Screen name="SupermercadoDetalhe" component={SupermercadoDetalhe} />
    </Stack.Navigator>
  );
}

function ConfiguracoesTab() {
  return (
    <Stack.Navigator
      initialRouteName="Configuracoes"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#455a64',
        },
        headerTintColor: '#fff',
        title: 'Configurações',
        headerBackTitle: 'Voltar',
      }}
    >
      <Stack.Screen name="Configuracoes" component={Configuracoes} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="RedefinicaoSenha" component={RedefinicaoSenha} />
      <Stack.Screen name="SugestaoSupermercado" component={SugestaoSupermercado} />
    </Stack.Navigator>
  );
}

function TabsPrincipais() {
  return (
    <Tab.Navigator
      initialRouteName="PrincipalTab"
      tabBarOptions={{
        activeTintColor: '#455a64',
        inactiveTintColor: '#aaa',
      }}
    >
      <Tab.Screen
        name="FavoritosTab"
        component={FavoritosTab}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-star" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="PrincipalTab"
        component={PrincipalTab}
        options={{
          tabBarLabel: 'Supermercados',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-home" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="PesquisaTab"
        component={PesquisaTab}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-search" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Configurações"
        component={ConfiguracoesTab}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-settings" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function SplashScreenContent() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function SplashScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreenContent} />
    </Stack.Navigator>
  );
}

function Routes() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('accessToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // data.accessToken
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>

      <NavigationContainer ref={navigationRef}>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <SplashScreen />
        ) : state.userToken == null ? (
          // No token found, user isn't signed in
          <LoginStack />
        ) : (
        // User is signed in
          <TabsPrincipais />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default Routes;
