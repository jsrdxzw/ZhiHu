import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ItemCard from "./item-card";
import {connect} from 'react-redux';


/** 2017/12/23
 * author: XU ZHI WEI
 * function:这是用户基本信息的修改界面
 */

class UserInfo extends React.PureComponent {

    static navigationOptions = {
        title: '個人情報'
    };

    render() {
        const {name, gender, description} = this.props.user;
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={{marginTop: 20}}>
                        <ItemCard title={'アイコン'} to={'avatar'} rightRender={'avatar'}
                                  navigation={this.props.navigation}/>
                        <ItemCard title={'名前'} to={'name'} rightRender={name} navigation={this.props.navigation}/>
                        <ItemCard title={'性別'} to={'gender'} rightRender={gender} navigation={this.props.navigation}/>
                    </View>
                    <View style={{marginTop: 10}}>
                        <ItemCard title={'個人特長'} to={'speciality'} navigation={this.props.navigation}/>
                    </View>

                    <View style={{marginTop: 10}}>
                        <ItemCard title={'個人紹介'} to={'description'} navigation={this.props.navigation} rightRender={description}/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8'
    }
});

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(UserInfo);