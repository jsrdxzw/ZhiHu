import fetchUrl from '../utils/fetch';
import {AsyncStorage} from 'react-native';
import {connectSocket,disConnectSocket} from '../utils/websocket';

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const GET_USER_LOCAL = 'GET_USER_LOCAL';
const LOGOUT = 'LOGOUT';
const EDIT_USER_AVATAR = 'EDIT_USER_AVATAR';
const EDIT_USER_NAME = 'EDIT_USER_NAME';
const EDIT_USER_GENDER = 'EDIT_USER_GENDER';
const EDIT_USER_SPECIALIST = 'EDIT_USER_SPECIALIST';
const EDIT_USER_DESCRIPTION = 'EDIT_USER_DESCRIPTION';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

/** 2017/12/23
 * author: XU ZHI WEI
 * function: 发送登录成功的状态
 * @param user
 */
function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

function getUserLocally(user) {
    return {
        type: GET_USER_LOCAL,
        payload: user
    }
}


/** 2017/12/23
 * author: XU ZHI WEI
 * function:用户登出
 */
function logoutUser() {
    return {
        type: LOGOUT
    }
}

/** 2017/12/27
 * author: XU ZHI WEI
 * function: 这里还是base64格式存到数据库
 */
function editAvatar(avatar) {
    return {
        type: EDIT_USER_AVATAR,
        payload: avatar
    }
}

/** 2017/12/24
 * author: XU ZHI WEI
 * function: 修改名字
 */
function editName(name) {
    return {
        type: EDIT_USER_NAME,
        payload: name
    }
}

function editDescription(description) {
    return {
        type:EDIT_USER_DESCRIPTION,
        payload:description
    }
}

function editGender(gender) {
    return {
        type: EDIT_USER_GENDER,
        payload: gender
    }
}

function editSpecialists(specialists) {
    return {
        type: EDIT_USER_SPECIALIST,
        payload: specialists
    }
}

export const getUserFromLocal = () => {
    return dispatch => {
        AsyncStorage.getItem('user').then(res => {
            connectSocket(JSON.parse(res)._id);
            dispatch(getUserLocally(JSON.parse(res)))
        }).catch(err => {
            dispatch(getUserLocally({}))
        });
    }
};


export const login = (email, password) => {
    return dispatch => {
        fetchUrl('/api/user/login', 'post', {email, password}).then(res => {
            const {err, data} = res;
            if (!err) {
                AsyncStorage.setItem('user', JSON.stringify({...data, isLogin: true})).then(() => {
                    dispatch(loginSuccess(data));
                    connectSocket(data._id);
                }).catch(() => {
                    alert('本地存错误')
                })
            }
        }).catch(err => {
            alert('fetch error' + err)
        })
    }
};


/** 2018/1/27
 * author: XU ZHI WEI
 * function:注册成功
 */
export const register_success = (user)=>{
   return {
       type:REGISTER_SUCCESS,
       payload:user
   }
};

export const logout = () => {
    return (dispatch,getState) => {
        const id = getState().user._id;
        disConnectSocket(id);
        AsyncStorage.removeItem('user').then(() => {
            dispatch(logoutUser())
        }).catch((err) => {
            alert('登出错误' + err)
        })
    }
};

export const editUserAvatar = (avatar) => {
    return (dispatch, getState) => {
        fetchUrl('/api/user/editAvatar', 'post', {id: getState().user._id, avatar}).then(res => {
            const {err} = res;
            if (!err) {
                AsyncStorage.mergeItem('user', JSON.stringify({avatar})).then(() => {
                    dispatch(editAvatar(avatar))
                }).catch(() => {
                    alert('本地存错误')
                })
            }
        }).catch(err => {
            alert('fetch error' + err)
        })
    }
};

export const editUserName = (name = '匿名') => {
    return (dispatch, getState) => {
        fetchUrl('/api/user/editName', 'post', {id: getState().user._id, name}).then(res => {
            const {err} = res;
            if (!err) {
                AsyncStorage.mergeItem('user', JSON.stringify({name})).then(() => {
                    dispatch(editName(name))
                }).catch(() => {
                    alert('本地存错误')
                })
            }
        }).catch(err => {
            alert('fetch error' + err)
        })
    }
};

export const editUserDescription = description => {
    return (dispatch, getState) => {
        fetchUrl('/api/user/editDescription', 'post', {id: getState().user._id, description}).then(res => {
            const {err} = res;
            if (!err) {
                AsyncStorage.mergeItem('user', JSON.stringify({description})).then(() => {
                    dispatch(editDescription(description))
                }).catch(() => {
                    alert('本地存错误')
                })
            }
        }).catch(err => {
            alert('fetch error' + err)
        })
    }
};

export const editUserGender = (gender) => {
    return (dispatch, getState) => {
        fetchUrl('/api/user/editGender', 'post', {id: getState().user._id, gender}).then(res => {
            const {err} = res;
            if (!err) {
                AsyncStorage.mergeItem('user', JSON.stringify({gender})).then(() => {
                    dispatch(editGender(gender))
                }).catch(() => {
                    alert('本地存错误')
                })
            }
        }).catch(err => {
            alert('fetch error' + err)
        })
    }
};

export const editUserSpecialists = (specialists) => {
    return (dispatch, getState) => {
        fetchUrl('/api/user/editSpecialist', 'post', {id: getState().user._id, specialists}).then(res => {
            const {err} = res;
            if (!err) {
                AsyncStorage.mergeItem('user', JSON.stringify({specialists})).then(() => {
                    dispatch(editSpecialists(specialists))
                }).catch(() => {
                    alert('本地存错误')
                })
            }
        }).catch(err => {
            alert('fetch error' + err)
        })
    }
};





