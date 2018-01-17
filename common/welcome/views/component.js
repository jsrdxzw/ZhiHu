import React from 'react';
import {NavigationActions} from 'react-navigation';

const action = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'tabView'})
    ]
});

export default class WelcomePage extends React.PureComponent{
    static navigationOptions = {
        header: null
    };
    componentDidMount(){
        this.props.getUserFromLocal();
        this.timer = setTimeout(() => {
            this.props.navigation.dispatch(action)
        },100);
    }
    render(){
        return null
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

}