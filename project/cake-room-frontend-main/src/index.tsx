import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store as setupStore} from './store'
import App from './components/app/App';

import './style/main.scss'

const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
            <App />
    </Provider>
  // </React.StrictMode>
);
