
import ReactDOM from 'react-dom/client'

import './index.css'
// @ts-ignore
import Router from './Page/Routers/router';
import { Provider } from 'react-redux';
// @ts-ignore
import { store } from './app/Store';

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router />

  </Provider>
)
