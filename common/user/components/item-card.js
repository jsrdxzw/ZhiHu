import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, Text, TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux';

class ItemCard extends React.PureComponent {
    constructor(props){
        super(props);
        this.nextPage = this.nextPage.bind(this)
    }
    nextPage(){
        if(this.props.to) {
            if(this.props.type) { //question,concern
                this.props.navigation.navigate(`${this.props.to}Page`, {type: this.props.type,title:this.props.title,id:this.props.userId})
            } else {
                this.props.navigation.navigate(`${this.props.to}Page`)
            }
        }
    }
    render() {
        let {title, to, rightRender} = this.props;
        if(rightRender&&rightRender.length>10){
            rightRender = rightRender.substr(0,10)+'...'
        }
        return (
            <TouchableOpacity onPress={this.nextPage}>
                <View style={styles.container}>
                    <Text>{title}</Text>
                    {rightRender ?
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            {(to === 'avatar') ? (
                                <Image source={this.props.user.avatar?{uri:`data:image/png;base64,${this.props.user.avatar}`}:require('../../imgs/boy.png')} style={{width: 32, height: 32,marginRight:10}} resizeMode={'contain'}/>
                            )
                                :
                                <Text style={{marginRight:10,color:'rgba(0, 0, 0, 0.65098)'}}>{rightRender}</Text>}
                            <Icon name={'ios-arrow-forward'} size={20} style={{color: '#aaa'}}/>
                        </View>
                        :
                        <Icon name={'ios-arrow-forward'} size={20} style={{color: '#aaa'}}/>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state=>{
    return{
        user:state.user
    }
};

export default connect(mapStateToProps,null)(ItemCard)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 1
    }
});