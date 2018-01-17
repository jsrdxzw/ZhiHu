const initState = {
    count:0,
    loading:false,
    loadingMore:false,
    messages:[]
};

const reducer = (state=initState,action)=>{
    switch (action.type){
        case 'SEND_MESSAGE':
            return {...state,messages:[...state.messages,action.payload],count:state.count+1};
        default:
            return state;
    }
};

export default reducer;