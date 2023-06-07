import { Navigation } from './src/infrastructure/navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as Font from 'expo-font'
import { useEffect } from 'react';

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
      <Navigation />
    </Provider>
  );
};