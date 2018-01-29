import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Tabs} from 'antd-mobile';
import InviteNotification from "../components/invite-notification";

const tabs = [
    {
        title:'招待'
    },
    {
        title:'回答'
    },
    {
        title:'コメント'
    }
];

export default class Notification extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerTintColor: 'rgba(0, 0, 0, 0.85098)',
            headerStyle: {backgroundColor: 'white'},
            title: '知らせ',
            tabBarLabel: '知らせ',
            tabBarIcon: ({tintColor}) => (
                <Icon name={'ios-notifications'} size={24} style={{color: tintColor}}/>
            ),
            tabBarOnPress:(routeParams)=>{
                params.set_tab_index(routeParams.scene.index);
                routeParams.jumpToIndex(2)
            },
        }
    };

    constructor(props) {
        super(props);
        this.set_tab_index = this.set_tab_index.bind(this);
        this.props.navigation.setParams({set_tab_index:this.set_tab_index})
    }

    set_tab_index(index){
        this.props.setTabIndex(index)
    }


    render() {
        const {user} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <Text>知らせリスト</Text>
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
                    <Text style={styles.loginTip}>ログインしてください</Text>
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