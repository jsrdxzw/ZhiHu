import React from 'react';
import {NavigationActions} from 'react-navigation';

const action = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'tabView'})
    ]
});

export default class WelcomePage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigation.dispatch(action)
        }, 100);
    }

    render() {
        return null
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

}