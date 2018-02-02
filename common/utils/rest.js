import fetchUrl from './fetch';
import Store from '../Store';
import moment from "moment/moment";
import {connectSocket, sendMessage} from './websocket';
import {getDistance} from './math';
import {AsyncStorage} from "react-native";
import {uploadImage} from './uploadImage';
import {getCurrentUser} from './storage';


export const getLastestQuestion = (skipCount) => {
    return fetchUrl(`/api/question/lastQst?skipCount=${skipCount}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(comment => (
                {...comment, from_now: moment(comment.created_at).fromNow()}
            ));
            if (!err) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('error')
            }
        })
        .catch(err => {
            return Promise.reject('error')
        })
};

export const refreshLastestQuestion = () => {
    return fetchUrl(`/api/question/refreshLastQst?skipCount=0`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(comment => (
                {...comment, from_now: moment(comment.created_at).fromNow()}
            ));
            if (!err) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};

/** 2018/1/8
 * author: XU ZHI WEI
 * function:获得关注人的问题
 */
export const getConcernQuestion = (skipCount) => {
    const user_id = Store.getState().user._id;
    if(!user_id){
        return getCurrentUser().then(user=>{
            return getConcernFromApi(skipCount,user._id)
        })
    } else {
        return getConcernFromApi(skipCount,user_id)
    }

};

function getConcernFromApi(skipCount,user_id){
    return fetchUrl(`/api/question/concernQst?skipCount=${skipCount}`, 'post', {user_id})
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(question => (
                {...question, from_now: moment(question.created_at).fromNow()}
            ));
            if (!err) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('error')
            }
        })
        .catch(err => {
            return Promise.reject('error')
        })
}

//

export const refreshConcernQuestion = () => {
    const user_id = Store.getState().user._id;
    return fetchUrl(`/api/question/refreshConcernQst?skipCount=0`, 'post', {user_id})
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(question => (
                {...question, from_now: moment(question.created_at).fromNow()}
            ));
            if (!err) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('error')
            }
        })
        .catch(err => {
            return Promise.reject('error')
        })

};

export const getHotQuestion = skipCount => {
    return fetchUrl(`/api/question/hotQuestion?skipCount=${skipCount}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(question => (
                {...question, from_now: moment(question.created_at).fromNow()}
            ));
            if (!err) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('error')
            }
        })
        .catch(err => {
            return Promise.reject('error')
        })
};

export const ifConcernQuestion = (questionId) => {
    const userId = Store.getState().user._id;
    return fetchUrl(`/api/question/ifConcern`, 'post', {userId, questionId})
        .then(res => {
            const {err, data} = res;
            if (!err) {
                if (data) {
                    return Promise.resolve(true)
                } else {
                    return Promise.resolve(false)
                }
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};

export const concernQuestion = questionId => {
    const userId = Store.getState().user._id;
    return fetchUrl(`/api/question/concernQuestion`, 'post', {userId, questionId})
        .then(res => {
            const {err} = res;
            if (!err) {
                return Promise.resolve();
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })

};

export const cancelConcernQuestion = questionId => {
    const userId = Store.getState().user._id;
    return fetchUrl(`/api/question/cancelConcernQuestion`, 'post', {userId, questionId})
        .then(res => {
            const {err} = res;
            if (!err) {
                return Promise.resolve();
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};


/** 2018/1/7
 * author: XU ZHI WEI
 * function: 获得我的个人中心里的问题，type值得是我提问的还是我关注的等等
 */
export const getQuestions = (skipCount, type, id) => {
    const userId = id || Store.getState().user._id;

    return fetchUrl(`/api/user/myQuestions?authorID=${userId}&skipCount=${skipCount}&type=${type}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(question => (
                {...question, from_now: moment(question.created_at).fromNow()}
            ));
            if (!err && data.length) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};


/** 2018/1/8
 * author: XU ZHI WEI
 * function:刷新问题，可以是提问的，或者关注的等等
 */
export const refreshQuestion = (type, id) => {
    const userId = id || Store.getState().user._id;
    return fetchUrl(`/api/user/refreshMyQuestions?skipCount=0&type=${type}&authorID=${userId}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(question => (
                {...question, from_now: moment(question.created_at).fromNow()}
            ));
            if (!err) {
                return Promise.resolve({data: newData, count: count})
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })

};


export const ifConcernOtherAndLikeOther = (otherId) => {
    const userId = Store.getState().user._id;
    if (userId !== otherId) { //本人不好关注
        return fetchUrl('/api/user/ifConcern', 'post', {userId, otherId})
            .then(res => {
                const {err, data} = res;
                if (!err) {
                    if (data) {
                        return Promise.resolve(data)
                    }
                } else {
                    return Promise.reject('error')
                }
            }).catch(err => {
                return Promise.reject('error')
            })
    } else {
        return Promise.reject('error')
    }

};

export const likeOrDislikeUser = (otherId,status)=>{
    const userId = Store.getState().user._id;
    return fetchUrl(`/api/user/likeOrDislikeUser`, 'post', {userId, otherId,status})
        .then(res => {
            const {err} = res;
            if (!err) {
                return Promise.resolve();
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};

export const concernUser = (otherId) => {
    const userId = Store.getState().user._id;
    return fetchUrl(`/api/user/concernUser`, 'post', {userId, otherId})
        .then(res => {
            const {err} = res;
            if (!err) {
                return Promise.resolve();
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })

};

export const cancelConcernUser = otherId => {
    const userId = Store.getState().user._id;
    return fetchUrl(`/api/user/cancelConcernUser`, 'post', {userId, otherId})
        .then(res => {
            const {err} = res;
            if (!err) {
                return Promise.resolve();
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })

};

/** 2018/1/9
 * author: XU ZHI WEI
 * function: 获取这条评论是否已经赞过
 */
export const checkZanStatus = (comment_id, to_id) => {
    const from_id = Store.getState().user._id;
    return fetchUrl('/api/comment/checkZanStatus', 'post', {comment_id, to_id, from_id})
        .then(res => {
            const {err, data} = res;
            if (!err && data) {
                return Promise.resolve(data.status)
            } else { //没有赞过
                return Promise.reject('err');
            }
        })

};

/** 2018/1/9
 * author: XU ZHI WEI
 * function: 赞同或者反对某人的评论
 */
export const agreeDisagreeComment = (comment_id, to_id, status) => {
    const from_id = Store.getState().user._id;
    return fetchUrl('/api/comment/agreeComment', 'post', {comment_id, to_id, status, from_id})
        .then(res => {
            const {err} = res;
            if (!err) {
                return Promise.resolve()
            } else {
                return Promise.reject('err');
            }
        })
};


/** 2018/1/10
 * author: XU ZHI WEI
 * function:提交子评论
 */
export const submitSubComment = (content, comment_id, to_user) => {
    const from_user = Store.getState().user._id;
    return fetchUrl('/api/subcomment/submitsubcomment', 'post', {comment_id, content, from_user, to_user})
        .then(res => {
            const {err, data} = res;
            if (!err) {
                return Promise.resolve(data)
            } else {
                return Promise.reject('err');
            }
        })
};

/** 2018/1/10
 * author: XU ZHI WEI
 * function: 获取子评论
 */
export const getSubComments = (comment_id, skipCount) => {
    return fetchUrl(`/api/subcomment/getsubcomment?comment_id=${comment_id}&skipCount=${skipCount}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(subComment => (
                {...subComment, from_now: moment(subComment.created_at).format('l')}
            ));
            if (!err) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('err');
            }
        })
};

export const refreshSubComments = (comment_id) => {
    return fetchUrl(`/api/subcomment/refreshsubcomment?comment_id=${comment_id}&skipCount=0`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(subComment => (
                {...subComment, from_now: moment(subComment.created_at).format('l')}
            ));
            if (!err) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('err');
            }
        })
};


export const getSearchQuestion = (keyword, skipCount) => {
    return fetchUrl(`/api/question/searchQuestion?skipCount=${skipCount}&keyword=${keyword}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(question => (
                {...question, from_now: moment(question.created_at).fromNow()}
            ));
            if (!err && data.length) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};


export const refreshRecommendUser = (keyword) => {
    const from_user = Store.getState().user._id;
    return fetchUrl(`/api/user/recommendUser?skipCount=0&from_user=${from_user}&keyword=${keyword}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            if (!err && data.length) {
                return Promise.resolve({data, count})
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};

export const getRecommendUser = (keyword, skipCount) => {
    const from_user = Store.getState().user._id;
    return fetchUrl(`/api/user/recommendUser?skipCount=${skipCount}&from_user=${from_user}&keyword=${keyword}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            if (!err && data.length) {
                return Promise.resolve({data, count})
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};


/** 2018/1/13
 * author: XU ZHI WEI
 * function:邀请别人回答问题
 */
export const inviteOther = (questionId, to_user) => {
    const from_user = Store.getState().user._id;
    return fetchUrl('/api/notification/inviteOther', 'post', {from_user, to_user, questionId})
        .then(res => {
            const {err} = res;
            if (!err) {
                return Promise.resolve()
            } else {
                return Promise.reject('err')
            }
        }).catch(err => {
            return Promise.reject('err')
        })
};


/** 2018/1/13
 * author: XU ZHI WEI
 * function:获得消息
 */
export const getNotification = (type, skipCount) => {
    const userId = Store.getState().user._id;
    return fetchUrl(`/api/notification/${type}Notification?skipCount=${skipCount}&to_user=${userId}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(notification => (
                {...notification, from_now: moment(notification.created_at).fromNow()}
            ));
            if (!err && data.length) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};


export const refreshNotification = (type) => {
    const userId = Store.getState().user._id;
    return fetchUrl(`/api/notification/${type}Notification?skipCount=0&to_user=${userId}`, 'get')
        .then(res => {
            const {err, data, count} = res;
            const newData = data.map(notification => (
                {...notification, from_now: moment(notification.created_at).fromNow()}
            ));
            if (!err && data.length) {
                return Promise.resolve({data: newData, count})
            } else {
                return Promise.reject('error')
            }
        }).catch(err => {
            return Promise.reject('error')
        })
};


/** 2018/1/14
 * author: XU ZHI WEI
 * function:删除某条通知
 */
export const deleteNotification = (notification_id, type) => {
    return fetchUrl(`/api/notification/deleteone${type}notification`, 'post', {
        notification_id
    }).then(res => {
        const {err} = res;
        if (!err) {
            return Promise.resolve()
        } else {
            return Promise.reject('err')
        }
    }).catch(err => {
        return Promise.reject('err')
    })
};

export const deleteAllNotification = (type) => {
    const user_id = Store.getState().user._id;
    return fetchUrl(`/api/notification/deleteall${type}notification`, 'post', {
        user_id
    }).then(res => {
        const {err} = res;
        if (!err) {
            return Promise.resolve()
        } else {
            return Promise.reject('err')
        }
    }).catch(err => {
        return Promise.reject('err')
    })
};

export const setUserLocation = (longitude, latitude) => {
    const user_id = Store.getState().user._id;
    return fetchUrl(`/api/user/setUserLocation`, 'post', {
        user_id,
        longitude,
        latitude
    }).then(res => {
        const {err} = res;
        if (!err) {
            return Promise.resolve()
        } else {
            return Promise.reject('err')
        }
    }).catch(err => {
        return Promise.reject('err')
    })
};

export const getNearUsers = (longitude, latitude, skipCount) => {
    const user_id = Store.getState().user._id;
    return fetchUrl(`/api/chat/nearUsers?skipCount${skipCount}`, 'post', {
        user_id,
        longitude,
        latitude
    }).then(res => {
        const {err, count, data} = res;
        if (!err) {
            const newData = data.map(user => {
                return {...user, distance: getDistance(latitude, longitude, user.loc[1], user.loc[0])}
            });
            return Promise.resolve({count, data: newData})
        } else {
            return Promise.reject('err')
        }
    }).catch(err => {
        return Promise.reject('err')
    })
};


/** 2018/1/19
 * author: XU ZHI WEI
 * function:发送消息到数据库和socketio
 */
export const sendMyMessage = (content, sender, receiver) => {
    sendMessage(sender, receiver, content);
    return fetchUrl('/api/chat/sendMessage', 'post', {content, sender, receiver})
        .then(res => {
            const {err} = res;
            if (!err) {
                return Promise.resolve()
            } else {
                return Promise.reject('err')
            }
        }).catch(err => {
            return Promise.reject('err')
        })
};

/** 2018/1/17
 * author: XU ZHI WEI
 * function:获得历史聊天记录，默认每次显示15条
 */
export const getMyHistoryMessage = (sender, receiver, skipCount = 0) => {
    return fetchUrl(`/api/chat/historyMessage?sender=${sender}&receiver=${receiver}&skipCount=${skipCount}`, 'get')
        .then(res => {
                const {err, count, data} = res;
                if (!err) {
                    const newData = data;
                    for (let i = 1; i < data.length; i++) {
                        const diff = moment(newData[i].created_at).diff(moment(newData[i - 1].created_at), 'minutes');
                        if (diff >= 5 && diff < 60 * 24) {
                            newData[i] = {...newData[i], time: moment(newData[i].created_at).format('a h:mm')};
                            continue;
                        }
                        if (diff >= 60 * 24) {
                            newData[i] = {...newData[i], time: moment(newData[i].created_at).format('lll')};
                        }
                    }
                    return Promise.resolve({count, data: newData})
                }
                else {
                    return Promise.reject('err')
                }
            }
        ).catch(err => {
            return Promise.reject('err')
        })
};

export const registerUser = (username, password, email, avatar) => {
    return fetchUrl('/api/user/register', 'post', {
        username, password, email, avatar
    }).then(res => {
        const {data, err} = res;
        if (!err && data) {
            return AsyncStorage.setItem('user', JSON.stringify({...data, isLogin: true})).then(() => {
                connectSocket(data._id);
                return Promise.resolve(data);
            }).catch(() => {
                return Promise.reject('err');
            })
        } else {
            const {errmsg} = res;
            if (errmsg) {
                return Promise.reject(errmsg);
            } else {
                return Promise.reject('err');
            }
        }
    })
};

export const cancelAgreeAndDisagree = (comment_id,to_id,status)=>{
    const from_id = Store.getState().user._id;
    return fetchUrl('/api/comment/cancelAgreeComment', 'post', {comment_id, to_id, status, from_id})
        .then(res => {
            const {err,msg} = res;
            if (!err) {
                return Promise.resolve(msg)
            } else {
                return Promise.reject('err');
            }
        })
};


/** 2018/1/28
 * author: XU ZHI WEI
 * function:提交问题
 */
export const submitQuestion = (title,detail,noName,path)=>{
        const authorID = Store.getState().user._id;
        if(path&&path.length) {
            uploadImage('/api/question/submitQstWithPic',title,detail,noName,authorID,path)
        } else {
            fetchUrl('/api/question/submitQst', 'post', {title, detail, authorID, noName}).then(res => {
            }).catch(err=>{})
        }
};






