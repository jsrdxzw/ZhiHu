const initState = {
    tabIndex:0
};

export const reducer = (state=initState,action)=>{
    switch (action.type){
        case 'SET_TABINDEX':
            return {...state,tabIndex:action.payload};
        default:
            return state
    }
};
