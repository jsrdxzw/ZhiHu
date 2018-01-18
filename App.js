import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './common/Store';
import RootNavigator from './common/navigation';
import './common/utils/local-moment';
import './common/utils/websocket';

export default class App extends Component<{}> {
    render() {
        return (
            <Provider store={store}>
                <RootNavigator/>
            </Provider>
        );
    }
}

