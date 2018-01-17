import {sendMyMessage,getHistoryMessage} from '../utils/rest';
const SEND_MESSAGE = 'SEND_MESSAGE';


function send_message(content,sender) {
    return {
        type:SEND_MESSAGE,
        payload:{content,sender}
    }
}

export const sendMessage = (content,receiver)=>{
    return (dispatch,getState)=>{
        const sender = getState().user._id;
        sendMyMessage(content,sender,receiver)
            .then(()=>{
                dispatch(send_message(content,getState().user))
            })
    }
};

export const getHistoryMessage = (sender,skipCount)=>{
   return (dispatch,getState)=>{

   }
};