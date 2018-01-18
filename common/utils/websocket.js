import io from 'socket.io-client';
const baseUrl = 'http://10.0.1.5:3000';

let socket = null;

function startListener() {
    if(socket){
        socket.on('news', function (data) {
            socket.emit('my other event', { my: 'data12' });
        });
    }
}

export const connectSocket = (id)=>{
    socket = io.connect(baseUrl);
    startListener()
};

export const disConnectSocket = ()=>{
    socket.disconnect()
};
