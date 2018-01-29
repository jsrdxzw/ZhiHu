import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import AskQuestionView from "../../common-component/askQuestionView";
import Icon from 'react-native-vector-icons/Ionicons';
import {getCollections, deleteCollections} from '../../utils/storage';
import CollectionItem from "./collection-item";

export default class CollectionQuestionList extends React.Component {
    static navigationOptions = {
        title: '我的收藏'
    };

    constructor(props) {
        super(props);
        this.state = {
            askViewVisible: false,
            loading: false,
            collections: [],
        };
        this.askQuestion = this.askQuestion.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.refresh = this.refresh.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        getCollections().then(collections => {
            if (collections) {
                if(this._isMounted) {
                    this.setState({
                        collections: collections,
                    })
                }
            }
        }).catch(err => {
        })
    }

    deleteCollection(id) {
        deleteCollections(id)
            .then(() => {
                if(this._isMounted) {
                    this.setState({
                        collections: this.state.collections.filter(collection => collection._id !== id)
                    })
                }
            })
    }

    render() {
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
                        data={this.state.collections}
                        keyExtractor={(item) => item._id}
                        renderItem={({item}) =>
                            <CollectionItem
                                comment={item}
                                deleteCollection={this.deleteCollection}
                                navigation={this.props.navigation}
                            />
                        }
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
                                <View style={{height: 15, backgroundColor: '#e8e8e8'}}/>
                            </View>
                        }
                        ListFooterComponent={this.state.loadingMore ? (
                            <View style={{height: 60, justifyContent: 'center'}}>
                                <ActivityIndicator animating={true}/>
                            </View>
                        ) : null}
                        ListEmptyComponent={
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5
                            }}><Text>还没有任何收藏</Text></View>
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
        if(this._isMounted) {
            this.setState({
                askViewVisible: !this.state.askViewVisible
            })
        }
    }

    /** 2018/1/5
     * author: XU ZHI WEI
     * function:刷新数据
     */
    refresh() {
        getCollections().then(collections => {
            if (collections) {
                if(this._isMounted) {
                    this.setState({
                        collections: collections,
                        loading: false
                    })
                }
            }
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }


    componentWillUnmount() {
        this._isMounted = false;
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
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    }
});