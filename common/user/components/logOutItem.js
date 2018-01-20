import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ActionSheet} from 'antd-mobile';

export default class LogoutItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.showActionSheet = this.showActionSheet.bind(this);
    }

    showActionSheet() {
        const BUTTONS = ['ログアウト', 'キャンセル'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2
        }, (buttonIndex) => {
            if(buttonIndex===0){
                this.props.logout();
            }
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={this.showActionSheet}>
                <View style={styles.container}>
                    <Text>ログアウト</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: 'center'
    }
});