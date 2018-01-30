import {Toast} from 'antd-mobile';
// 120.79.155.174
export const baseUrl = 'http://192.168.1.89:3333';

export const uploadImage = (url,title,detail,noName,authorID,path)=>{
    const data = new FormData();
    data.append('title',title);
    data.append('detail',detail);
    data.append('noName',noName);
    data.append('authorID',authorID);
    for(let i=0;i<path.length;i++){
        data.append('pictures',{uri: path[i], type: 'image/jpg',name: 'photoName'});
    }
    return fetch(`${baseUrl}${url}`,{
        method:'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'multipart/form-data',
        },
        body:data
    }).then(res=>res.json()).then(res=>{
        const {err,msg} = res;
        if(!err){
            Toast.info(msg, 1);
        } else {
            Toast.info(msg, 1);
        }
    }).catch(err=>{
        Toast.info('网络错误', 1);
    })
};
