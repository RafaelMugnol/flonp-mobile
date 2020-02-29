import React from 'react';
import Routes from './src/routes';
import NavigationService from './src/services/navigationService';

export default function App() {
  return (
    <Routes
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}
