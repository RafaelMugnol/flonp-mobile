import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


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

const LoginStack = createStackNavigator(
  {
    Login,
    SignUp,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const FavoritosTab = createStackNavigator(
  {
    Favoritos,
    Produtos,
    ProdutoDetalhe,
    SupermercadoDetalhe,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const PrincipalTab = createStackNavigator(
  {
    Supermercados,
    SupermercadosMapa,
    SupermercadoDetalhe,
    Produtos,
    ProdutoDetalhe,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const PesquisaTab = createStackNavigator(
  {
    Pesquisa,
    ProdutoDetalhe,
    SupermercadoDetalhe,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const ConfiguracoesTab = createStackNavigator(
  {
    Configuracoes,
    Perfil,
    RedefinicaoSenha,
    SugestaoSupermercado,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#455a64',
      },
      headerTintColor: '#fff',
      title: 'Configurações',
      headerBackTitle: 'Voltar',
    },
  },
);

const TabsPrincipais = createBottomTabNavigator(
  {
    FavoritosTab,
    PrincipalTab,
    PesquisaTab,
    ConfiguracoesTab,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={`ios-${getIconTab(navigation.state.routeName)}`}
          size={30}
          color={tintColor}
        />
      ),
      tabBarLabel: ({ tintColor }) => (
        <Text style={{ fontSize: 10, color: tintColor, textAlign: 'center' }}>
          {getLabelTab(navigation.state.routeName)}
        </Text>
      ),
    }),
    tabBarOptions: {
      activeTintColor: '#455a64',
      inactiveTintColor: '#aaa',
    },
  },
);

function getIconTab(tab) {
  switch (tab) {
    case 'FavoritosTab': return 'star';
    case 'PrincipalTab': return 'home';
    case 'PesquisaTab': return 'search';
    case 'ConfiguracoesTab': return 'settings';
    default: return '';
  }
}

function getLabelTab(tab) {
  switch (tab) {
    case 'FavoritosTab': return 'Favoritos';
    case 'PrincipalTab': return 'Supermercados';
    case 'PesquisaTab': return 'Pesquisa';
    case 'ConfiguracoesTab': return 'Configurações';
    default: return '';
  }
}

const routes = createSwitchNavigator({
  LoginStack,
  TabsPrincipais,
});


export default createAppContainer(routes);
