import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

class ChatIcon extends React.PureComponent {
    render() {
        const {unReadCount, tintColor} = this.props;

        return (
            <View style={styles.iconContainer}>
                <Icon name={'md-chatboxes'} size={24} style={{color: tintColor}}/>
                {unReadCount === 0 ? null :
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{unReadCount>99?'...':unReadCount}</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        zIndex: 0,
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    badgeContainer: {
        ...Platform.select({
            ios: {
                backgroundColor: 'red',
                zIndex: 2,
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 20,
                height: 20,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
            },
            android: {
                backgroundColor: 'red',
                zIndex: 2,
                position: 'absolute',
                top: 0,
                right: 25,
                width: 20,
                height: 20,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }
        })
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '800'
    }
});

const mapStateToProps = state => ({unReadCount: state.messages.unReadCount});
export default connect(mapStateToProps, null)(ChatIcon);