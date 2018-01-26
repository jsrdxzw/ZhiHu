import React from 'react';
import {View, Text, StyleSheet, Modal, TextInput, TouchableOpacity} from 'react-native';
import SearchHistoryList from "./components/search-history-view";
import {storeHistorySearch} from '../utils/storage';
import SearchResultView from "./components/search-result-view";

export default class SearchViewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyView:true,
            searchContent:''
        };
        this.startSearch = this.startSearch.bind(this);
        this.switchModal = this.switchModal.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }

    changeText(text) {
        if(!text.trim()){
            this.setState({
                historyView:true,
                searchContent:''
            })
        } else {
            this.setState({
                searchContent:text.trim()
            })
        }
    }

    switchModal(){
        this.setState({
            historyView:true
        });
        this.props.switchModal();
    }

    /** 2018/1/11
     * author: XU ZHI WEI
     * function:切换到新的界面
     */
    startSearch() {
        if (this.state.searchContent) {
            storeHistorySearch(this.state.searchContent);
            this.setState({
                historyView:false
            })
        }
    }

    selectItem(history){
       this.setState({
           searchContent:history,
           historyView:false
       });
    }

    render() {
        const {visible} = this.props;
        return (
            <Modal visible={visible} animationType={'slide'}>
                <View style={styles.container}>
                    <View style={styles.headerStyle}>
                        <TextInput
                            style={styles.searchInputStyle}
                            placeholder={'関心する内容を検索しょう'}
                            onSubmitEditing={this.startSearch}
                            underlineColorAndroid={"transparent"}
                            returnKeyType={'search'}
                            onChangeText={text => this.changeText(text)}
                            inlineImageLeft={'search_icon'}
                            clearButtonMode={'while-editing'}
                            value={this.state.searchContent}
                        />
                        <TouchableOpacity onPress={this.switchModal}>
                            <Text style={styles.headerTextStyle}>キャンセル</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.historyView ?
                        <SearchHistoryList selectItem={this.selectItem}/>
                        :
                        <SearchResultView keyword={this.state.searchContent} dismissModal={this.switchModal}/>
                    }
                </View>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerStyle: {
        paddingTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth:1,
        borderBottomColor:'#e8e8e8'
    },
    searchInputStyle: {
        flex: 1,
        padding: 5,
        backgroundColor: '#f5f5f5',
        borderRadius: 4
    },
    headerTextStyle: {
        marginLeft: 10,
        color: '#1890FF'
    }
});