import React from 'react';
import {render} from 'react-dom';
import AppContext from './AppContext';
import Provider from 'react-redux/es/components/Provider';
import store from './createStore';
import {Router, BrowserRouter} from 'react-router-dom';
import history from './history';
import App from './App';

render(
  <AppContext.Provider value={{}}>
        <Provider store={store}>
            <Router history={history}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Router>
        </Provider>
    </AppContext.Provider>

    , document.getElementById('root')
);

