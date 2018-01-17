import React from 'react';
import {View, StyleSheet, Text, FlatList, Platform, ActivityIndicator} from 'react-native';
import {getSearchQuestion} from '../../utils/rest';
import QuestionItem from "../../common-component/question-item";

export default class SearchResultView extends React.Component {
    constructor(props) {
        super(props);
        this.firstLoad = true;
        this.isLoading = false;
        this.state = {
            loadingMore: false,
            questions: [],
            count: 0
        };
        this.loadMore = this.loadMore.bind(this);
        this.timer = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.keyword !== nextProps.keyword) {
            this.timer&&clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.setState({
                    loadingMore: false,
                    questions: [],
                    count: 0
                });
                this.getsearchQuestion(nextProps.keyword);
            },100);
        }
    }

    componentDidMount() {
        this.loadMore();
    }

    loadMore() {
        if (this.firstLoad) { //表示初次加载
            this.setState({
                loadingMore:true
            });
            this.firstLoad = false;
            this.getsearchQuestion(this.props.keyword);
        } else if (this.state.count > this.state.questions.length && !this.isLoading) {
            this.setState({
                loadingMore:true
            });
            this.isLoading = true;
            this.getsearchQuestion(this.props.keyword);
        }
    }

    render() {
        const {dismissModal} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={Platform.OS === 'ios' ? -0.1 : 0}
                    data={this.state.questions}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => <QuestionItem question={item} dismissModal={dismissModal}/>}
                    ListEmptyComponent={
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}><Text>没有结果</Text></View>
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

    //获得最新的问题
    getsearchQuestion(keyword) {
            getSearchQuestion(keyword, this.state.questions.length).then(res => {
                const {count, data} = res;
                this.setState({
                    questions: [...this.state.questions, ...data],
                    count: count,
                    loadingMore: false
                });
                this.isLoading = false;
            }, err => {
                this.setState({
                    loadingMore: false
                });
                this.isLoading = false;
            })
    }

    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8'
    }
});


