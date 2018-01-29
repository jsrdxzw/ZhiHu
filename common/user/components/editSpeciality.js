import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Tag} from 'antd-mobile';
import {connect} from 'react-redux';
import {editUserSpecialists} from "../actions";

const specialists = ['唱歌', '跳舞', '文科', '数学', '物理', '编程', '滑雪', '保龄球', '约会', '棒球', '篮球', '烹饪', '吉他', '钢琴', '线性代数','英语'];

class EditSpecialityPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.specialists = props.user.specialists; //我的专长
        this.notSpecialists = specialists.filter(specialist=>!(this.specialists.indexOf(specialist)>-1));
        this.offset = this.specialists.length;
        this.mergeSpecialists = this.specialists.concat(this.notSpecialists);
        this.props.navigation.setParams({save: this.save})
    }


    save() {
       this.props.editUserSpecialists(this.specialists);
       this.props.navigation.goBack();
    }

    /** 2017/12/24
     * author: XU ZHI WEI
     * @param index 标签序号
     * @param selected 标签是否选择
     * function: 某个标签是否选择
     */
    onChange(selected,index){
        if(selected){
            if(!(this.specialists.indexOf(this.mergeSpecialists[index])>-1)){
                this.specialists.push(this.mergeSpecialists[index])
            }
        } else {
            if(this.specialists.indexOf(this.mergeSpecialists[index])>-1){
                this.specialists.splice(this.specialists.indexOf(this.mergeSpecialists[index]))
            }
        }
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: '我的专长',
            headerRight: <TouchableOpacity style={{marginRight: 10}}
                                           onPress={params.save ? params.save : () => null}><Text
                style={{color: '#1890ff'}}>保存</Text></TouchableOpacity>
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tabView}>
                    {this.specialists.map((specialist, index)=>(
                        <Tag key={index} selected={true} style={{marginTop: 10, marginHorizontal: 5}} onChange={(selected)=>this.onChange(selected,index)}>{specialist}</Tag>
                    ))}
                    {this.notSpecialists.map((specialist, index) => (
                      <Tag key={index} style={{marginTop: 10, marginHorizontal: 5}} onChange={(selected)=>this.onChange(selected,index+this.offset)}>{specialist}</Tag>
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8'
    },
    tabView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

const mapStateToProps = state=>{
    return {
        user:state.user
    }
};

const mapDispatchToProps = dispatch=>{
    return {
        editUserSpecialists:(specialists)=>dispatch(editUserSpecialists(specialists))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(EditSpecialityPage)