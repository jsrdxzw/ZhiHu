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
import {read_special_message,set_current_chater,clear_chatter} from '../actions';
import {getMyHistoryMessage, sendMyMessage} from "../../utils/rest";
import moment from "moment/moment";

class ChatPage extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: params.receiver.name,
            headerRight:
                <TouchableOpacity>
                    <Icon name={'ios-person'} size={26}
                          style={{color: '#000', marginRight: 10, paddingTop: 2}}/>
                </TouchableOpacity>,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            messages: [],
            count: 0
        };
        this.loadingMore = false;
        this.sendMessage = this.sendMessage.bind(this);
        this.refresh = this.refresh.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.chatUser = this.props.navigation.state.params.receiver;
    }

    componentWillMount() {
        this.props.navigation.setParams({receiver: this.chatUser})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.messages&&nextProps.messages.sender===this.chatUser._id){
            this.loadingMore = false;
            let newMessage = nextProps.messages;
            const created_at = nextProps.messages.created_at;
            const messages = this.state.messages;
            const diff = moment(created_at).diff(moment(messages[messages.length - 1].created_at), 'minutes');
            if (diff >= 5 && diff < 60 * 24) {
                newMessage = {...newMessage, time: moment(created_at).format('a h:mm')};
            } else if (diff >= 60 * 24) {
                newMessage = {...newMessage, time: moment(created_at).format('lll')};
            }
            this.setState((prevState,props)=>({
                count:prevState.count + 1,
                messages: [...prevState.messages, newMessage]
            }));
            this.props.read_special_message();
        }
    }


    componentDidMount() {
        this.loadingMore = false;
        this.props.set_current_chater(this.chatUser._id);
        this.loadMoreMessage();
    }

    componentDidUpdate(){
        if(!this.loadingMore) {
            this._flatList.scrollToEnd()
        }
    }

    /** 2018/1/17
     * author: XU ZHI WEI
     * function:表示我发了一个消息
     */
    sendMessage(content) {
        const sender = this.props.user._id;
        const created_at = new Date();
        const messages = this.state.messages;
        let sendMessage = {content, sender: {_id: sender}, created_at};
        if (messages.length) {
            const diff = moment(created_at).diff(moment(messages[messages.length - 1].created_at), 'minutes');
            if (diff >= 5 && diff < 60 * 24) {
                sendMessage = {...sendMessage, time: moment(created_at).format('a h:mm')};
            } else if (diff >= 60 * 24) {
                sendMessage = {...sendMessage, time: moment(created_at).format('lll')};
            }
        }
        this.setState({
            count: this.state.count + 1,
            messages: [...this.state.messages, sendMessage]
        });

        sendMyMessage(content, sender, this.chatUser._id)
            .then(() => {}).catch(err => {})
    }

    /** 2018/1/18
     * author: XU ZHI WEI
     * function: 加载历史数据
     */
    refresh() {
        this.loadingMore = true;
       this.loadMoreMessage();
    }

    focusInput(){
        this.loadingMore = false;
        this._flatList.scrollToEnd();
    }

    loadMoreMessage(){
        const sender = this.chatUser._id;
        const receiver = this.props.user._id;
        const count = this.state.count;
        const loadLength = this.state.messages.length;
        if (count > loadLength || loadLength === 0) {
            getMyHistoryMessage(sender, receiver, loadLength)
                .then(({count, data}) => {
                    this.setState({
                        count,
                        messages: [...data, ...this.state.messages],
                        loading: false
                    });
                }).catch(err => {
                this.setState({
                    loading: false
                });
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                    <FlatList
                        ref={(flatList)=>this._flatList=flatList}
                        onRefresh={this.refresh}
                        refreshing={this.state.loading}
                        data={this.state.messages}
                        keyExtractor={(item, index) => item._id || index}
                        renderItem={({item}) => <MessageItem message={item} chatUser={this.chatUser}/>}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}><Text>没有任何消息</Text></View>
                        }
                        ListHeaderComponent={
                            <View style={styles.headerContainer}/>
                        }
                    />
                <ChatFooter sendMessage={this.sendMessage} focusInput={this.focusInput}/>
                <KeyboardSpacer/>
            </View>
        );
    }

    componentWillUnmount(){
          this.props.clear_chatter();
    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
        messages:state.messages.messages
    }
};
const mapStateFromProps = dispatch=>{
    return{
        read_special_message:()=>dispatch(read_special_message()),
        set_current_chater:(chatter_id)=>dispatch(set_current_chater(chatter_id)),
        clear_chatter:()=>dispatch(clear_chatter())
    }
};

export default connect(mapStateToProps, mapStateFromProps)(ChatPage)

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
    },
    headerContainer:{
        padding: 7,
    }
});