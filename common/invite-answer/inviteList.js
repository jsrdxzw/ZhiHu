import React from 'react';
import {View, StyleSheet, Text, FlatList, Platform,ActivityIndicator} from 'react-native';
import {getRecommendUser,refreshRecommendUser} from '../utils/rest';
import InviteUserItem from "./invite-user-item";

export default class InviteList extends React.Component {
    constructor(props){
        super(props);
        this.firstLoad = true;
        this.isLoading = false;
        this.timer = null;
        this.state = {
            loading:false,
            loadingMore:false,
            users:[],
            count:0
        };
        this.loadMore = this.loadMore.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount(){
        this.loadMore();
    }

    componentWillReceiveProps(nextProps,nextStates){
        if (this.props.keyword !== nextProps.keyword) {
            this.timer&&clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.setState({
                    loadingMore: false,
                    users: [],
                    count: 0
                });
                this.getSearchUser(nextProps.keyword);
            },200);
        }
    }

    refresh(){
        refreshRecommendUser(this.props.keyword).then(res=>{
            const {data,count} = res;
            this.setState({
                users: data,
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
        const {keyword} = this.props;
        if (this.firstLoad) { //表示初次加载
            this.setState({
                loadingMore:true
            });
            this.firstLoad = false;
            this.getSearchUser(keyword);
        } else if (this.state.count > this.state.users.length && !this.isLoading) {
            this.setState({
                loadingMore:true
            });
            this.isLoading = true;
            this.getSearchUser(keyword);
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
                    data={this.state.users}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => <InviteUserItem user={item}/>}
                    ListEmptyComponent={
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}><Text>没有被邀请用户</Text></View>
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
    getSearchUser(keyword){
        getRecommendUser(keyword,this.state.users.length).then(res=>{
            const {count,data} = res;
            this.setState({
                users: [...this.state.users, ...data],
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
        backgroundColor:'#fff'
    }
});