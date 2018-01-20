import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class AnswerQuestionItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.gotoSubCommentPage = this.gotoSubCommentPage.bind(this);
    }

    render() {
        const {comment} = this.props;
        return (
            <TouchableOpacity onPress={this.gotoSubCommentPage} activeOpacity={0.8}>
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.avatarStyle}
                               source={{uri: `data:image/png;base64,${comment.authorId.avatar}`}}
                        />
                        <Text style={{
                            marginLeft: 10,
                            color: 'rgba(0, 0, 0, 0.85098)',
                            fontSize: 12
                        }}>{comment.authorId.name}</Text>
                    </View>
                    <View>
                        <Text style={{marginVertical: 10}}>{comment.content}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.footerTextStyle}>{comment.agreecount} 賛成&nbsp;·&nbsp;</Text>
                            <Text style={styles.footerTextStyle}>{comment.disagreecount} 反对&nbsp;·&nbsp;</Text>
                            <Text style={styles.footerTextStyle}>{comment.subcommentcount} コメント&nbsp;·&nbsp;</Text>
                            <Text style={styles.footerTextStyle}>{comment.from_now}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    gotoSubCommentPage() {
        this.props.navigation.navigate('subCommentPage', {comment: this.props.comment, title: this.props.title})
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10
    },
    avatarStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        resizeMode: Image.resizeMode.contain
    },
    footerTextStyle:{
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.45098)'
    }
});


