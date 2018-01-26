import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal, StyleSheet, View, Text, TouchableOpacity, TextInput, Switch, Alert} from 'react-native';
import {connect} from 'react-redux';
import {submitQuestion} from '../actions';

class AskQuestionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionTitle: '',
            questionDetail:'',
            switchValue: false
        };
        this.editQuestion = this.editQuestion.bind(this);
        this.editQuestionDetail = this.editQuestionDetail.bind(this);
        this.submit = this.submit.bind(this);
    }

    render() {
        const {visible, switchModal} = this.props;
        return (
            <Modal visible={visible} animationType={'slide'}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={switchModal}>
                            <Icon name={'ios-close-outline'} size={32} style={{color: 'rgba(0, 0, 0, 0.65098)'}}/>
                        </TouchableOpacity>
                        <Text style={{fontSize: 18}}>提问</Text>
                        <TouchableOpacity disabled={!this.state.questionTitle} onPress={this.submit}>
                            <Text style={{color: this.state.questionTitle ? '#1890ff' : 'rgba(0, 0, 0, 0.65098)'}}>发布</Text>
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
                </View>
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
            questionDetail:question.trim()
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

    submit(){ //提交问题
        const title = /^.*[？?]$/.test(this.state.questionTitle)?this.state.questionTitle:this.state.questionTitle+'?';
        this.props.submitQuestion(title,this.state.questionDetail,this.state.switchValue);
        this.props.switchModal();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
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
    }
});

const mapDispatchToProps = dispatch=>{
    return{
       submitQuestion:(title,detail,noName)=>{
           dispatch(submitQuestion(title,detail,noName))
       }
    }
};

export default connect(null,mapDispatchToProps)(AskQuestionView)