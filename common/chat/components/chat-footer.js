import React from 'react';
import {View, StyleSheet, TextInput,TouchableOpacity,Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class ChatFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text:''
        };
        this.changeText = this.changeText.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    }

    _keyboardDidShow () {
        this.props.focusInput()
    }


    changeText(text){
        this.setState({
            text
        })
    }

    sendMessage(){
        this.props.sendMessage(this.state.text.trim());
        this.setState({
            text:''
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInputStyle}
                           underlineColorAndroid={"transparent"}
                           autoCorrect={false}
                           autoCapitalize={'none'}
                           multiline={true}
                           value={this.state.text}
                           placeholder={'请输入评论'}
                           maxHeight={150}
                           onChangeText={this.changeText}
                           clearButtonMode={'while-editing'}
                />
                <TouchableOpacity onPress={this.sendMessage} disabled={!this.state.text} style={styles.iconStyle}>
                     <Icon name={'ios-send'} color={'#000'} size={24}/>
                </TouchableOpacity>
            </View>
        )
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#fff',
        borderTopColor: '#e8e8e8',
        borderTopWidth: 1,
    },
    textInputStyle: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        padding: 6,
        textAlignVertical: 'top',
    },
    iconStyle:{
        marginLeft:5,
        marginRight:5
    }
});