import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import ReactDOM  from 'react-dom';
import * as React from "react";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

