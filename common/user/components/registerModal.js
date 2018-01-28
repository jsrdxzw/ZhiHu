import React from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    TextInput,
    Text,
    ScrollView,
    Image,
    ActivityIndicator,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {registerUser} from '../../utils/rest';
import {register_success} from '../actions';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {ActionSheet} from 'antd-mobile';

const {width, height} = Dimensions.get('window');

class RegisterModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            userName: '',
            password: '',
            rePassword: '',
            errorMsg: '',
            avatar: '',
            indicator: false //加载进度的动画
        };
        this.startRegister = this.startRegister.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);
    }

    startRegister() {
        const {userName, password, email, avatar} = this.state;
        if (this.validateRstInfo()) {
            registerUser(userName, password, email, avatar).then((user) => {
                this.props.dismissAllModal();
                return user;
            }).then((user) => {
                this.props.registerSuccess(user);
            }).catch(err => {
                this.setState({
                    indicator: false,
                    errorMsg: this.analysisErrMsg(err)
                });
            });
        }
    }

    showError(msg = '') {
        if (msg) {
            this.setState({
                errorMsg: msg,
            })
        } else {
            this.setState({
                errorMsg: '',
                indicator: true
            })
        }
    }

    analysisErrMsg(errmsg) {
        if (errmsg && errmsg !== 'err') {
            const startErr = errmsg.indexOf('{');
            const endErr = errmsg.indexOf('}');
            return errmsg.substring(startErr + 5, endErr - 2) + " 已被注册";
        } else {
            return errmsg
        }
    }

    showActionSheet() {
        const BUTTONS = ['从相册选择', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2
        }, (buttonIndex) => {
            if (buttonIndex === 0) {
                ImagePicker.openPicker({
                    width: 48,
                    height: 48,
                    cropping: true,
                    showCropGuidelines: true,
                    includeBase64: true,
                    compressImageMaxWidth: 48,
                    compressImageMaxHeight: 48,
                    compressImageQuality: 0.8,
                    mediaType: 'phone'
                }).then(image => {
                    this.setState({
                        avatar: image.data
                    });
                }, cancel => {
                });
            }
        })
    }

    validateRstInfo() {
        const {email, userName, password, rePassword, avatar} = this.state;
        if (!email) {
            this.showError('请填写邮件');
            return false;
        }
        if (!userName) {
            this.showError('请填写昵称');
            return false;
        }
        if (!password) {
            this.showError('请设置密码');
            return false;
        }
        if (!avatar) {
            this.showError('请选择一个头像');
            return false;
        }
        if (password !== rePassword) {
            this.showError('两次输入密码不一致');
            return false;
        }
        if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email))) {
            this.showError('邮箱格式错误');
            return false;
        }
        this.showError();
        return true;
    }

    render() {
        const {visible, switchRegisterModal} = this.props;
        return (
            <Modal visible={visible} animationType={'slide'} onRequestClose={switchRegisterModal}>
                <ImageBackground source={require('../../imgs/register.jpg')} style={styles.imageBackgroundStyle}
                                 resizeMode={'cover'}>
                    <ScrollView>
                        <View>
                            <View style={styles.headerContainer}>
                                <TouchableOpacity onPress={switchRegisterModal}>
                                    <Icon name={'ios-close-outline'} size={48}
                                          style={{color: '#fff'}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.avatarContainer}>
                                <TouchableOpacity onPress={this.showActionSheet}>
                                    <Image style={styles.avatarStyle}
                                           source={this.state.avatar ? {uri: `data:image/png;base64,${this.state.avatar}`} : require('../../imgs/avatar.jpg')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.registerContainer}>
                                <View style={styles.inputContainer}>
                                    <Icon name={'ios-mail'} size={28} color={'#000'}/>
                                    <TextInput
                                        style={styles.inputStyle}
                                        underlineColorAndroid={"transparent"}
                                        placeholder={'邮箱'}
                                        maxLength={30}
                                        autoCorrect={false}
                                        keyboardType={'email-address'}
                                        autoCapitalize={'none'}
                                        placeholderTextColor={'#fff'}
                                        clearButtonMode={'while-editing'}
                                        selectionColor={'#fff'}
                                        onChangeText={text => this.setState({email: text.trim()})}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Icon name={'md-person'} size={28} color={'#000'}/>
                                    <TextInput
                                        style={styles.inputStyle}
                                        underlineColorAndroid={"transparent"}
                                        placeholder={'用户昵称'}
                                        maxLength={16}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        clearButtonMode={'while-editing'}
                                        placeholderTextColor={'#fff'}
                                        selectionColor={'#fff'}
                                        onChangeText={text => this.setState({userName: text.trim()})}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Icon name={'md-key'} size={28} color={'#000'}/>
                                    <TextInput
                                        style={styles.inputStyle}
                                        underlineColorAndroid={"transparent"}
                                        placeholder={'密码'}
                                        secureTextEntry={true}
                                        maxLength={30}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        placeholderTextColor={'#fff'}
                                        selectionColor={'#fff'}
                                        clearButtonMode={'while-editing'}
                                        onChangeText={text => this.setState({password: text.trim()})}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Icon name={'md-key'} size={28} color={'#000'}/>
                                    <TextInput
                                        style={styles.inputStyle}
                                        underlineColorAndroid={"transparent"}
                                        placeholder={'确认密码'}
                                        secureTextEntry={true}
                                        maxLength={30}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        selectionColor={'#fff'}
                                        clearButtonMode={'while-editing'}
                                        placeholderTextColor={'#fff'}
                                        onChangeText={text => this.setState({rePassword: text.trim()})}
                                    />
                                </View>
                                {this.state.errorMsg ?
                                    <Text style={styles.errorMsgContainer}>{this.state.errorMsg}</Text> : null}
                            </View>
                            <TouchableOpacity onPress={this.startRegister} style={styles.registerBtn}
                                              disabled={this.state.indicator}>
                                {this.state.indicator ? <ActivityIndicator size={'small'} color={'#fff'}/> : null}
                                <Text style={styles.registerText}>注册</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </Modal>
        );
    }
}

const mapStateFromProps = dispatch => {
    return {
        registerSuccess: (user) => dispatch(register_success(user))
    }
};

export default connect(null, mapStateFromProps)(RegisterModal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingHorizontal: 20,
        marginTop: 40,
        backgroundColor: 'transparent'
    },
    imageBackgroundStyle: {
        height: height,
        width: width,
    },
    registerContainer: {
        marginHorizontal: 20,
        paddingTop: 30,
        marginTop: 40,
        paddingHorizontal: 20,
        opacity: 0.7,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 6
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    inputStyle: {
        padding: 10,
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#595959',
        borderRadius: 4,
        opacity: 1,
        color: '#fff',
        fontWeight: '800'
    },
    registerBtn: {
        backgroundColor: '#000',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4,
        marginTop: 40,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:Platform.OS==='ios'?10:40
    },
    registerText: {
        color: '#fff',
        fontWeight: '800',
        marginLeft: 20
    },
    errorMsgContainer: {
        color: '#f5222d',
        fontSize: 20
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarStyle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        padding: 10,
        resizeMode: Image.resizeMode.cover
    }
});