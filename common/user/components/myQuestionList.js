import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList,ActivityIndicator,Platform} from 'react-native';
import QuestionItem from "./questionItem";
import AskQuestionView from "../../home/components/askQuestionView";
import Icon from 'react-native-vector-icons/Ionicons';
import {getQuestions,refreshQuestion} from '../../utils/rest';

export default class MyQuestionList extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: params.title
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            askViewVisible: false,
            refresh:false,
            visible: false,
            loading: false,
            loadingMore: false,
            questions: [],
            count: 0, //总数,
        };
        this.firstLoad = true;
        this.isLoading = false; //是否正在加载更多
        this.askQuestion = this.askQuestion.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount(){
        this.loadMore();
        this.props.navigation.setParams({title:this.props.navigation.state.params.title})
    }


    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <AskQuestionView
                    visible={this.state.askViewVisible}
                    switchModal={this.switchModal}
                />
                <View style={styles.bodyContainer}>
                    <FlatList
                        onRefresh={this.refresh}
                        refreshing={this.state.loading}
                        onEndReached={this.loadMore}
                        onEndReachedThreshold={Platform.OS==='ios'?-0.1:0}
                        data={this.state.questions}
                        keyExtractor={(item) => item._id}
                        renderItem={({item}) => <QuestionItem question={item} navigation={this.props.navigation} type={params.type}/> }
                        ListHeaderComponent={
                            <View>
                                <View style={styles.headerContainer}>
                                    <TouchableOpacity
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                                        onPress={this.askQuestion}>
                                        <Icon name={'ios-create-outline'} size={26} color={'rgba(0, 0, 0, 0.45098)'}/>
                                        <Text style={{marginLeft: 5, color: 'rgba(0, 0, 0, 0.45098)'}}>提问</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:15,backgroundColor:'#e8e8e8'}}/>
                            </View>
                        }
                        ListFooterComponent={this.state.loadingMore?(
                            <View style={{height:60,justifyContent:'center'}}>
                                <ActivityIndicator animating={true}/>
                            </View>
                        ):null}
                        ListEmptyComponent={
                            <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:5}}><Text>还没有任何问题</Text></View>
                        }
                    />
                </View>
            </View>
        )
    }

    /** 2018/1/4
     * author: XU ZHI WEI
     * function: 用户提问，召唤模态狂
     */
    askQuestion() {
        this.switchModal();
    }

    switchModal() {
        this.setState({
            askViewVisible: !this.state.askViewVisible
        })
    }

    /** 2018/1/5
     * author: XU ZHI WEI
     * function:刷新数据
     */
    refresh(){
        const {params} = this.props.navigation.state;
        refreshQuestion(params.type,params.id)
            .then(res=>{
                const {data,count} = res;
                this.setState({
                    questions: data,
                    count: count ? count : this.state.count,
                    loading: false
                })
            },err=>{
                this.setState({
                    loading: false
                })
            })
    }

    /** 2018/1/5
     * author: XU ZHI WEI
     * function:加载更多数据
     */
    loadMore(){
        const {params} = this.props.navigation.state;
        if (this.firstLoad) { //表示初次加载
            this.setState({
                loadingMore:true
            });
            this.firstLoad = false;
            this.fetchQuestions(params.type,params.id)
        } else if (this.state.count > this.state.questions.length && !this.isLoading) {
            this.setState({
                loadingMore:true
            });
            this.isLoading = true;
            this.fetchQuestions(params.type,params.id)
        }
    }

    fetchQuestions(type,id){
        getQuestions(this.state.questions.length,type,id)
            .then(res=>{
                const {data,count} = res;
                this.setState({
                    questions: [...this.state.questions, ...data],
                    count: count,
                    loadingMore: false
                });
                this.isLoading = false
            },err=>{
                this.setState({
                    loadingMore: false
                });
                this.isLoading = false
            })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8'
    },
    headerContainer: {
        backgroundColor: '#fff',
        padding: 5,
        alignItems: 'center'
    },
    bodyContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});