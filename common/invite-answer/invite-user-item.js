import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {inviteOther} from '../utils/rest';

class InviteUserItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
           isInvited:false
        };
        this.gotoNextPage = this.gotoNextPage.bind(this);
        this.inviteOther = this.inviteOther.bind(this);
    }

    gotoNextPage(){
        this.props.navigation.navigate('otherUserPage',{user:this.props.user})
    }

    /** 2018/1/13
     * author: XU ZHI WEI
     * function:邀请别人回答问题
     */
    inviteOther(){
        const {question} = this.props.navigation.state.params;
        const to_user = this.props.user._id;
        inviteOther(question._id,to_user).then(()=>{
              this.setState({
                  isInvited:true
              })
        })
    }

    render() {
        const {user} = this.props;
        return (
            <TouchableOpacity onPress={this.gotoNextPage} activeOpacity={1}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <Image style={styles.avatarStyle}
                               source={{uri: `data:image/png;base64,${user.avatar}`}}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.nameTextStyle}>{user.name}</Text>
                            <Text
                                style={styles.detailTextStyle}>{user.answercount}个回答&nbsp;·&nbsp;被{user.befollowercount}人关注</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.inviteOther} disabled={this.state.isInvited}>
                        <View style={this.state.isInvited?styles.buttonContainer2:styles.buttonContainer}>
                            <Text style={styles.buttonStyle}>{this.state.isInvited?'已邀请':'邀请'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(InviteUserItem)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarStyle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        resizeMode: Image.resizeMode.contain
    },
    infoContainer: {
        marginLeft: 10
    },
    nameTextStyle: {
        fontWeight: 'bold'
    },
    detailTextStyle: {
        marginTop: 5,
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.45098)'
    },
    buttonContainer: {
        borderRadius: 4,
        backgroundColor: '#1890ff',
        paddingVertical: 6,
        paddingHorizontal: 15,
    },
    buttonStyle: {
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer2:{
        borderRadius: 4,
        backgroundColor: '#8c8c8c',
        paddingVertical: 6,
        paddingHorizontal: 15,
    }
});