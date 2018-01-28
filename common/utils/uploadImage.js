import {Toast} from 'antd-mobile';
export const baseUrl = 'http://10.0.1.5:3333';

export const uploadImage = (url,title,detail,noName,authorID,path)=>{
    const data = new FormData();
    const file = {uri: path, type: 'image/jpg',name: 'photoName'};
    data.append('title',title);
    data.append('detail',detail);
    data.append('noName',noName);
    data.append('authorID',authorID);
    data.append('picture',file);
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
