const initState = {
    isLogin:false,
    name:'',
    gender:'',
    avatar:'',
    description:'',
    specialists:[]
};

const reducer = (state=initState,action)=>{
    switch (action.type){
        case "LOGIN_SUCCESS":
            return {...state,...action.payload,isLogin:true};
        case "GET_USER_LOCAL":
            return {...state,...action.payload};
        case 'LOGOUT':
            return {isLogin:false,name:''};
        case 'EDIT_USER_NAME':
            return {...state,name:action.payload};
        case 'EDIT_USER_DESCRIPTION':
            return {...state,description:action.payload};
        case 'EDIT_USER_GENDER':
            return {...state,gender:action.payload};
        case 'EDIT_USER_SPECIALIST':
            return {...state,specialists:action.payload};
        case 'EDIT_USER_AVATAR':
            return {...state,avatar:action.payload};
        default:
            return state
    }
};

export default reducer
