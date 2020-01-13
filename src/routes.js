import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Supermercados from './pages/Supermercados';
import Produtos from './pages/Produtos';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Supermercados,
        Produtos
    })
);

export default Routes;