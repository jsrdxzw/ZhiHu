import React from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {getHistorySearch, deleteOneHistory, deleteAllHistory} from '../../utils/storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SearchHistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.firstLoad = true;
        this.isLoading = false;
        this.state = {
            loading: false,
            historys: []
        };
        this.refresh = this.refresh.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }

    componentDidMount() {
        this.getHistory();
    }

    refresh() {
        this.getHistory();
    }

    getHistory() {
        getHistorySearch().then(historys => {
            if (historys) {
                this.setState({
                    historys: historys
                })
            }
        })
    }

    deleteItem(history) {
        if (history) {
            this.setState({
                historys: this.state.historys.filter(his => his !== history)
            });
            deleteOneHistory(history);
        }
    }

    deleteAll() {
        this.setState({
            historys: []
        });
        deleteAllHistory();
    }

    selectItem(history){
       this.props.selectItem(history);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.historyTextStyle}>検索歴史</Text>
                <FlatList
                    onRefresh={this.refresh}
                    refreshing={this.state.loading}
                    data={this.state.historys}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => <HistoryItem history={item} deleteItem={this.deleteItem} selectItem={this.selectItem}/>}
                    ListFooterComponent={
                        this.state.historys.length?
                        <View style={styles.itemContainer}>
                            <View style={styles.itemLeftContainer}>
                                <Icon name={'ios-time-outline'} color={'rgba(0, 0, 0, 0.45098)'}/>
                                <TouchableOpacity onPress={this.deleteAll}>
                                    <Text style={styles.historyItemTextStyle}>清空历史记录</Text>
                                </TouchableOpacity>
                            </View>
                        </View>:null
                    }
                />
            </View>
        )
    }
}

const HistoryItem = (props) => {
    const {history, deleteItem,selectItem} = props;
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={()=>selectItem(history)}>
            <View style={styles.itemContainer}>
                <View style={styles.itemLeftContainer}>
                    <Icon name={'ios-time-outline'} color={'rgba(0, 0, 0, 0.45098)'}/>
                    <Text style={styles.historyItemTextStyle}>{history}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteItem(history)}>
                    <Icon name={'ios-close'} color={'rgba(0, 0, 0, 0.45098)'} size={18}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    historyTextStyle: {
        marginVertical: 10,
        fontSize: 18
    },
    itemContainer: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    historyItemTextStyle: {
        color: 'rgba(0, 0, 0, 0.85098)',
        fontSize: 14,
        marginLeft: 10
    },
    itemLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});