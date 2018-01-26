import React from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {editUserDescription} from '../actions';

class EditDescriptionPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.description = props.user.description;
    }

    componentDidMount(){
        this.props.navigation.setParams({save:this.save,description:this.props.user.description,newDescription:this.props.user.description})
    }


    save() { //保存修改，如果没有名字，则显示匿名
        this.props.editUserDescription(this.description.trim());
        this.props.navigation.goBack();
    }

    editDescription(description){ ///用户正在输入框修改名字
        this.props.navigation.setParams({newDescription:description});
        this.description = description;
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: '设置个人简介',
            headerRight:
                <TouchableOpacity style={{marginRight: 10}}
                                  onPress={params.save ? params.save : () => null}
                                  disabled={params.description===params.newDescription}
                >
                    <Text style={{color: params.description===params.newDescription?'#d6e4ff':'#1890ff'}}>保存</Text>
                </TouchableOpacity>
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputStyle} autoCorrect={false} autoFocus={true}
                           placeholder={'20字以内'}
                           underlineColorAndroid={"transparent"}
                           maxLength={20}
                           defaultValue={this.props.user.description} clearButtonMode={'always'}
                           onChangeText={(description)=>{this.editDescription(description)}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8'
    },
    inputStyle: {
        marginTop: 10,
        backgroundColor: '#ffffff',
        padding:10
    }
});

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch=>{
    return {
        editUserDescription:(description)=>dispatch(editUserDescription(description))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDescriptionPage)