import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Supermercados from './pages/Supermercados';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Supermercados
    })
);

export default Routes;