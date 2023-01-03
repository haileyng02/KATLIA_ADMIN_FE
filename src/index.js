import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { ConfigProvider } from 'antd';
import { SnackbarProvider } from "notistack";
import './index.css';
import App from './App';
import allReducers from './reducers';
import reportWebVitals from './reportWebVitals';

const middleware = [thunk]
const store = createStore(allReducers, applyMiddleware(...middleware));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <SnackbarProvider autoHideDuration={2000} anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}>
      <Provider store={store}>
        <ConfigProvider theme={{ token: { colorPrimary: '#C85A2791' } }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </SnackbarProvider>
  // </React.StrictMode >
);

reportWebVitals();
