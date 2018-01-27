import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Platform,
    ActivityIndicator,
    Alert
} from 'react-native';
import {Toast} from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';
import AnswerQuestionModal from '../common-component/answerQuestion';
import fetchUrl from '../utils/fetch';
import moment from "moment/moment";
import AnswerQuestionItem from "./answer-question-item";
import {connect} from 'react-redux';
import {ifConcernQuestion,concernQuestion,cancelConcernQuestion} from '../utils/rest';
import ConcernButton from "./concernButton";

const width = Dimensions.get('window').width;

class DetailQuestion extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            loadingMore: false,
            comments: [],
            count: 0, //总数,
            concern: null
            // refreshCount:0 //刷新的数量
        };
        this.firstLoad = true;
        this.isLoading = false; //是否正在加载更多
        this.switchModal = this.switchModal.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.refresh = this.refresh.bind(this);
        this.listHeader = this.listHeader.bind(this);
        this.cancelConcern = this.cancelConcern.bind(this);
        this.concern = this.concern.bind(this);
        this.inviteAnswer = this.inviteAnswer.bind(this);
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        this.loadMore(); //初次加载
        ifConcernQuestion(params.question._id)
            .then(res => {
                if (res) { //表示已经关注
                    this.setState({
                        concern: true
                    })
                } else { //表示未关注
                    this.setState({
                        concern: false
                    })
                }
            })
    }

    inviteAnswer(){
        const {params} = this.props.navigation.state;
        if(!params.question.authorID.email){
               Alert.alert('提示','匿名问题不能邀请别人回答');
               return;
        }
        if(!this.props.user.isLogin) {
            Toast.info('先にログインしてください',1);
            return;
        }
        this.props.navigation.navigate('inviteAnswerPage', {question: params.question});
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <AnswerQuestionModal visible={this.state.visible} switchModal={this.switchModal}
                                     question={params.question} successSubmit={(comment) => this.newComment(comment)}/>
                <FlatList
                    onRefresh={this.refresh}
                    refreshing={this.state.loading}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={Platform.OS === 'ios' ? -0.1 : 0}
                    data={this.state.comments}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => <AnswerQuestionItem title={params.question.title} comment={item}
                                                                navigation={this.props.navigation}/>}
                    ListHeaderComponent={this.listHeader(params)}
                    ListEmptyComponent={
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}><Text>还没有评论</Text></View>
                    }
                    ListFooterComponent={this.state.loadingMore ? (
                        <View style={{height: 60, justifyContent: 'center'}}>
                            <ActivityIndicator animating={true}/>
                        </View>
                    ) : null}
                />
            </View>
        )
    }

    listHeader(params) {
        return (
            <View>
                <View style={styles.QuestionContainer}>
                    <Text style={{fontSize: 16}}>
                        {params.question.title}
                    </Text>
                    <Text style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.85098)', marginVertical: 10}}>
                        {params.question.detail}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 12,
                            color: 'rgba(0, 0, 0, 0.65098)'
                        }}>{params.question.concerncount || 0}人关注</Text>

                        {(this.props.user._id === params.question.authorID._id || this.state.concern === null) ?
                            null
                            :
                            this.getConcernView()
                        }
                    </View>
                </View>
                <View style={{marginTop: 1, flexDirection: 'row'}}>
                    <View style={{backgroundColor: '#fff', width: width / 2, paddingVertical: 10}}>
                        <TouchableOpacity
                            style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                            onPress={this.inviteAnswer}
                        >
                            <Icon name={'md-person-add'} color={'rgba(0, 0, 0, 0.65098)'} size={22}/>
                            <Text style={{marginLeft: 5, color: 'rgba(0, 0, 0, 0.65098)'}}>邀请回答</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View
                            style={{backgroundColor: '#fff', width: width / 2 - 1, paddingVertical: 10, marginLeft: 1}}>
                            <TouchableOpacity
                                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                                onPress={this.addAnswer}
                            >
                                <Icon name={'ios-create'} color={'rgba(0, 0, 0, 0.65098)'} size={22}/>
                                <Text style={{marginLeft: 5, color: 'rgba(0, 0, 0, 0.65098)'}}>添加回答</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10}}>
                    <Text style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.65098)'}}>{this.state.count}个回答</Text>
                    <Text style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.65098)'}}>默认排序</Text>
                </View>
            </View>
        )
    }

    /** 2018/1/7
     * author: XU ZHI WEI
     * function:显示关注按钮
     */
    getConcernView() {
        return <ConcernButton ifConcern={this.state.concern} concern={this.concern} cancelConcern={this.cancelConcern} title={'关注问题'}/>
    }

    switchModal() {
        this.setState({
            visible: !this.state.visible
        })
    }

    /** 2018/1/5
     * author: XU ZHI WEI
     * function:用户添加回答
     */
    addAnswer() {
        if(this.props.user.isLogin){
            this.switchModal();
        } else {
            Toast.info('先にログインしてください',1)
        }
    }

    refresh() {
        const {params} = this.props.navigation.state;
        fetchUrl(`/api/comment/refreshQuestionComment?questionId=${params.question._id}&skipCount=0`, 'get')
            .then(res => {
                const {err, data, count} = res;
                const newData = data.map(comment => (
                    {...comment, from_now: moment(comment.created_at).fromNow()}
                ));
                if (!err) {
                    this.setState({
                        comments: newData,
                        count: count ? count : this.state.count,
                        loading: false
                    })
                } else {
                    this.setState({
                        loading: false
                    })
                }
            });
    }

    loadMore() {
        const {params} = this.props.navigation.state;
        if (this.firstLoad) { //表示初次加载
            this.setState({
                loadingMore:true
            });
            this.firstLoad = false;
            this.fetchComments(params.question._id)
        } else if (this.state.count > this.state.comments.length && !this.isLoading) {
            this.setState({
                loadingMore:true
            });
            this.isLoading = true;
            this.fetchComments(params.question._id)
        }
    }

    fetchComments(questionId) {
        fetchUrl(`/api/comment/getQuestionComment?questionId=${questionId}&skipCount=${this.state.comments.length}`, 'get')
            .then(res => {
                const {err, data, count} = res;
                const newData = data.map(comment => (
                    {...comment, from_now: moment(comment.created_at).fromNow()}
                ));
                if (!err && data.length) {
                    this.setState({
                        comments: [...this.state.comments, ...newData],
                        count: count,
                        loadingMore: false
                    })
                } else {
                    this.setState({
                        loadingMore: false
                    })
                }
                this.isLoading = false
            })
    }

    concern(){ //关注问题
        const {params} = this.props.navigation.state;
        concernQuestion(params.question._id).then(()=>{
            this.setState({
                concern:true
            })
        })
    }

    cancelConcern(){ //取消关注问题
        const {params} = this.props.navigation.state;
        cancelConcernQuestion(params.question._id).then(()=>{
            this.setState({
                concern:false
            })
        })
    }

    newComment(comment) {
        this.setState({
            comments: [{
                ...comment,
                from_now: moment(comment.created_at).fromNow(),
                authorId: comment.noName?this.props.user._id:this.props.user
            }, ...this.state.comments],
            count: this.state.count + 1
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8'
    },
    QuestionContainer: {
        padding: 10,
        backgroundColor: '#fff'
    }

});

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(DetailQuestion)


