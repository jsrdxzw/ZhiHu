import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import {withNavigation} from 'react-navigation';

class NotificationItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.gotoNextPage = this.gotoNextPage.bind(this);
    }

    getType(type) {
        switch (type) {
            case 'invite':
                return '邀请你回答问题';
            case 'answer':
                return '回答了你的问题';
            case 'comment':
                return '回复了你的评论';
            default:
                return '?'
        }
    }

    gotoNextPage(){
        const type = this.props.type;
        if(type==='comment'){
            this.props.navigation.navigate('subDetailCommentPage', {comment: this.props.notification.comment})
        } else {
            this.props.navigation.navigate('detailQuestionPage', {question: this.props.notification.question})
        }
    }

    render() {
        const {notification, type,deleteOne,deleteAll} = this.props;
        const btns = [
            {
                component: (
                    <View style={styles.deleteAllBtnStyle}>
                        <Icon name={'ios-trash'} color={'#fff'} size={20}/>
                        <Text style={styles.deleteBtnText}>全部删除</Text>
                    </View>
                ),
                onPress:deleteAll
            },
            {
                component: (
                    <View style={styles.deleteBtnStyle}>
                        <Icon name={'md-close'} color={'#fff'} size={20}/>
                        <Text style={styles.deleteBtnText}>删除</Text>
                    </View>
                ),
                onPress:()=>deleteOne(notification._id)
            }
        ];
        return (
            <Swipeout right={btns} backgroundColor={'#f4222d'}>
                <TouchableOpacity activeOpacity={1} onPress={this.gotoNextPage}>
                    <View style={styles.container}>
                        <Image style={styles.avatarStyle}
                               source={{uri: `data:image/png;base64,${notification.from_user.avatar}`}}
                        />
                        <View style={styles.infoContainer}>
                            <View>
                                <Text>{notification.from_user.name + ' ' + this.getType(type)}&nbsp;
                                    <Text style={styles.titleStyle}>{type==='comment'?notification.comment.content:notification.question.title}</Text>
                                </Text>
                            </View>
                            <View style={styles.footerContainer}>
                                <Icon name={'md-list-box'} color={'#faad14'} size={12}/>
                                <Text style={styles.timeStyle}>{notification.from_now}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }
}

export default withNavigation(NotificationItem)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarStyle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        margin:10,
        resizeMode: Image.resizeMode.contain
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1
    },
    footerContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeStyle: {
        fontSize: 12,
        color: '#bfbfbf',
        marginLeft: 10
    },
    deleteAllBtnStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4222d'
    },
    deleteBtnStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff4d4f'
    },
    deleteBtnText: {
        color: '#fff',
        fontWeight: '600'
    }
});