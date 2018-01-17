import React from 'react';
import {View, StyleSheet, Text, FlatList, Platform,ActivityIndicator} from 'react-native';
import {getLastestQuestion,refreshLastestQuestion} from '../../utils/rest';
import QuestionItem from "../../common-component/question-item";

export default class ZuiXinComponent extends React.Component {
    constructor(props){
        super(props);
        this.firstLoad = true;
        this.isLoading = false;
        this.state = {
            loading:false,
            loadingMore:false,
            questions:[],
            count:0
        };
        this.loadMore = this.loadMore.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount(){
        this.loadMore();
    }

    refresh(){
        refreshLastestQuestion().then(res=>{
            const {data,count} = res;
            this.setState({
                questions: data,
                count:count?count:this.state.count,
                loading: false
            })
        },err=>{
            this.setState({
                loading: false
            })
        })
    }

    loadMore(){
        if (this.firstLoad) { //表示初次加载
            this.setState({
                loadingMore:true
            });
            this.firstLoad = false;
            this.getLastQuestion();
        } else if (this.state.count > this.state.questions.length && !this.isLoading) {
            this.setState({
                loadingMore:true
            });
            this.isLoading = true;
            this.getLastQuestion();
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    onRefresh={this.refresh}
                    refreshing={this.state.loading}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={Platform.OS === 'ios' ? -0.1 : 0}
                    data={this.state.questions}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => <QuestionItem question={item}/>}
                    ListEmptyComponent={
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}><Text>还没有问题</Text></View>
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
    getLastQuestion(){
        getLastestQuestion(this.state.questions.length).then(res=>{
            const {count,data} = res;
            this.setState({
                questions: [...this.state.questions, ...data],
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
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#e8e8e8'
    }
});

