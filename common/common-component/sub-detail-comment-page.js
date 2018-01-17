import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Platform,
    ActivityIndicator,
} from 'react-native';
import {refreshSubComments, submitSubComment} from '../utils/rest';
import {getSubComments} from '../utils/rest';
import SubCommentItem from "./sub-comment-item";
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class SubDetailCommentPage extends React.Component {
    static navigationOptions = {
        title: '评论'
    };

    constructor(props) {
        super(props);
        this.firstLoad = true;
        this.isLoading = false;
        this.state = {
            loading: false,
            loadingMore: false,
            subComments: [],
            count: 0,
            text: ''  //用户输入评论
        };
        this.submitSubComment = this.submitSubComment.bind(this);
        this.changeInputText = this.changeInputText.bind(this);
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount(){
        this.loadMore();
    }

    //提交子评论
    submitSubComment() {
        const {comment} = this.props.navigation.state.params;
        const content = this.state.text;
        if (content) {
            submitSubComment(content, comment._id,comment.authorId._id).then(data => {
                this.refresh()
            });
        }
    }

    changeInputText(text) {
        this.setState({
            text: text.trim()
        })
    }

    refresh() {
        const {comment} = this.props.navigation.state.params;
        refreshSubComments(comment._id).then(res=>{
            const {data,count} = res;
            this.setState({
                subComments: data,
                count:count?count:this.state.count,
                loading: false,
                text:''
            })
        },err=>{
            this.setState({
                loading: false
            })
        })
    }

    loadMore() {
        if (this.firstLoad) { //表示初次加载
            this.setState({
                loadingMore:true
            });
            this.firstLoad = false;
            this.getSubComment();
        } else if (this.state.count > this.state.subComments.length && !this.isLoading) {
            this.setState({
                loadingMore:true
            });
            this.isLoading = true;
            this.getSubComment();
        }
    }

    getSubComment() {
        const {comment} = this.props.navigation.state.params;
        getSubComments(comment._id, this.state.subComments.length)
            .then(res => {
                const {count,data} = res;
                this.setState({
                    subComments: [...this.state.subComments, ...data],
                    count: count,
                    loadingMore: false
                });
                this.isLoading = false;
            },err=>{
                this.setState({
                    loadingMore: false
                });
                this.isLoading = false;
            })
    }

    render() {
        return (
            <View style={styles.container}>
                    <FlatList
                        onRefresh={this.refresh}
                        refreshing={this.state.loading}
                        onEndReached={this.loadMore}
                        onEndReachedThreshold={Platform.OS === 'ios' ? -0.1 : 0}
                        data={this.state.subComments}
                        keyExtractor={(item) => item._id}
                        renderItem={({item}) => <SubCommentItem subComment={item}/>}
                        ListEmptyComponent={
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5
                            }}><Text>还没有任何评论</Text></View>
                        }
                        ListHeaderComponent={
                            <View style={styles.headerContainer}><Text style={styles.headerTextStyle}>{this.state.count}条评论</Text></View>
                        }
                        ListFooterComponent={this.state.loadingMore ? (
                            <View style={styles.footLoadingStyle}>
                                <ActivityIndicator animating={true}/>
                            </View>
                        ) : null}
                    />
                {this.footerInputView()}
                <KeyboardSpacer/>
            </View>
        )
    }

    footerInputView() {
        return (
            <View style={styles.footerContainer}>
                <TextInput style={styles.textInputStyle}
                           underlineColorAndroid={"transparent"}
                           autoCorrect={false}
                           autoCapitalize={'none'}
                           multiline={true}
                           value={this.state.text}
                           placeholder={'请输入评论'}
                           maxHeight={150}
                           onChangeText={this.changeInputText}
                />
                <TouchableOpacity onPress={this.submitSubComment} disabled={!this.state.text}>
                    <Text style={{
                        color: this.state.text ? '#1890ff' : '#e8e8e8',
                        fontSize: 14,
                        marginLeft: 5
                    }}>发送</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer:{
        backgroundColor:'#e8e8e8',
        padding:5
    },
    headerTextStyle:{
        color:'rgba(0, 0, 0, 0.45098)',
        fontSize:12
    },
    footerContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#e8e8e8',
        borderTopWidth: 1,
    },
    textInputStyle: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        padding: 6,
        textAlignVertical: 'top',
    },
    footLoadingStyle: {
        height: 60,
        justifyContent: 'center'
    }
});