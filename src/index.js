import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.scss'
import './module/config'
import registerServiceWorker from './registerServiceWorker';
import store from './store'
import { Provider } from 'react-redux'

// 配置的路由
import Router from './router'
ReactDOM.render(
  <Provider store = { store }>
    <Router/>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
