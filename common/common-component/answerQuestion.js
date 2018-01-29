import React from 'react';
import {View, StyleSheet, Alert, TouchableOpacity, TextInput, Text, Modal, Switch, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchUrl from '../utils/fetch';

class AnswerQuestionModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            switchValue: false
        };
        this.editQuestion = this.editQuestion.bind(this);
        this.submit = this.submit.bind(this);
    }

    render() {
        const {visible, switchModal, question} = this.props;
        return (
            <Modal visible={visible} animationType={'slide'} onRequestClose={switchModal}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity onPress={switchModal}>
                                <Icon name={'ios-close-outline'} size={32} style={{color: 'rgba(0, 0, 0, 0.65098)',paddingRight:15,paddingTop:2}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18}}>{question.title}</Text>
                            <TouchableOpacity disabled={!this.state.comment} onPress={this.submit}>
                                <Text
                                    style={{color: this.state.comment ? '#1890ff' : 'rgba(0, 0, 0, 0.65098)'}}>提出</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                underlineColorAndroid={"transparent"}
                                autoCapitalize={'none'}
                                placeholder={'输入评论'}
                                autoCorrect={false}
                                autoFocus={true}
                                clearButtonMode={'always'}
                                onChangeText={comment => {
                                    this.editQuestion(comment)
                                }}
                                maxHeight={300}
                            />

                        </View>
                        <View style={styles.footerContainer}>
                            <Text>匿名回答</Text>
                            <Switch
                                onTintColor={'#1890ff'}
                                value={this.state.switchValue}
                                onValueChange={value => this.switchNoName(value)}
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
    editQuestion(comment) {
        this.setState({
            comment: comment.trim()
        })
    }

    /** 2017/12/30
     * author: XU ZHI WEI
     * function:用户是否匿名回答
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

    submit() { //提交回答
        const comment = this.state.comment;
        const questionId = this.props.question._id;
        this.postMyAnswer(this.props.userId, questionId, comment, this.state.switchValue);
        this.props.switchModal();
    }

    postMyAnswer(authorId, questionId, content, noName) {
        fetchUrl('/api/comment/submitQuestionComment', 'post', {
            authorId,
            questionId,
            content,
            noName,
            to_user: this.props.question.authorID._id
        })
            .then(res => {
                const {err, data} = res;
                if (!err) { //提交问题成功
                    this.props.successSubmit(data)
                }
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
    }
});

const mapStateToProps = state => {
    return {
        userId: state.user._id
    }
};

export default connect(mapStateToProps, null)(AnswerQuestionModal)