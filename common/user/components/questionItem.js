import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class QuestionItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.gotoDetail = this.gotoDetail.bind(this);
    }

    render() {
        const type = this.props.type;
        const question = this.props.question;
        const {from_now} = question;

        return (
            <TouchableOpacity onPress={this.gotoDetail}>
                <View style={styles.container}>
                    <Text style={{fontSize: 16}}>{type==='answer'?question.questionId.title:question.title}</Text>
                    <View style={styles.footerContainer}>
                        <Text style={{marginTop: 5, fontSize: 12, color: 'rgba(0, 0, 0, 0.45098)'}}>
                            {type==='answer'?question.content:(question.commentcount || 0)+'回答'} &nbsp;|&nbsp;{from_now}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    gotoDetail() {
        if(this.props.type==='answer'){
            this.props.navigation.navigate('subCommentPage', {comment: this.props.question,title:this.props.question.questionId.title})
        } else {
            this.props.navigation.navigate('detailQuestionPage', {question: this.props.question})
        }
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8'
    },
    footerContainer: {
        flexDirection: 'row',
    }
});
