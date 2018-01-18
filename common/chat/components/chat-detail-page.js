import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import ChatFooter from "./chat-footer";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import MessageItem from "./message-item";
import {sendMessage,getHistoryMessage} from '../actions';

class ChatPage extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: params.receiver.name,
            headerRight:
                <TouchableOpacity>
                    <Icon name={'ios-person'} size={26}
                          style={{color: '#000', marginRight: 10,paddingTop:2}}/>
                </TouchableOpacity>,
        }
    };

    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.refresh = this.refresh.bind(this);
        this.chatUser = this.props.navigation.state.params.receiver;

    }

    componentWillMount() {
        this.props.navigation.setParams({receiver:this.chatUser})
    }

    componentDidMount(){
        this.refresh()
    }

    /** 2018/1/17
     * author: XU ZHI WEI
     * function:表示我发了一个消息
     */
    sendMessage(text) {
        this.props.sendMessage(text,this.chatUser._id)
    }

    /** 2018/1/18
     * author: XU ZHI WEI
     * function: 加载历史数据
     */
    refresh(){
        this.props.getHistoryMessage(this.chatUser._id);
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    onRefresh={this.refresh}
                    refreshing={this.props.messages.loading}
                    data={this.props.messages.messages}
                    keyExtractor={(item,index) => item._id||index}
                    renderItem={({item}) => <MessageItem message={item} chatUser={this.chatUser}/>}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}><Text>没有任何消息</Text></View>
                    }
                />
                <ChatFooter sendMessage={this.sendMessage}/>
                <KeyboardSpacer/>
            </View>
        );
    }
}

const mapStateToProps = state=>{
    return{
        messages:state.messages
    }
};
const mapStateFromProps = dispatch=>{
    return {
        sendMessage:(content,receiver)=>dispatch(sendMessage(content,receiver)),
        getHistoryMessage:(sender)=>dispatch(getHistoryMessage(sender))
    }
};

export default connect(mapStateToProps,mapStateFromProps)(ChatPage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#91A0D5',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    }
});