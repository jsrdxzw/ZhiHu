import io from 'socket.io-client';
import {actions} from '../chat';
import Store from '../Store';

const baseUrl = 'http://192.0.1.5:3333/chat';

let socket = null;
let joined = false;


function startListener() {
    if (socket) {
        socket.on('receiver message', function (data) {
            if (data) {
                Store.dispatch(actions.receive_message_intime(data))
            }
        });
    }
}

export const connectSocket = (id) => {
    if(!joined) {
        socket = io.connect(baseUrl);
        socket.emit('join room', {id});
        startListener();
        joined = true
    }
};

export const disConnectSocket = (id) => {
    socket.emit('leave room', id);
    socket.disconnect();
    socket = null;
};

export const sendMessage = (sender, receiver, message) => {
    if (socket) {
        socket.emit('send message', {sender, receiver, message})
    }
};



