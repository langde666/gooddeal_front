import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import store from './store';
import './style.css';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Routes />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root'),
);
