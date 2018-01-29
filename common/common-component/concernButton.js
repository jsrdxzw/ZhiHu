import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//关注问题按钮。包括已经关注

export default class ConcernButton extends React.PureComponent {
    render() {
        const {ifConcern, cancelConcern,concern,title} = this.props;
        if (ifConcern) {
            return (
                <TouchableOpacity onPress={cancelConcern}>
                    <Animated.View style={styles.concernStyle}>
                        <Icon
                            name={'ios-checkmark'}
                            color={'rgba(0, 0, 0, 0.45098)'}
                            size={20}
                            style={{paddingTop: 2}}
                        />
                        <Text style={styles.concernButtonTitleStyle}>已关注</Text>
                    </Animated.View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={concern}>
                    <Animated.View style={styles.unConcernStyle}>
                        <Icon
                            name={'ios-add'}
                            size={20}
                            color={'#fff'}
                            style={{paddingTop: 2, fontWeight: 'bold'}}
                        />
                        <Text style={styles.unConcernButtonTitleStyle}>{title || '关注'}</Text>
                    </Animated.View>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    concernStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        borderRadius: 4,
        paddingVertical: 1,
        width: 78
    },
    unConcernStyle: {
        paddingVertical: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#408CFF',
        width: 78
    },
    concernButtonTitleStyle: {
        color: 'rgba(0, 0, 0, 0.45098)',
        marginLeft: 5,
        fontSize: 12

    },
    unConcernButtonTitleStyle: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 'bold'
    }
});
