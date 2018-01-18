const initState = {
    count:0,
    loading:false,
    messages:[]
};

const reducer = (state=initState,action)=>{
    switch (action.type){
        case 'SEND_MESSAGE':
            return {...state,messages:[...state.messages,action.payload],count:state.count+1};
        case 'LOADING_MORE':
            return {...state,loading:action.loading};
        case 'GET_HISTORY_MESSAGE':
            return {...state,messages:[...state.messages,...action.payload.data],count:state.count+action.payload.count,loading:false};
        default:
            return state;
    }
};

export default reducer;