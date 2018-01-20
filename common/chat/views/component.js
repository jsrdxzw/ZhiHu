import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatList from "../components/chat-user-list";

export default class Chat extends React.Component{

    static navigationOptions = ({navigation})=>{
        const {params = {}} = navigation.state;
        return {
            headerTintColor: 'rgba(0, 0, 0, 0.85098)',
            headerStyle: {backgroundColor: 'white'},
            title: 'メッセージ',
            tabBarLabel: 'メッセージ',
            tabBarIcon: ({tintColor}) => (
                <Icon name={'md-chatboxes'} size={24} style={{color: tintColor}}/>
            )
        }
    };

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