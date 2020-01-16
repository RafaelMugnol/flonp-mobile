import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import Login from './pages/Login';

import Favoritos from './pages/Favoritos';

import Supermercados from './pages/Supermercados';
import Produtos from './pages/Produtos';

import Pesquisa from './pages/Pesquisa';

import Configuracoes from './pages/Configuracoes';


const FavoritosTab = createStackNavigator(
  {
    Favoritos
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#455a64',
      },
      headerTintColor: '#fff',
      title: 'Favoritos',
    },
  }
);

const PrincipalTab = createStackNavigator(
  {
    Supermercados,
    Produtos
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    },
  }
);

const PesquisaTab = createStackNavigator(
  {
    Pesquisa
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#455a64',
      },
      headerTintColor: '#fff',
      title: 'Pesquisa',
    },
  }
);

const ConfiguracoesTab = createStackNavigator(
  {
    Configuracoes
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#455a64',
      },
      headerTintColor: '#fff',
      title: 'Configurações',
    },
  }
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
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Icon name={"ios-" + getIconTab(navigation.state.routeName)} size={30} color={tintColor} />;
      },
      tabBarLabel: ({ tintColor }) => {
        return <Text style={{ fontSize: 10, color: tintColor }}>{getLabelTab(navigation.state.routeName)}</Text>;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#455a64',
      inactiveTintColor: '#aaa',
    },
  }
);

function getIconTab(tab) {
  switch (tab) {
    case "FavoritosTab": return "star";
    case "PrincipalTab": return "home";
    case "PesquisaTab": return "search";
    case "ConfiguracoesTab": return "settings";
  }
}

function getLabelTab(tab) {
  switch (tab) {
    case "FavoritosTab": return "Favoritos";
    case "PrincipalTab": return "Supermercados";
    case "PesquisaTab": return "Pesquisa";
    case "ConfiguracoesTab": return "Configurações";
  }
}

const routes = createSwitchNavigator({
  Login,
  TabsPrincipais,
});


export default createAppContainer(routes);