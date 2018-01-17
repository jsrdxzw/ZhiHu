import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,Image} from 'react-native';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';


export default class CollectionItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.gotoNextPage = this.gotoNextPage.bind(this);
    }

    gotoNextPage() {
        this.props.navigation.navigate('subCommentPage', {comment: this.props.comment, title: this.props.comment.title})
    }

    render() {
        const {comment, deleteCollection} = this.props;
        const swipeoutBtns = [
            {
                component: (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5222d'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>删除</Text>
                    </View>
                ),
                onPress: () => deleteCollection(comment._id)
            }
        ];
        return (

            <Swipeout right={swipeoutBtns} backgroundColor={'#fff'}>
                <TouchableOpacity onPress={this.gotoNextPage} activeOpacity={1}>
                    <View style={styles.container}>
                        <Text
                            numberOfLines={1}
                            style={styles.contentStyle}
                        >
                            {comment.content}
                        </Text>
                        <View style={{flexDirection:'row',alignItems:'center', marginTop: 10}}>
                            <Image source={{uri: `data:image/png;base64,${comment.authorId.avatar}`}}
                                   style={styles.avatarStyle}
                            />
                            <Text style={styles.footerTextStyle}>
                                {comment.name || '匿名'}&nbsp;·&nbsp;{moment(comment.created_at).format('ll')}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8'
    },
    contentStyle: {
        fontSize: 16
    },
    footerTextStyle: {
        marginLeft:5,
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.447059)'
    },
    avatarStyle:{
        width: 18,
        height: 18,
        borderRadius: 9,
        resizeMode: Image.resizeMode.contain
    }
});