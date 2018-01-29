import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity,Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import {baseUrl} from '../utils/uploadImage';

const {width} = Dimensions.get('window');

class QuestionItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.gotoNextPage = this.gotoNextPage.bind(this);
    }

    gotoNextPage() {
        this.props.navigation.navigate('detailQuestionPage', {question: this.props.question});
        if (this.props.dismissModal) {
            this.props.dismissModal();
        }
    }

    render() {
        const {question} = this.props;
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.gotoNextPage}>
                <View style={styles.container}>
                    {this.questionHeader(question)}
                    <View style={styles.contentContainer}>
                        {this.getQuestionImage(question)}
                        <Text style={styles.titleTextStyle}>{question.title}</Text>
                        <Text
                            style={styles.contentTextStyle}
                            numberOfLines={3}
                        >{question.detail}</Text>
                    </View>
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerTextStyle}>{question.concerncount || 0}关注&nbsp;·&nbsp;</Text>
                        <Text style={styles.footerTextStyle}>{question.commentcount || 0}评论&nbsp;·&nbsp;</Text>
                        <Text style={styles.footerTextStyle}>{question.from_now}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    questionHeader(question) {
        if (question.authorID&&question.authorID.email) {
            return (
                <View style={styles.headerContainer}>
                    <Image style={styles.avatarStyle}
                           source={{uri: `data:image/png;base64,${question.authorID && question.authorID.avatar}`}}
                    />
                    <Text style={styles.nameTextStyle}>{question.authorID && question.authorID.name}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.headerContainer}>
                    <Text style={styles.noNameTextStyle}>匿名</Text>
                </View>
            )
        }
    }

    getQuestionImage(question){
        if(question.filenames&&question.filenames.length){
            return <Image source={{uri:`${baseUrl}/uploads/${question.filenames[0]}`}} style={styles.questionImageStyle}/>
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginTop: 10
    },
    avatarStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        resizeMode: Image.resizeMode.contain
    },
    contentContainer: {
        marginVertical: 10
    },
    titleTextStyle:{
        fontSize: 18,
        paddingHorizontal:10
    },
    contentTextStyle:{
        marginTop: 10,
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.75098)',
        paddingHorizontal:10
    },
    footerContainer: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal:10
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:10
    },
    footerTextStyle:{
        color: 'rgba(0, 0, 0, 0.55098)',
        fontSize: 12,
    },
    nameTextStyle:{
        color: 'rgba(0, 0, 0, 0.55098)',
        marginLeft: 10
    },
    noNameTextStyle:{
        color: 'rgba(0, 0, 0, 0.55098)'
    },
    questionImageStyle:{
        width:width,
        height:300,
        marginVertical:10,
        resizeMode:Image.resizeMode.contain
    }
});

export default withNavigation(QuestionItem);