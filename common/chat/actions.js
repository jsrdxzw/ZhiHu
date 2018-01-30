import {sendMyMessage, getMyHistoryMessage} from '../utils/rest';
import moment from 'moment';
import Store from '../Store';

const SEND_MESSAGE = 'SEND_MESSAGE';
const GET_HISTORY_MESSAGE = 'GET_HISTORY_MESSAGE';
const LOADING_MORE = 'LOADING_MORE';
const RECEIVE_MESSAGE_INTIME = 'RECEIVE_MESSAGE_INTIME';
const READ_SPECIAL_MESSAGE = 'READ_SPECIAL_MESSAGE';
const SET_CHATTER = 'SET_CHATTER';
const CLEAR_CHATTER = 'CLEAR_CHATTER';
const RECEIVE_MESSAGE_INTIME_NOUNREAD = 'RECEIVE_MESSAGE_INTIME_NOUNREAD';
const CLEAR_UNREAD = 'CLEAR_UNREAD';
const SET_CACHE_MESSAGES = 'SET_CACHE_MESSAGES';

function send_message(sendMessage) {
    return {
        type: SEND_MESSAGE,
        payload: sendMessage
    }
}

function loading_more(loading) {
    return {
        type: LOADING_MORE,
        loading: loading
    }
}

function get_history_message(count, data) {
    return {
        type: GET_HISTORY_MESSAGE,
        payload: {count, data}
    }
}

export function receive_message_intime(data) {
    if(Store.getState().common.tabIndex===1){
        return {
            type: RECEIVE_MESSAGE_INTIME_NOUNREAD,
            payload: data
        }
    } else {
        return {
            type: RECEIVE_MESSAGE_INTIME,
            payload: data
        }
    }
}

export function clear_unread(){
    return {
        type:CLEAR_UNREAD
    }
}

export function read_special_message() {
    return{
        type:READ_SPECIAL_MESSAGE
    }
}

export function set_current_chater(chatter) {
    return{
        type:SET_CHATTER,
        payload:chatter
    }
}

export function clear_chatter() {
    return{
        type:CLEAR_CHATTER
    }
}

/** 2018/1/30
 * author: XU ZHI WEI
 * function: sender 发送者id，messages为数组
 */
// export function set_cache_messages(sender,messages,count) {
//     const cacheMessages = Store.getState().messages.cacheMessages;
//     if(Object.keys(cacheMessages).length>50){
//         return {
//             type:SET_CACHE_MESSAGES,
//             payload:{sender,messages,count,ifClear:true}
//         }
//     }else {
//         return {
//             type:SET_CACHE_MESSAGES,
//             payload:{sender,messages,count,ifClear:false}
//         }
//     }
// }

export const sendMessage = (content, receiver) => {
    return (dispatch, getState) => {
        const sender = getState().user._id;
        sendMyMessage(content, sender, receiver)
            .then(() => {
                const created_at = new Date();
                const messages = getState().messages.messages;
                let sendMessage = {content,sender:{_id:getState().user._id},created_at};
                if (messages.length) {
                    const diff = moment(created_at).diff(moment(messages[messages.length-1].created_at),'minutes');
                    if (diff>=5 && diff<60*24) {
                        sendMessage = {...sendMessage,time:created_at.format('a h:mm')};
                    }else if(diff>=60*24){
                        sendMessage = {...sendMessage,time:created_at.format('lll')};
                    }
                }
                dispatch(send_message(sendMessage))
            }).catch(err => {
        })
    }
};

export const getHistoryMessage = (sender) => {
    return (dispatch, getState) => {
        const receiver = getState().user._id;
        const count = getState().messages.count;
        const loadLength = getState().messages.messages.length;
        if (count > loadLength || loadLength === 0) {
            dispatch(loading_more(true));
            getMyHistoryMessage(sender, receiver, loadLength)
                .then(({count, data}) => {
                    dispatch(get_history_message(count, data))
                }).catch(err => {
                dispatch(loading_more(false))
            })
        }
    }
};
