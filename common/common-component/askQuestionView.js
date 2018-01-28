import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal, StyleSheet, View, Text, TouchableOpacity, TextInput, Switch, Alert, ScrollView,Dimensions,Image} from 'react-native';
import {connect} from 'react-redux';
import {submitQuestion} from '../utils/rest';
import ImagePicker from "react-native-image-crop-picker";
import {ActionSheet} from "antd-mobile/lib/index";

const {width} = Dimensions.get('window');

export default class AskQuestionView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.path = ''; //图片的地址
        this.state = {
            questionTitle: '',
            questionDetail: '',
            switchValue: false,
            picture:''
        };
        this.editQuestion = this.editQuestion.bind(this);
        this.editQuestionDetail = this.editQuestionDetail.bind(this);
        this.submit = this.submit.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);
        this.dismissModal = this.dismissModal.bind(this);
    }

    showActionSheet(){
        const BUTTONS = ['从相册选择', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2
        }, (buttonIndex) => {
            if(buttonIndex===0){
                ImagePicker.openPicker({
                    width: width,
                    height:300,
                    cropping: true,
                    showCropGuidelines:true,
                    includeBase64:true,
                    compressImageMaxWidth:width,
                    compressImageMaxHeight:300,
                    mediaType:'phone'
                }).then(image => {
                    this.setState({
                        picture:image.data
                    });
                    image.path&&(this.path = image.path);
                },cancel=>{});
            }
        })
    }

    dismissModal(){
        if(this.state.picture) {
            this.path='';
            this.setState({
                picture: ''
            });
        }
        this.props.switchModal();
    }


    render() {
        const {visible} = this.props;
        return (
            <Modal visible={visible} animationType={'slide'} onRequestClose={this.dismissModal}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity onPress={this.dismissModal}>
                                <Icon name={'ios-close-outline'} size={32} style={{color: 'rgba(0, 0, 0, 0.65098)'}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18}}>提问</Text>
                            <TouchableOpacity disabled={!this.state.questionTitle} onPress={this.submit}>
                                <Text
                                    style={{color: this.state.questionTitle ? '#1890ff' : 'rgba(0, 0, 0, 0.65098)'}}>发布</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                autoCapitalize={'none'}
                                underlineColorAndroid={"transparent"}
                                placeholder={'输入问题并以问号结尾'}
                                autoCorrect={false}
                                autoFocus={true}
                                clearButtonMode={'always'}
                                onChangeText={question => {
                                    this.editQuestion(question)
                                }}
                                maxHeight={100}
                            />

                            <TextInput
                                style={styles.input}
                                multiline={true}
                                autoCapitalize={'none'}
                                underlineColorAndroid={"transparent"}
                                placeholder={'添加问题描述（选填）'}
                                autoCorrect={false}
                                clearButtonMode={'always'}
                                onChangeText={question => {
                                    this.editQuestionDetail(question)
                                }}
                                maxHeight={200}
                            />

                        </View>
                        <View style={styles.footerContainer}>
                            <Text>匿名提问</Text>
                            <Switch
                                onTintColor={'#1890ff'}
                                value={this.state.switchValue}
                                onValueChange={value => this.switchNoName(value)}
                            />
                        </View>
                        <View style={styles.footerContainer}>
                            <Text>上传图片</Text>
                            <TouchableOpacity style={styles.pictureView} onPress={this.showActionSheet}>
                                <Icon name={'md-albums'} size={24} color={'#8c8c8c'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pictureShowView}>
                            <Image
                                style={styles.avatarStyle}
                                source={{uri: `data:image/png;base64,${this.state.picture}`}}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        )
    }

    /** 2017/12/30
     * author: XU ZHI WEI
     * function:问题标题
     */
    editQuestion(question) {
        this.setState({
            questionTitle: question.trim()
        })
    }

    /** 2017/12/30
     * author: XU ZHI WEI
     * function:问题描述
     */
    editQuestionDetail(question) {
        this.setState({
            questionDetail: question.trim()
        })
    }


    /** 2017/12/30
     * author: XU ZHI WEI
     * function:用户是否匿名提问
     */
    switchNoName(value) {
        this.setState({
            switchValue: value
        });
        if (value) { //用户想匿名
            Alert.alert('启用匿名后', '提问，回答，赞同，关注会显示为匿名，且不能邀请别人回答问题',
                [
                    {text: '取消', onPress: () => this.setState({switchValue: false})},
                    {text: '确定'}
                ]
            )
        }
    }

    submit() { //提交问题
        const title = /^.*[？?]$/.test(this.state.questionTitle) ? this.state.questionTitle : this.state.questionTitle + '?';
        submitQuestion(title, this.state.questionDetail, this.state.switchValue,this.path);
        this.props.switchModal();
        this.setState({
            picture:''
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        marginTop: 20,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e8e8e8'
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    input: {
        paddingTop: 8,
        paddingBottom: 8,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8'
    },
    pictureView:{
        marginRight:10
    },
    pictureShowView:{
        marginVertical:20,
    },
    avatarStyle:{
        width:width,
        height:300
    }
});

// const mapDispatchToProps = dispatch => {
//     return {
//         submitQuestion: (title, detail, noName,path) => {
//             dispatch(submitQuestion(title, detail, noName,path))
//         }
//     }
// };
//
// export default connect(null, mapDispatchToProps)(AskQuestionView)