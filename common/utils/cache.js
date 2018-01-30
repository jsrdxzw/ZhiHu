const cacheMessages = {};
const cacheMessagesCount = {};

export const set_cache_messages = (sender,messages,count)=>{
    if(Object.keys(cacheMessages).length>50){
        delete cacheMessages[Object.keys(cacheMessages)[0]];
        delete cacheMessagesCount[Object.keys(cacheMessages)[0]];
        cacheMessages[sender] = messages;
        cacheMessagesCount[sender] = count;
    }else {
        cacheMessages[sender] = messages;
        cacheMessagesCount[sender] = count;
    }
};

export const receiver_timely_message = (sender,message)=>{
        if (cacheMessagesCount[sender] < 15) {
            cacheMessages[sender].push(message)
        } else {
            cacheMessages[sender].shift();
            cacheMessages[sender].push(message);
        }
        cacheMessagesCount[sender] += 1;
};


export const get_cache_messages = (sender)=>{
    if(cacheMessages[sender]!==undefined) {
        return {
            cacheMessage: cacheMessages[sender],
            cacheMessageCount: cacheMessagesCount[sender]
        }
    } else {
        return null
    }
};


