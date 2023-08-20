
import ReactDOM from 'react-dom/client'

import './index.css'
import Router from './Page/Routers/router';
import { Provider } from 'react-redux';
import { store } from './app/Store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router />

  </Provider>
)
