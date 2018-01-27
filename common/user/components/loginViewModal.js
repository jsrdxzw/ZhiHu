import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal, StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import RegisterModal from "./registerModal";
const width = Dimensions.get('window').width;

export default class LoginViewModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            registerVisible:false
        };
        this.switchRegisterModal = this.switchRegisterModal.bind(this);
        this.dismissAllModal = this.dismissAllModal.bind(this);
    }

    switchRegisterModal(){
        this.setState({
            registerVisible:!this.state.registerVisible
        })
    }

    dismissAllModal(){
        this.setState({
            registerVisible:!this.state.registerVisible
        });
        this.props.switchModal();
    }

    render() {
        const {visible, switchModal, startLogin} = this.props;
        const canClick = !!(this.state.email && this.state.password);
        const color = canClick?'#1890FF':'#69C0FF';
        return (
            <Modal visible={visible} animationType={'slide'}>
                {this.state.registerVisible ?
                    <RegisterModal visible={this.state.registerVisible} switchRegisterModal={this.switchRegisterModal} dismissAllModal={this.dismissAllModal}/>:null
                }
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={switchModal}>
                            <Icon name={'ios-close-outline'} size={32} style={{color: 'rgba(0, 0, 0, 0.65098)'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={{fontSize: 22}}>用户登录</Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputStyle} underlineColorAndroid={"transparent"} placeholder={'邮箱'} maxLength={16} autoCapitalize={'none'} autoFocus={true} onChangeText={text=>this.setState({email : text.trim()})}/>
                            <TextInput style={styles.inputStyle1} underlineColorAndroid={"transparent"} placeholder={'密码'} maxLength={20} onChangeText={text=>this.setState({password : text.trim()})}
                                       secureTextEntry={true}/>
                            <TouchableOpacity style={[styles.btnStyle,{backgroundColor:color}]} disabled={!canClick} onPress={()=>startLogin(this.state.email,this.state.password)}>
                                <Text style={{color:'#fff',fontSize:18}}>登录</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.registerContainer} onPress={this.switchRegisterModal}>
                            <Text>还没有账号？注册一个</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    },
    registerContainer:{
        marginTop:25,
    }
});

