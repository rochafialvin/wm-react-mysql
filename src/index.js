import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './reducers/index'
import 'bootstrap/dist/css/bootstrap.min.css';

let _store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render( 
   <Provider store={_store}>
      <App/>
   </Provider>,
   document.getElementById('root')
)