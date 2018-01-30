// const initState = {
//     count:0,
//     loading:false,
//     messages:[]
// };

const initState = {
    messages:null, //这个是临时传送的消息
    currentChatter:null,
    unReadCount:0,

};

const reducer = (state=initState,action)=>{
    switch (action.type){
        case 'RECEIVE_MESSAGE_INTIME':
            return {...state,messages:action.payload,unReadCount:state.unReadCount+1};
        case 'RECEIVE_MESSAGE_INTIME_NOUNREAD':
            return {...state,messages:action.payload};
        case 'CLEAR_UNREAD':
            return {...state,unReadCount:0};
        case 'READ_SPECIAL_MESSAGE':
            return {...state,messages:null};
        case 'SET_CHATTER':
            return {...state,currentChatter:action.payload};
        case 'CLEAR_CHATTER':
            return {...state,currentChatter:null};
        // case 'SEND_MESSAGE':
        //     return {...state,messages:[...state.messages,action.payload],count:state.count+1};
        // case 'LOADING_MORE':
        //     return {...state,loading:action.loading};
        // case 'GET_HISTORY_MESSAGE':
        //     return {...state,messages:[...action.payload.data,...state.messages],count:state.count+action.payload.count,loading:false};
        default:
            return state;
    }
};

export default reducer;