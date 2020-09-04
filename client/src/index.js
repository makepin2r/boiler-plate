import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'; // index.js 는 생략해도 알아서 인식
import 'antd/dist/antd.css'; 

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore) // 미들웨어를 적용한 스토어 생성

ReactDOM.render(
  // redux 앱에 연결
  <Provider
   store={createStoreWithMiddleware(Reducer,//리듀서
     window.__REDUX_DEVTOOLS_EXTENSION__ &&
     window.__REDUX_DEVTOOLS_EXTENSION__() //chrome extension
     )} // 생성한 스토어,를 넣어준다
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
