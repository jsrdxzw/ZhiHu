import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import ItemCard from "../components/item-card";
import LoginViewModal from "../components/loginViewModal";
import InfoCard from "../components/info-avatar-card";
import LogoutItem from "../components/logOutItem";

const width = Dimensions.get('window').width;

export default class UserCenter extends React.Component {

    static navigationOptions = {
        headerTintColor: 'rgba(0, 0, 0, 0.85098)',
        headerStyle: {backgroundColor: 'white'},
        title: '设定',
        tabBarLabel: '设定',
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
    startLogin(studentID, password) {
        this.switchModal();
        this.props.login(studentID, password)
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
                        <InfoCard name={user.name} studentID={user.studentID} gender={user.gender} avatar={user.avatar}
                                  navigation={this.props.navigation}/>
                        <View style={{marginTop: 20}}>
                            <ItemCard title={'我的提问'} to={'myQuestionList'} navigation={this.props.navigation} type={'question'}/>
                            <ItemCard title={'我的关注'} to={'myQuestionList'} navigation={this.props.navigation} type={'concern'}/>
                            <ItemCard title={'我的回答'} to={'myQuestionList'} navigation={this.props.navigation} type={'answer'}/>
                        </View>
                        <View style={{marginTop: 20}}>
                            <ItemCard title={'我的收藏'} to={'collectionList'} navigation={this.props.navigation}/>
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
                            <Text style={{fontSize: 16}}>登录，体验更多功能</Text>
                            <TouchableOpacity onPress={this.switchModal}>
                                <Text style={{color: 'gray'}}>开始登录</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
        )
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