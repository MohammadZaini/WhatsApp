import { Navigation } from './src/infrastructure/navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as Font from 'expo-font'
import { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  // useEffect(() => {
  //   const prepare = async () => {

  //     try {
  //       await Font.loadAsync({

  //       })
  //     } catch (error) {
  //       console.log(error);
  //     }

  //   };

  //   prepare();
  // }, []);

  return (
    <Provider store={store} >
      <MenuProvider>
        <Navigation />
      </MenuProvider>
    </Provider>
  );
};