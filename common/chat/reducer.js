// const initState = {
//     count:0,
//     loading:false,
//     messages:[]
// };

const initState = null;

const reducer = (state=initState,action)=>{
    switch (action.type){
        case 'RECEIVE_MESSAGE_INTIME':
            return action.payload;
        case 'READ_SPECIAL_MESSAGE':
            return null;
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