import React from 'react';
import {View, StyleSheet,TouchableOpacity} from 'react-native';
import {Tabs} from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';
import ZuiXinComponent from "../zuixin/zuixinComponent";
import GuanZhuComponent from "../guanzhu/guanzhuComponent";
import ReMenComponent from "../remen/remenComponent";
import LoginViewModal from "../../user/components/loginViewModal";
import AskQuestionView from "../../common-component/askQuestionView";
import SearchViewModal from "../../search/main-view";

const tabs = [
    { title:'最新' },
    { title: '注目' },
    { title: '人気' },
];


export default class HomePage extends React.Component {
    static navigationOptions = ({navigation})=>{
        const {params = {}} = navigation.state;
        return {
            headerTintColor: 'rgba(0, 0, 0, 0.85098)',
            headerStyle: {backgroundColor: 'white'},
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name={'ios-home'} size={24} style={{color: tintColor}}/>
            ),
            tabBarOnPress:(routeParams)=>{
                params.set_tab_index(routeParams.scene.index);
                routeParams.jumpToIndex(0)
            },
            headerRight: <TouchableOpacity onPress={params.createQuestion}><Icon name={'ios-create-outline'} size={28}
                                                 style={{color: '#1890ff', marginRight: 20}}/></TouchableOpacity>,
            headerLeft: <TouchableOpacity onPress={params.switchSearchModal}><Icon name={'ios-search-outline'} size={28}
                                                style={{color: '#1890ff', marginLeft: 20}}/></TouchableOpacity>
        }
    };

    set_tab_index(index){
        this.props.setTabIndex(index);
    }

    constructor(props){
        super(props);
        this.state = {
            visible:false,
            askViewVisible:false,
            searchViewVisible:false
        };
        this.tabOnChange = this.tabOnChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.switchAskModal = this.switchAskModal.bind(this);
        this.switchSearchModal = this.switchSearchModal.bind(this);
        this.startLogin = this.startLogin.bind(this);
        this.set_tab_index = this.set_tab_index.bind(this);
        this.props.navigation.setParams({createQuestion:this.createQuestion,switchSearchModal:this.switchSearchModal,set_tab_index:this.set_tab_index})
    }

    /** 2017/12/28
     * author: XU ZHI WEI
     * function:召唤登录界面
     */
    switchModal(){
        this.setState({
            visible:!this.state.visible
        })
    }

    /** 2017/12/29
     * author: XU ZHI WEI
     * function:召唤提问界面
     */
    switchAskModal(){
        this.setState({
            askViewVisible:!this.state.askViewVisible
        })
    }

    switchSearchModal(){
        this.setState({
            searchViewVisible:!this.state.searchViewVisible
        })
    }

    /** 2017/12/28
     * author: XU ZHI WEI
     * function:用户开始登录
     */
    startLogin(studentID,password){
        this.switchModal();
        this.props.login(studentID, password)
    }

    /** 2017/12/28
     * author: XU ZHI WEI
     * function:创建提问
     */
    createQuestion(){
        if(!this.props.user.isLogin){ //用户未登录
            this.switchModal();
        }else {
            this.switchAskModal();
        }
    }


    render(){
        return (
            <View style={styles.container}>
                <LoginViewModal visible={this.state.visible}
                                switchModal={this.switchModal}
                                startLogin={this.startLogin}
                />
                <AskQuestionView
                    visible={this.state.askViewVisible}
                    switchModal={this.switchAskModal}
                />
                <SearchViewModal
                    visible={this.state.searchViewVisible}
                    switchModal={this.switchSearchModal}
                />
                <Tabs
                    tabs={tabs}
                    initialPage={0}
                    onChange={this.tabOnChange}
                    tabBarUnderlineStyle={{backgroundColor:'#000'}}
                    tabBarActiveTextColor={'#000'}
                    tabBarInactiveTextColor={'rgba(0, 0, 0, 0.45098)'}
                >
                    <ZuiXinComponent navigation={this.props.navigation}/>
                    <GuanZhuComponent navigation={this.props.navigation}/>
                    <ReMenComponent navigation={this.props.navigation}/>
                </Tabs>
            </View>
        )
    }

    tabOnChange(tab,index){

    }

}



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#e8e8e8'
    }
});

