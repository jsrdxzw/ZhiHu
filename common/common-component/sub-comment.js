import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {Toast} from 'antd-mobile';
import {agreeDisagreeComment, cancelAgreeAndDisagree, checkZanStatus} from '../utils/rest';
import {storeCollection} from '../utils/storage';
import {connect} from 'react-redux';

//props:comment
class SubComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAgreeView: false,
            agreeStatus: null, //表示赞同还是反对
            clickDisabled: false
        };
        this.gotoNextPage = this.gotoNextPage.bind(this);
        this.switchFooterView = this.switchFooterView.bind(this);
        this.collectComment = this.collectComment.bind(this);
        this.agreeComment = this.agreeComment.bind(this);
        this.disagreeComment = this.disagreeComment.bind(this);
        this.gotoSubDetailPage = this.gotoSubDetailPage.bind(this);
        this.dismissFooterView = this.dismissFooterView.bind(this);
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        this.props.navigation.setParams({title: params.title});
        checkZanStatus(params.comment._id, params.comment.authorId._id)
            .then(res => {
                this.setState({
                    agreeStatus: res
                })
            }).catch(err => {
            this.setState({
                agreeStatus: 'init' //表示既没有赞成也没有反对
            })
        })
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: params.title,
        }
    };

    ///去个人详情页面
    gotoNextPage() {
        const {comment} = this.props.navigation.state.params;
        this.props.navigation.navigate('otherUserPage', {user: comment.authorId})
    }

    switchFooterView() {
        if (this.props.login) {
            this.setState((prevState, props) => ({
                showAgreeView: !prevState.showAgreeView
            }))
        } else {
            Toast.info('先にログインしてください', 1);
        }
    }

    //赞同评论
    agreeComment() {
        const {comment} = this.props.navigation.state.params;
        agreeDisagreeComment(comment._id, comment.authorId._id, 1)
            .then(() => {
                this.switchFooterView();
                this.setState({
                    agreeStatus: 1
                })
            }, err => this.switchFooterView())
    }

    //反对评论
    disagreeComment() {
        const {comment} = this.props.navigation.state.params;
        agreeDisagreeComment(comment._id, comment.authorId._id, 0)
            .then(() => {
                this.switchFooterView();
                this.setState({
                    agreeStatus: 0
                })
            }, err => this.switchFooterView())
    }

    /** 2018/1/9
     * author: XU ZHI WEI
     * function:收藏用户评论,只需要保存到本地既可
     */
    collectComment() {
        if (this.props.login) {
            const {comment, title} = this.props.navigation.state.params;
            storeCollection(comment, title);
        } else {
            Toast.info('先にログインしてください', 1);
        }
    }

    gotoSubDetailPage() {
        if (this.props.login) {
            this.props.navigation.navigate('subDetailCommentPage', {comment: this.props.navigation.state.params.comment});
        } else {
            Toast.info('先にログインしてください', 1);
        }
    }

    /** 2018/1/27
     * author: XU ZHI WEI
     * function:取消赞同
     */
    cancelAgree(status) {
        this.setState({
            clickDisabled: true
        });
        const {comment} = this.props.navigation.state.params;
        cancelAgreeAndDisagree(comment._id, comment.authorId._id, status)
            .then((msg) => {
                this.setState({
                    agreeStatus: 'init',
                    clickDisabled: false
                });
                Toast.info(msg, 1);
            }, err => Toast.info(err, 1))
    }

    dismissFooterView(){
        if(this.state.showAgreeView){
            this.setState({
                showAgreeView:false
            })
        }
    }


    render() {
        const {comment} = this.props.navigation.state.params;

        return (
            <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={this.dismissFooterView}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.userInfoStyle}>
                        <TouchableOpacity activeOpacity={1} onPress={this.gotoNextPage}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={{uri: `data:image/png;base64,${comment.authorId.avatar}`}}
                                       style={styles.avatarStyle}/>
                                <View style={{marginLeft: 10}}>
                                    <Text>{comment.authorId.name}</Text>
                                    <Text style={{
                                        color: 'rgba(0, 0, 0, 0.45098)',
                                        fontSize: 12,
                                        marginTop: 5
                                    }}>{comment.authorId.description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: '#e8e8e8', height: 10}}/>
                        <View style={styles.commentContainer}>
                            <Text style={{marginHorizontal: 10, marginVertical: 15, fontSize: 16}}>
                                {comment.content}
                            </Text>
                            <View style={{alignItems: 'flex-end', marginRight: 10, marginTop: 10}}>
                                <Text
                                    style={{color: 'rgba(0, 0, 0, 0.247059)'}}>{moment(comment.created_at).format('ll')}</Text>
                                <Text style={{marginTop: 10, color: 'rgba(0, 0, 0, 0.247059)'}}>著作权归作者所有</Text>
                            </View>
                        </View>
                </ScrollView>
                {this.state.showAgreeView ? this.showAgreeView() :
                    <View style={styles.footerContainer}>

                        <TouchableOpacity onPress={this.switchFooterView} disabled={this.state.agreeStatus !== 'init'}>
                            {this.showAgreeButton()}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.collectComment}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'ios-star'} color={'rgba(0, 0, 0, 0.65098)'} size={16}/>
                                <Text style={{color: 'rgba(0, 0, 0, 0.65098)', fontSize: 12}}>收藏</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.gotoSubDetailPage}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={'md-text'} color={'rgba(0, 0, 0, 0.65098)'} size={16}/>
                                <Text style={{color: 'rgba(0, 0, 0, 0.65098)', fontSize: 12}}>评论</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            </TouchableOpacity>
        )
    }

    showAgreeView() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.switchFooterView}>
                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={this.agreeComment}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'ios-arrow-up'} color={'rgba(0, 0, 0, 0.65098)'} size={16}/>
                            <Text style={{color: 'rgba(0, 0, 0, 0.65098)', fontSize: 12}}>赞同</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.disagreeComment}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'ios-arrow-down'} color={'rgba(0, 0, 0, 0.65098)'} size={16}/>
                            <Text style={{color: 'rgba(0, 0, 0, 0.65098)', fontSize: 12}}>反对</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    showAgreeButton() {
        status = this.state.agreeStatus;
        switch (status) {
            case 0:
                return (
                    <TouchableOpacity onPress={() => this.cancelAgree(0)} disabled={this.state.clickDisabled}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'md-thumbs-down'} color={'#f759ab'} size={16}/>
                            <Text style={{color: '#f759ab', fontSize: 12}}>已反对</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 1:
                return (
                    <TouchableOpacity onPress={() => this.cancelAgree(1)} disabled={this.state.clickDisabled}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'md-thumbs-up'} color={'#40A9FF'} size={16}/>
                            <Text style={{color: '#40A9FF', fontSize: 12}}>已赞同</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'init':
                return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name={'ios-heart'} color={'rgba(0, 0, 0, 0.65098)'} size={16}/>
                        <Text style={{color: 'rgba(0, 0, 0, 0.65098)', fontSize: 12}}>赞同</Text>
                    </View>
                );
            default:
                break;
        }

    }
}

const mapStateToProps = state => {
    return {
        login: state.user.isLogin
    }
};

export default connect(mapStateToProps, null)(SubComment);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    userInfoStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    avatarStyle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        resizeMode: Image.resizeMode.contain
    },
    commentContainer: {
        flex: 1,
        marginTop: 10,
    },
    footerContainer: {
        paddingVertical: 5,
        backgroundColor: '#f5f5f5',
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

