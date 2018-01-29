import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import ChatList from "../components/chat-user-list";
import ChatIcon from '../components/chatIcon';

export default class Chat extends React.Component{

    constructor(props) {
        super(props);
        this.set_tab_index = this.set_tab_index.bind(this);
        this.clearUnread = this.clearUnread.bind(this);
        this.props.navigation.setParams({set_tab_index:this.set_tab_index,clearUnread:this.clearUnread});
    }

    set_tab_index(index){
        this.props.setTabIndex(index);
    }

    clearUnread(){
        this.props.clearUnread()
    }

    static navigationOptions = ({navigation})=>{
        const {params = {}} = navigation.state;
        return {
            headerTintColor: 'rgba(0, 0, 0, 0.85098)',
            headerStyle: {backgroundColor: 'white'},
            title: 'メッセージ',
            tabBarLabel: 'メッセージ',
            tabBarIcon: ({tintColor}) => (
                <ChatIcon tintColor={tintColor}/>
            ),
            tabBarOnPress:(routeParams)=>{
                params.set_tab_index(routeParams.scene.index);
                params.clearUnread();
                routeParams.jumpToIndex(1)
            }
        }
    };

    componentWillReceiveProps(nextProps) {
        if ((nextProps.messages && !nextProps.currentChatter) || (nextProps.messages && nextProps.currentChatter !== this.props.user._id)) {

            if (nextProps.messages.sender === this.props.user._id &&nextProps.messages!==this.props.messages) {
                if(this._isMounted) {
                    this.setState((prevState, props) => ({
                        unReadCount: prevState.unReadCount + 1
                    }));
                }
            }
        }
    }

    render(){
        const {user} = this.props;
        return(
            <View style={styles.container}>
                {user.isLogin?
                        <ChatList/>
                    :
                    <Text style={styles.loginTip}>ログインしてください</Text>
                }
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#e8e8e8'
    },
    loginTip:{
        alignSelf:'center',
        justifyContent:'center',
        marginTop:10,
        fontSize:16
    }
});