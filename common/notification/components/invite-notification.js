import React from 'react';
import {View, StyleSheet, Text, FlatList, Platform,ActivityIndicator} from 'react-native';
import {getNotification,refreshNotification,deleteNotification,deleteAllNotification} from '../../utils/rest';
import NotificationItem from "./notification-item";

export default class InviteNotification extends React.Component {

    constructor(props){
        super(props);
        this.firstLoad = true;
        this.isLoading = false;
        this.state = {
            loading:false,
            loadingMore:false,
            notifications:[],
            count:0
        };
        this.loadMore = this.loadMore.bind(this);
        this.refresh = this.refresh.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAllNotification = this.deleteAllNotification.bind(this);
    }

    componentDidMount(){
        this.loadMore();
    }

    refresh(){
        refreshNotification(this.props.type).then(res=>{
            const {data,count} = res;
            this.setState({
                notifications: data,
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
            this.getNotifications();
        } else if (this.state.count > this.state.notifications.length && !this.isLoading) {
            this.setState({
                loadingMore:true
            });
            this.isLoading = true;
            this.getNotifications();
        }
    }

    deleteOne(notification_id) {
        deleteNotification(notification_id,this.props.type).then(()=>{
            const newData = this.state.notifications.filter(notification=>notification._id!==notification_id);
            this.setState({
                notifications: newData,
                count:this.state.count - 1
            });
        })
    }

    deleteAllNotification(){
        deleteAllNotification(this.props.type).then(()=>{
            this.setState({
                notifications: [],
                count:0
            });
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    onRefresh={this.refresh}
                    refreshing={this.state.loading}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={Platform.OS === 'ios' ? -0.1 : 0}
                    data={this.state.notifications}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => <NotificationItem type={this.props.type} notification={item} deleteOne={this.deleteOne} deleteAll={this.deleteAllNotification}/>}
                    ListEmptyComponent={
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}><Text>您还没有任何通知</Text></View>
                    }
                    ListFooterComponent={this.state.loadingMore ? (
                        <View style={{height: 60, justifyContent: 'center'}}>
                            <ActivityIndicator animating={this.state.loadingMore}/>
                        </View>
                    ) : null}
                />
            </View>
        )
    }

    //获得最新的问题
    getNotifications(){
        getNotification(this.props.type,this.state.notifications.length).then(res=>{
            const {count,data} = res;
            this.setState({
                notifications: [...this.state.notifications, ...data],
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
    }
});