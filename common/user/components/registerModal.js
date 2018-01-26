import React from 'react';
import {View,Modal,StyleSheet} from 'react-native';

export default class RegisterModal extends React.PureComponent{
    constructor(props) {
        super(props);
    }


    render() {
        const {visible} = this.props;
        return (
            <Modal visible={visible} animationType={'slide'}>
                <View style={styles.container}>

                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:'#fff'
   }
});