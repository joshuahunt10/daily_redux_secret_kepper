import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/reducer.js'

import App from './components/App';
import BaseLayout from './components/BaseLayout';
import Registration from './components/Registration';
import Login from './components/Login';
import UserDetails from './components/UserDetails';
import RegistrationGood from './components/RegistrationGood'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/registration/good' component={RegistrationGood} />
          <Route path='/login' component={Login} />
          <Route path='/registration' component={Registration} />
          <Route path='/userdetails' component={UserDetails} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>

, document.getElementById('root'));
registerServiceWorker();
