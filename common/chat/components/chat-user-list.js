import React from 'react';
import {FlatList, Platform, Text, View, ActivityIndicator,StyleSheet} from 'react-native';
import {setUserLocation, getNearUsers} from '../../utils/rest';
import {Toast} from 'antd-mobile';
import ChatItem from "./chat-item";

export default class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.firstLoad = true;
        this.isLoading = false;
        this.longitude = 0;
        this.latitude = 0;
        this.state = {
            emptyMsg: '还没有任何消息',
            loading: false,
            loadingMore: false,
            count: 0,
            chaters: [],
            location: ''
        };
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        this.getLocation()
    }

    refresh() { //刷新聊天列表
        this.getLocation()
    }

    loadMore() {
        this.getMoreChatUsers()
    }

    getMoreChatUsers() {
        if(!this.firstLoad && this.state.count > this.state.chaters.length && !this.isLoading){
            this.setState({
                loadingMore: true
            });
            this.firstLoad = false;
            this.isLoading = true; //上锁
            getNearUsers(this.longitude, this.latitude,this.state.chaters.length)
                .then(res=>{
                    const {count,data} = res;
                    this.setState({
                        chaters:data,
                        count:count
                    });
                    this.isLoading = false;
                }).catch(err=>{this.isLoading = false})
        }
    }

    getLocation(skipCount=0) {
        navigator.geolocation.getCurrentPosition(location => {
            const longitude = location.coords.longitude;
            const latitude = location.coords.latitude;
            this.longitude = longitude;
            this.latitude = latitude;
            setUserLocation(longitude, latitude)
                .then((location) => {
                    this.setState({
                        location: location
                    });
                    return getNearUsers(longitude, latitude,skipCount);
                })
                .then(res=>{
                    const {count,data} = res;
                    this.setState({
                        chaters:data,
                        count:count
                    });
                    this.firstLoad = false;
                })
                .catch(err => {})
        }, err => {
            Toast.info('定位失败',1)
        })
    }


    render() {
        return (
            <FlatList
                onRefresh={this.refresh}
                refreshing={this.state.loading}
                onEndReached={this.loadMore}
                onEndReachedThreshold={Platform.OS === 'ios' ? -0.1 : 0}
                data={this.state.chaters}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <ChatItem user={item}/>}
                ListEmptyComponent={
                    <View style={styles.emptyStyle}><Text>{this.state.emptyMsg}</Text></View>
                }
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <Text style={styles.headerText}>{this.state.location}</Text>
                    </View>
                }
                ListFooterComponent={this.state.loadingMore ? (
                    <View style={styles.footerContainer}>
                        <ActivityIndicator animating={true}/>
                    </View>
                ) : null}
            />
        )
    }

    componentWillUnmount(){
        Toast.hide()
    }
}

const styles = StyleSheet.create({
    listHeader:{
        backgroundColor:'#fff',
        padding:5
    },
    emptyStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    headerText:{
        color:'#bfbfbf',
        fontSize:13
    },
    footerContainer:{
        height: 60,
        justifyContent: 'center'
    }
});