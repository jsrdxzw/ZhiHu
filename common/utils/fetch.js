import {Toast} from 'antd-mobile';

const baseUrl = 'http://localhost:3333'; //api的服务器地址

const fetchURL = (subUrl, method, params) => {
    const url = baseUrl + subUrl;
    if (method.toLowerCase() === 'post') {
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.msg) {
                    Toast.info(resJson.msg, 1);
                } else {
                    Toast.hide();
                }
                return Promise.resolve(resJson)
            }).catch(err => {
                Toast.hide();
                return Promise.reject(err)
            })
    } else {
        return fetch(url)
            .then(res => res.json())
            .then(resJson => {
                if(resJson.msg) {
                    Toast.info(resJson.msg, 1);
                } else {
                    Toast.hide();
                }
                return Promise.resolve(resJson)
            }).catch(err => {
                Toast.hide();
                return Promise.reject(err)
            })
    }
};


export default fetchURL;

