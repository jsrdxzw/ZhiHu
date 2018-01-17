import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

class QuestionItem extends React.PureComponent {
    constructor(props){
        super(props);
        this.gotoNextPage = this.gotoNextPage.bind(this);
    }

    gotoNextPage(){
        this.props.navigation.navigate('detailQuestionPage',{question:this.props.question});
        if(this.props.dismissModal){
            this.props.dismissModal();
        }
    }

    render() {
        const {question} = this.props;
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.gotoNextPage}>
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.avatarStyle}
                               source={{uri: `data:image/png;base64,${question.authorID&&question.authorID.avatar}`}}
                        />
                        <Text style={{color: 'rgba(0, 0, 0, 0.55098)', marginLeft: 10}}>{question.authorID&&question.authorID.name}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={{fontSize: 18}}>{question.title}</Text>
                        <Text style={{marginTop: 10, fontSize: 15, color: 'rgba(0, 0, 0, 0.75098)'}}
                              numberOfLines={3}>{question.detail}</Text>
                    </View>
                    <View style={styles.footerContainer}>
                        <Text style={{
                            color: 'rgba(0, 0, 0, 0.55098)',
                            fontSize: 12
                        }}>{question.concerncount || 0}关注&nbsp;·&nbsp;</Text>
                        <Text style={{
                            color: 'rgba(0, 0, 0, 0.55098)',
                            fontSize: 12
                        }}>{question.commentcount || 0}评论&nbsp;·&nbsp;</Text>
                        <Text style={{color: 'rgba(0, 0, 0, 0.55098)', fontSize: 12}}>{question.from_now}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
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
    footerContainer: {
        flexDirection: 'row',
        marginTop: 10
    }
});

export default withNavigation(QuestionItem);