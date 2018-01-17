import React from 'react';
import {View,StyleSheet,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {ActionSheet} from 'antd-mobile';
import {connect} from 'react-redux';
import {editUserAvatar} from '../actions';

class EditAvatarPage extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            data:''
        };
        this.showActionSheet = this.showActionSheet.bind(this);
    }

    componentDidMount(){
        this.props.navigation.setParams({showActionSheet:this.showActionSheet})
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title:'个人头像',
            headerRight: <TouchableOpacity style={{marginRight:10}} onPress={params.showActionSheet?params.showActionSheet:()=>null}><Icon name={'ios-more'} size={28}/></TouchableOpacity>
        }
    };


    showActionSheet(){
        const BUTTONS = ['从相册选择', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2
        }, (buttonIndex) => {
             if(buttonIndex===0){
                 ImagePicker.openPicker({
                     width: 48,
                     height: 48,
                     cropping: true,
                     showCropGuidelines:true,
                     includeBase64:true,
                     compressImageMaxWidth:48,
                     compressImageMaxHeight:48,
                     compressImageQuality:0.8,
                     mediaType:'phone'
                 }).then(image => {
                     this.setState({
                         data:image.data
                     });
                     this.props.editUserAvatar(image.data);
                     this.props.navigation.goBack();
                 },cancel=>{});
             }
        })
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.data?<Image source={{uri:`data:image/png;base64,${this.state.data}`}} style={{width:48,height:48,resizeMode: Image.resizeMode.contain}}/>:null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:'#e8e8e8',
       justifyContent:'center',
       alignItems:'center'
   }
});


const mapDispatchToProps = dispatch=>{
    return{
        editUserAvatar:(avatar)=>dispatch(editUserAvatar(avatar))
    }
};

export default connect(null,mapDispatchToProps)(EditAvatarPage)