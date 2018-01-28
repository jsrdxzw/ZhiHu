import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import ItemCard from "../components/item-card";
import LoginViewModal from "../components/loginViewModal";
import InfoCard from "../components/info-avatar-card";
import LogoutItem from "../components/logOutItem";
import {disConnectSocket} from '../../utils/websocket';

const width = Dimensions.get('window').width;

export default class UserCenter extends React.Component {

    static navigationOptions = {
        headerTintColor: 'rgba(0, 0, 0, 0.85098)',
        headerStyle: {backgroundColor: 'white'},
        title: '設定',
        tabBarLabel: '設定',
        tabBarIcon: ({tintColor}) => (
            <Icon name={'ios-settings'} size={24} style={{color: tintColor}}/>
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.switchModal = this.switchModal.bind(this);
        this.startLogin = this.startLogin.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        this.props.getUserFromLocal()
    }

    /** 2017/12/22
     * author: XU ZHI WEI
     * function: 显示登录的模态框
     */
    switchModal() {
        this.setState({visible: !this.state.visible})
    }

    /** 2017/12/22
     * author: XU ZHI WEI
     * function:用户开始登录
     */
    startLogin(email, password) {
        this.switchModal();
        this.props.login(email, password)
    }


    /** 2017/12/23
     * author: XU ZHI WEI
     * function: 用户登出，清理本地缓存
     */
    logout() {
        this.props.logout();
    }

    render() {
        const {user} = this.props;
        return (
            <ScrollView style={styles.container}>
                {user.isLogin ? (
                    <View>
                        <InfoCard name={user.name} gender={user.gender} avatar={user.avatar} email={user.email}
                                  navigation={this.props.navigation}/>
                        <View style={{marginTop: 20}}>
                            <ItemCard title={'私の問題'} to={'myQuestionList'} navigation={this.props.navigation} type={'question'}/>
                            <ItemCard title={'私の関心'} to={'myQuestionList'} navigation={this.props.navigation} type={'concern'}/>
                            <ItemCard title={'私の回答'} to={'myQuestionList'} navigation={this.props.navigation} type={'answer'}/>
                        </View>
                        <View style={{marginTop: 20}}>
                            <ItemCard title={'私のコレクション'} to={'collectionList'} navigation={this.props.navigation} type={'collection'}/>
                        </View>

                        <View style={{marginTop: 20}}>
                            <LogoutItem logout={this.logout}/>
                        </View>
                    </View>
                ) : (
                    <View>
                        <LoginViewModal visible={this.state.visible}
                                        switchModal={this.switchModal}
                                        startLogin={this.startLogin}
                        />
                        <View style={styles.loginCard}>
                            <Text style={{fontSize: 16}}>ログイン，機能をもっと体験しよう</Text>
                            <TouchableOpacity onPress={this.switchModal}>
                                <Text style={{color: 'gray'}}>ログインスタート</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
        )
    }

    componentWillUnmount(){
        disConnectSocket(this.props.user._id);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8'
    },
    loginCard: {
        marginTop: 15,
        width: width,
        height: 64,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});