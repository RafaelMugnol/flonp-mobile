// https://reactnavigation.org/docs/4.x/navigating-without-navigation-prop
import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
    }),
  );
}

// add other navigation functions that you need and export them
export default {
  navigate,
  setTopLevelNavigator,
};
