import fetchUrl from '../utils/fetch';
const SUBMIT_QUESTION = 'SUBMIT_QUESTION';

function submitQst(data) {
    return {
        type:SUBMIT_QUESTION,
        payload:data
    }
}


/** 2017/12/30
 * author: XU ZHI WEI
 * @param noName boolean 是否匿名
 * @param title 提问标题，必须
 * @param detail 提问细节，非必须
 * function:
 */
export const submitQuestion = (title,detail,noName)=>{
    return (dispatch,getState)=>{
          const authorID = getState().user._id;
        fetchUrl('/api/question/submitQst','post',{title,detail,authorID,noName}).then(res=>{
            const {err} = res;
            if(!err){
                dispatch(submitQst({title,detail}))
            }
        })
    }
};