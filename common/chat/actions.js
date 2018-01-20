import {sendMyMessage, getMyHistoryMessage} from '../utils/rest';
import moment from 'moment';

const SEND_MESSAGE = 'SEND_MESSAGE';
const GET_HISTORY_MESSAGE = 'GET_HISTORY_MESSAGE';
const LOADING_MORE = 'LOADING_MORE';
const RECEIVE_MESSAGE_INTIME = 'RECEIVE_MESSAGE_INTIME';
const READ_SPECIAL_MESSAGE = 'READ_SPECIAL_MESSAGE';

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
    return {
        type:RECEIVE_MESSAGE_INTIME,
        payload:data
    }
}

export function read_special_message() {
    return{
        type:READ_SPECIAL_MESSAGE
    }
}


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
