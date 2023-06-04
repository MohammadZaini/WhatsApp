import { Navigation } from './src/infrastructure/navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  return (
    <Provider store={store} >
      <Navigation />
    </Provider>
  );
};