import React from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {editUserName} from '../actions';

class EditNamePage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.name = props.user.name;
    }

    componentDidMount(){
        this.props.navigation.setParams({save:this.save,name:this.props.user.name,newName:this.props.user.name})
    }


    save() { //保存修改，如果没有名字，则显示匿名
      this.props.editUserName(this.name.trim());
      this.props.navigation.goBack();
    }

    editName(name){ ///用户正在输入框修改名字
        this.props.navigation.setParams({newName:name});
        this.name = name;
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: '设置名字',
            headerRight:
                <TouchableOpacity style={{marginRight: 10}}
                                  onPress={params.save ? params.save : () => null}
                                  disabled={params.name===params.newName}
                >
                <Text style={{color: params.name===params.newName?'#d6e4ff':'#1890ff'}}>保存</Text>
            </TouchableOpacity>
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputStyle} autoCorrect={false} autoFocus={true}
                           placeholder={'匿名'}
                           underlineColorAndroid={"transparent"}
                           defaultValue={this.props.user.name} clearButtonMode={'always'}
                           onChangeText={(name)=>{this.editName(name)}}
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
        editUserName:(name)=>dispatch(editUserName(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNamePage)