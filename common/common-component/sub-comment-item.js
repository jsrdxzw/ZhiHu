import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class SubCommentItem extends React.PureComponent {
    render() {
        const {subComment} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatarStyle}
                           source={{uri: `data:image/png;base64,${subComment.from_user.avatar}`}}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text>{subComment.from_user.name}</Text>
                    <Text style={styles.contentStyle}>{subComment.content}</Text>
                    <Text style={styles.timeStyle}>{subComment.from_now}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    avatarContainer: {
        paddingVertical:5,
        paddingLeft:5
    },
    avatarStyle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        resizeMode: Image.resizeMode.contain
    },
    infoContainer:{
        justifyContent:'space-between',
        flex:1,
        padding:5,
        marginLeft:5,
        borderBottomWidth:1,
        borderBottomColor:'#e8e8e8'
    },
    contentStyle:{
        fontSize:14,
        marginVertical:5,
        color:'rgba(0, 0, 0, 0.65098)'
    },
    timeStyle:{
        fontSize:12,
        color:'rgba(0, 0, 0, 0.347059)'
    }
});