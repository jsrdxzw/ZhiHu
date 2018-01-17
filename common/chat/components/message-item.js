import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';

class MessageItem extends React.PureComponent {
    render() {
        const {message} = this.props;
        return (
            <View style={styles.container}>
                {this.ifYourself(message) ?
                    this.rightView(message)
                    :
                    this.leftView(message)
                }
            </View>
        )
    }

    rightView(message) {
        return (
            <View style={styles.rightViewStyle}>
                <View style={styles.rightTextContainer}>
                    <Text style={styles.textStyle}>{message.content}</Text>
                </View>
                <View style={styles.triangleRight}/>
                <Image style={styles.avatarStyle}
                       source={{uri: `data:image/png;base64,${message.sender.avatar}`}}
                />
            </View>
        )
    }

    leftView(message) {
        return (
            <View style={styles.leftViewStyle}>
                <Image style={styles.avatarStyle}
                       source={{uri: `data:image/png;base64,${message.sender.avatar}`}}
                />
                <View style={styles.triangleLeft}/>

                <View style={styles.leftTextContainer}>
                    <Text style={styles.textStyle}>{message.content}</Text>
                </View>

            </View>
        )
    }

    ifYourself(message) {
        return message.sender._id === this.props.user._id;
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(MessageItem)

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingHorizontal: 10
    },
    avatarStyle: {
        width: 32,
        height: 32,
        resizeMode: Image.resizeMode.contain
    },
    rightTextContainer:{
        borderRadius: 4,
        backgroundColor: '#73d13d',
        padding: 8,
        borderRightColor:'transparent'
    },
    textStyle: {
        color: '#262626',
    },
    rightViewStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    leftViewStyle:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    leftTextContainer:{
        borderRadius: 4,
        backgroundColor: '#fafafa',
        padding: 8,
        borderLeftColor:'transparent'
    },
    triangleRight: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        borderTopWidth: 2,
        borderLeftColor: '#73d13d',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    triangleLeft:{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        borderTopWidth: 2,
        borderLeftColor: 'transparent',
        borderRightColor: '#fafafa',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    }
});