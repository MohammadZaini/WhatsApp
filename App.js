import { Navigation } from './src/infrastructure/navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage.clear()
export default function App() {
  return (
    <Provider store={store} >
      <Navigation />
    </Provider>
  );
};