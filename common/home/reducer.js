const initState = {
   question:{
       title:'',
       detail:''
   }
};

const reducer = (state=initState,action)=>{
    switch (action.type){
        case 'SUBMIT_QUESTION':
            return {...state,question:action.payload};
        default:
            return state
    }
};

export default reducer;