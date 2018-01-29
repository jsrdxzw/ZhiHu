import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import ItemCard from "../components/item-card";
import Icon from 'react-native-vector-icons/Ionicons';
import ConcernButton from "../../common-component/concernButton";
import {ifConcernOtherAndLikeOther, concernUser, cancelConcernUser,likeOrDislikeUser} from '../../utils/rest';


export default class OtherUserPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            concern: null,
            like: null, //#d9d9d9
            likeCount:props.navigation.state.params.user.likeCount
        };
        this.concern = this.concern.bind(this);
        this.cancelConcern = this.cancelConcern.bind(this);
        this.likeOther = this.likeOther.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: params.user.name
        }
    };

    componentDidMount() {
        this.ifConcernOther()
    }

    //喜欢别人或者不喜欢
    likeOther() {
        const {user} = this.props.navigation.state.params;
        if(this.state.like){ //表示将取消喜欢
            this.setState({
                like:false,
                likeCount:this.state.likeCount-1
            });
            likeOrDislikeUser(user._id,0).then(()=>{}).catch(err=>{})
        } else {   //将喜欢
            this.setState({
                like:true,
                likeCount:this.state.likeCount+1
            });
            likeOrDislikeUser(user._id,1).then(()=>{}).catch(err=>{})
        }
    }

    render() {
        const {user} = this.props.navigation.state.params;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={styles.avatarStyle}
                                   source={{uri: `data:image/png;base64,${user.avatar}`}}
                            />
                            <View style={{marginLeft: 10, flex: 1}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {user.gender ?
                                        <Icon name={user.gender === '男' ? 'md-male' : 'md-female'} size={14} style={{
                                            paddingTop: 2,
                                            marginRight: 10,
                                            color: user.gender === '男' ? '#1890ff' : '#f759ab'
                                        }}/> : null}
                                    <Text>
                                        {user.description}
                                    </Text>
                                </View>
                                <View style={{backgroundColor: '#e8e8e8', height: 1, marginTop: 6}}/>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: 6
                                }}>
                                    <View style={styles.infoTips}>
                                        <Text style={styles.count}>{user.answercount > 0 ? user.answercount : 0}</Text>
                                        <Text style={styles.title}>他的回答</Text>
                                    </View>
                                    <View style={styles.infoTips}>
                                        <Text
                                            style={styles.count}>{user.followercount > 0 ? user.followercount : 0}</Text>
                                        <Text style={styles.title}>他关注的人</Text>
                                    </View>
                                    <View style={styles.infoTips}>
                                        <Text
                                            style={styles.count}>{user.befollowercount > 0 ? user.befollowercount : 0}</Text>
                                        <Text style={styles.title}>关注他的人</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{padding: 10, alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.647059)', marginBottom: 10}}>擅长</Text>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                {this.specialityTips(user.speciality)}
                            </View>
                        </View>
                        <View style={{flex: 1, height: 1, backgroundColor: '#e8e8e8'}}/>
                        <View style={styles.infoFooter}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                <TouchableOpacity style={{padding: 4}} onPress={this.likeOther} disabled={this.state.like===null}>
                                    <Icon name={'md-thumbs-up'} color={this.state.like?'#506EF2':'#d9d9d9'} size={18}/>
                                </TouchableOpacity>

                                <Text style={{
                                    marginLeft: 5,
                                    color: 'rgba(0, 0, 0, 0.65098)'
                                }}>{this.state.likeCount || 0}</Text>
                            </View>
                            {this.state.concern === null ? null :
                                <ConcernButton ifConcern={this.state.concern}
                                               concern={this.concern}
                                               cancelConcern={this.cancelConcern}
                                               title={'关注' + (user.gender === '男' ? '他' : '她')}
                                />
                            }
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <ItemCard title={'他的提问'} to={'myQuestionList'} navigation={this.props.navigation}
                                  type={'question'} userId={user._id}/>
                        <ItemCard title={'他的关注'} to={'myQuestionList'} navigation={this.props.navigation}
                                  type={'concern'} userId={user._id}/>
                        <ItemCard title={'他的回答'} to={'myQuestionList'} navigation={this.props.navigation}
                                  type={'answer'} userId={user._id}/>
                    </View>
                </View>
            </ScrollView>
        )
    }

    specialityTips(speciality) {
        return speciality.map((specialist, index) => (
            <Text key={index} style={styles.specialistTip}>{specialist}</Text>
        ))
    }

    ifConcernOther() {
        const {user} = this.props.navigation.state.params;
        ifConcernOtherAndLikeOther(user._id)
            .then(data => {
                const [ifConcern,ifLike] = data;
                    this.setState({
                        concern: !!ifConcern,
                        like:!!ifLike
                    })
            }, err => {

            })
    }

    concern() {
        const {user} = this.props.navigation.state.params;
        concernUser(user._id)
            .then(data => {
                this.setState({
                    concern: true
                })
            })
    }

    cancelConcern() {
        const {user} = this.props.navigation.state.params;
        cancelConcernUser(user._id)
            .then(data => {
                this.setState({
                    concern: false
                })
            })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8'
    },
    header: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10
    },
    avatarStyle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        resizeMode: Image.resizeMode.contain
    },
    count: {
        color: 'rgba(0, 0, 0, 0.65098)'
    },
    title: {
        color: 'rgba(0, 0, 0, 0.447059)',
        fontSize: 12
    },
    infoTips: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    specialistTip: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#69c0ff',
        margin: 5,
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.45098)',
        borderRadius: 4
    },
    infoFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        justifyContent: 'space-between'
    }
});