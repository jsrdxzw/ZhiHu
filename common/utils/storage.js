import {AsyncStorage} from 'react-native';
import {Toast} from 'antd-mobile';

/** 2018/1/9
 * author: XU ZHI WEI
 * function:本地化收藏评论
 */
export const storeCollection = (comment, title) => {
    AsyncStorage.getItem('collection').then(collections => {
        if (collections) {
            const arrayCollection = JSON.parse(collections);
            let ifReapy = false;
            arrayCollection.map(coll => {
                if (coll._id === comment._id) {
                    ifReapy = true;
                }
            });
            if (ifReapy) {
                Toast.info('收藏成功', 1)
            } else {
                arrayCollection.push({...comment, title});
                AsyncStorage.setItem('collection', JSON.stringify(arrayCollection)).then(() => {
                    Toast.info('收藏成功', 1)
                }).catch(err => {
                    Toast.info('收藏失败', 1)
                })
            }
        } else {
            const coll = [{...comment, title}];
            AsyncStorage.setItem('collection', JSON.stringify(coll)).then(() => {
                Toast.info('收藏成功', 1)
            }).catch(err => {
                Toast.info('收藏失败', 1)
            })
        }
    })
};

export const getCollections = () => {
    return AsyncStorage.getItem('collection').then(collections => JSON.parse(collections))
};

export const deleteCollections = (id) => {
    return AsyncStorage.getItem('collection').then(collections => JSON.parse(collections))
        .then(collections => {
            return AsyncStorage.setItem('collection', JSON.stringify(collections.filter(collection => collection._id !== id)))
                .then(() => {
                    return Promise.resolve()
                }).catch(() => {
                    return Promise.reject('error')
                })
        })
};

export const storeHistorySearch = content => {
    AsyncStorage.getItem('history').then(historys => JSON.parse(historys)).then(historys => {
        if (historys) {
            let ifReapy = false;
            historys.map(history => {
                if (history === content) {
                    ifReapy = true;
                }
            });
            if (!ifReapy) {
                const newHistorys = [content, ...historys];
                AsyncStorage.setItem('history', JSON.stringify(newHistorys)).then(() => {
                }).catch(err => {
                })
            }
        } else {
            const coll = [content];
            AsyncStorage.setItem('history', JSON.stringify(coll)).then(() => {
            }).catch(err => {
            })
        }
    })
};

export const getHistorySearch = () => {
    return AsyncStorage.getItem('history').then(history => JSON.parse(history))
};

export const deleteOneHistory = (history) => {
    AsyncStorage.getItem('history').then(historys => JSON.parse(historys)).then(historys => {
        if (historys) {
            const newHistory = historys.filter(his => his !== history);
            AsyncStorage.setItem('history', JSON.stringify(newHistory)).then(() => {}).catch(err => {})
        }
    })
};

export const deleteAllHistory = ()=>{
    AsyncStorage.removeItem('history').then(()=>{})
};

export const getCurrentUser = ()=>{
    return AsyncStorage.getItem('user').then(res=>JSON.parse(res));
};