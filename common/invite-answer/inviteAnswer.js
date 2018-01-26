/** 2018/1/12
 * author: XU ZHI WEI
 * function:邀请回答界面
 */

import React from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import InviteList from "./inviteList";
import {withNavigation} from 'react-navigation';

class InviteAnswer extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        const styles = {
            headerStyle: {
                paddingTop: 25,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#e8e8e8',
                backgroundColor: '#fff'
            },
            searchInputStyle: {
                flex: 1,
                padding: 5,
                backgroundColor: '#f5f5f5',
                borderRadius: 4
            },
            headerTextStyle: {
                marginLeft: 10,
                color: '#1890FF'
            }
        };
        return {
            header:
                <View style={styles.headerStyle}>
                    <TextInput
                        style={styles.searchInputStyle}
                        placeholder={'搜索你想邀请的人'}
                        underlineColorAndroid={"transparent"}
                        // onSubmitEditing={this.startSearch}
                        returnKeyType={'search'}
                        onChangeText={text => params.changeText(text)}
                        inlineImageLeft={'search_icon'}
                        clearButtonMode={'while-editing'}
                    />
                    <TouchableOpacity onPress={params.goBack}>
                        <Text style={styles.headerTextStyle}>取消</Text>
                    </TouchableOpacity>
                </View>
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
        this.goBack = this.goBack.bind(this);
        this.props.navigation.setParams({goBack:this.goBack,changeText:(text)=>this.changeText(text)})
    }

    changeText(text) {
        this.setState({
            searchText: text.trim()
        })
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <InviteList keyword={this.state.searchText}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default withNavigation(InviteAnswer)