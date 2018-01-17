import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal, StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

export default class LoginViewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentID:'',
            password:''
        }
    }
    render() {
        const {visible, switchModal, startLogin} = this.props;
        const canClick = !!(this.state.studentID && this.state.password);
        const color = canClick?'#1890FF':'#69C0FF';
        return (
            <Modal visible={visible} animationType={'slide'}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={switchModal}>
                            <Icon name={'ios-close-outline'} size={32} style={{color: 'rgba(0, 0, 0, 0.65098)'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={{fontSize: 22}}>用户登录</Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputStyle} placeholder={'学号'} maxLength={16} autoCapitalize={'none'} autoFocus={true} onChangeText={text=>this.setState({studentID : text.trim()})}/>
                            <TextInput style={styles.inputStyle1} placeholder={'密码'} maxLength={20} onChangeText={text=>this.setState({password : text.trim()})}
                                       secureTextEntry={true}/>
                            <TouchableOpacity style={[styles.btnStyle,{backgroundColor:color}]} disabled={!canClick} onPress={()=>startLogin(this.state.studentID,this.state.password)}>
                                <Text style={{color:'#fff',fontSize:18}}>登录</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f5ff'
    },
    headerContainer: {
        marginTop: 40,
        paddingHorizontal: 20
    },
    formContainer: {
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 20,
        width:width - 50
    },
    inputStyle: {
        borderColor: 'rgba(0, 0, 0, 0.247059)',
        borderWidth: 1,
        borderBottomWidth: 0,
        padding: 10
    },
    inputStyle1: {
        borderColor: 'rgba(0, 0, 0, 0.247059)',
        borderWidth: 1,
        padding: 10
    },
    btnStyle: {
        marginTop: 30,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
        borderRadius:4
    }
});

