const initState = {
    loading:false,//刷新数据
    loadingMore:false,//分页加载数据
    questionComments:{count:0,page:1,comments:[]} //问题的评论
};

export const reducer = (state=initState,action)=>{
    switch (action.type){
        case 'SUBMIT_QUESTION_COMMENTS':
            return {...state,questionComments:{...state.questionComments,id:action.payload._id,count:state.questionComments.count+1,comments:[action.payload,...state.questionComments.comments]}};
        case 'GET_QUESTION_COMMENTS':
            return {...state,questionComments:{count:action.payload.count,page:state.questionComments.page+1,comments:[...state.questionComments.comments,...action.payload.comments]},loadingMore:false};
        case 'INIT_QUESTION_COMMENTS':
            return {...state,questionComments:{count:0,page:1,comments:[]}};
        default:
            return state;
    }
};

