import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

class ChatItem extends React.PureComponent {

    constructor(props){
        super(props);
        this.gotoDetailChatView = this.gotoDetailChatView.bind(this);
    }

    gotoDetailChatView(){
        this.props.navigation.navigate('ChatDetailPage',{user:this.props.user})
    }

    render() {
        const {user} = this.props;
        return (
            <TouchableOpacity onPress={this.gotoDetailChatView} activeOpacity={1}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <Image style={styles.avatarStyle}
                               source={{uri: `data:image/png;base64,${user && user.avatar}`}}
                        />
                        <View style={styles.infoStyle}>
                            <Text>{user.name}</Text>
                            <Text style={styles.specialistsStyle}
                                  numberOfLines={2}>{user.speciality && user.speciality.join(',')}</Text>
                        </View>
                    </View>
                    <Text style={styles.rightTextStyle}>{user.distance}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(ChatItem)

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#fff',
        borderTopColor: '#e8e8e8',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatarStyle: {
        width: 36,
        height: 36,
        resizeMode: Image.resizeMode.contain
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoStyle: {
        marginLeft: 10,
        marginRight: 50
    },
    rightTextStyle: {
        fontSize: 14,
        color: '#8c8c8c',
    },
    specialistsStyle: {
        marginTop: 5,
        color: '#595959',
        fontSize: 12,
        lineHeight: 14
    }
});