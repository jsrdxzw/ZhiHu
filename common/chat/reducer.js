// const initState = {
//     count:0,
//     loading:false,
//     messages:[]
// };

const initState = {
    messages:null, //这个是临时传送的消息
    currentChatter:null,
    unReadCount:0,
    cacheMessages:{} //缓存初始信息，用户不用每次加载，大于1000则清空
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
        case 'SET_CACHE_MESSAGES':
            if(action.payload.ifClear){
                const newCacheMessages = delete state.cacheMessages[Object.keys(state.cacheMessages)[0]];
                return {...state,cacheMessages:{...newCacheMessages,[action.payload.sender]:action.payload.messages}}
            } else {
                return {...state,cacheMessages:{...state.cacheMessages,[action.payload.sender]:action.payload.messages}}
            }
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