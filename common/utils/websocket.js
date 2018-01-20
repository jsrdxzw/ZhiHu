import io from 'socket.io-client';
import {actions} from '../chat';
import Store from '../Store';
const baseUrl = 'http://10.249.41.12:3000/chat';

let socket = null;


function startListener() {
    if (socket) {
        socket.on('receiver message', function(data){
            if(data){
                Store.dispatch( actions.receive_message_intime(data))
            }
        });
    }
}

export const connectSocket = (id) => {
    socket = io.connect(baseUrl);
    socket.emit('join room',{id});
    startListener()
};

export const disConnectSocket = (id) => {
    socket.emit('leave room',id);
    socket.disconnect();
    socket = null;
};

export const sendMessage = (sender,receiver,message)=>{
     if(socket){
         socket.emit('send message',{sender,receiver,message})
     }
};



