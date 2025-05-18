import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
container.classList.add('page');
const root = createRoot(container);
const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// if ('serviceWorker' in navigator) {
//   // Поддерживается Service Worker API
//   navigator.serviceWorker.register('/serviceWorker.js')
//     .then((registration) => {
//       console.log('Service Worker зарегистрирован:', registration);
//       // Здесь вы можете запросить разрешение на получение уведомлений
//       return registration.pushManager.getSubscription()
//         .then((subscription) => {
//           if (subscription) {
//             // Пользователь уже подписан на Push уведомления
//             return subscription;
//           }

//           // Запросите разрешение на получение уведомлений
//           return registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: 'your_public_key',
//           });
//         });
//     })
//     .then((subscription) => {
//       console.log('Пользователь подписан на Push уведомления:', subscription);
//       // Дальнейшая обработка подписки
//     })
//     .catch((error) => {
//       console.log('Ошибка при регистрации Service Worker:', error);
//     });
// } else {
//   // Не поддерживается Service Worker API
//   console.log('Service Worker не поддерживается');
// }
