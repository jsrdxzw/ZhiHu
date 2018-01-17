import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Tabs} from 'antd-mobile';
import InviteNotification from "../components/invite-notification";

const tabs = [
    {
        title:'邀请'
    },
    {
        title:'回答'
    },
    {
        title:'评论'
    }
];

export default class Notification extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerTintColor: 'rgba(0, 0, 0, 0.85098)',
            headerStyle: {backgroundColor: 'white'},
            title: '通知',
            tabBarLabel: '通知',
            tabBarIcon: ({tintColor}) => (
                <Icon name={'ios-notifications'} size={24} style={{color: tintColor}}/>
            )
        }
    };

    render() {
        const {user} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <Text>通知列表</Text>
                </View>
                {user.isLogin ?
                    <Tabs
                        tabs={tabs}
                        initialPage={0}
                        onChange={this.tabOnChange}
                        tabBarUnderlineStyle={{backgroundColor: '#000'}}
                        tabBarActiveTextColor={'#000'}
                        tabBarInactiveTextColor={'rgba(0, 0, 0, 0.45098)'}
                        swipeable={false}
                    >
                        <InviteNotification type={'invite'}/>
                        <InviteNotification type={'answer'}/>
                        <InviteNotification type={'comment'}/>
                    </Tabs>
                    :
                    <Text style={styles.loginTip}>请先登录</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8'
    },
    headerStyle: {
        padding: 10,
        backgroundColor: '#fafafa'
    },
    loginTip:{
        alignSelf:'center',
        justifyContent:'center',
        marginTop:10,
        fontSize:16
    }
});