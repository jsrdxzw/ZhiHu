import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import {connect} from 'react-redux';
import {editUserGender} from "../actions";

class EditGenderPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.state = {
            gender: props.user.gender
        };
        this.props.navigation.setParams({save: this.save})
    }

    save() {
       this.props.editUserGender(this.state.gender);
        this.props.navigation.goBack();
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: '设置性别',
            headerRight: <TouchableOpacity style={{marginRight: 10}}
                                           onPress={params.save ? params.save : () => null}><Text style={{color:'#1890ff'}}>保存</Text></TouchableOpacity>
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.gender}
                    onValueChange={(itemValue) => this.pickerChange(itemValue)}
                >
                    <Picker.Item label="男" value="男"/>
                    <Picker.Item label="女" value="女"/>
                </Picker>
            </View>
        )
    }

    pickerChange(itemValue) {
        this.setState({
            gender:itemValue
        })
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

const mapDispatchToProps = dispatch => {
    return {
        editUserGender:(name)=>dispatch(editUserGender(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGenderPage)