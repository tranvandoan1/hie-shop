
import ReactDOM from 'react-dom/client'

import './index.css'
// @ts-ignore
import Router from './Page/Routers/router';
import { Provider } from 'react-redux';
// @ts-ignore
import { store } from './app/Store';
// document.onkeydown = function (event) {
//   if (event.keyCode == 123) { // Kiểm tra nếu phím nhấn là F12
//     return false; // Ngăn chặn hành động mặc định của phím F12
//   }
// };
// document.addEventListener('contextmenu', function (event) {
//   event.preventDefault(); // Ngăn chặn hiển thị menu chuột phải mặc định
// });
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router />

  </Provider>
)
