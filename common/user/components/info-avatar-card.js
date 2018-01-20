import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

export default class InfoCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
    }

    nextPage() {
        this.props.navigation.navigate('userInfo')
    }

    render() {
        const {name, studentID, gender,avatar} = this.props;
        return (
            <TouchableOpacity onPress={this.nextPage}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <Image source={avatar?{uri:`data:image/png;base64,${avatar}`}:require('../../imgs/boy.png')} style={{width: 48, height: 48}}
                               resizeMode={'contain'}/>
                        <View style={{marginLeft: 20}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text>{name}</Text>
                                {gender?<Icon name={gender==='男'?'md-male':'md-female'} size={14} style={{marginLeft:5,paddingTop:2,color:gender==='男'?'#1890ff':'#f759ab'}}/>:null}
                            </View>
                            <Text style={{marginTop: 10}}>学籍番号: {studentID}</Text>
                        </View>
                    </View>
                    <Icon name={'ios-arrow-forward'} size={20} style={{color: '#aaa'}}/>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 1
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});