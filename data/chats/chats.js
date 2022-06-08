const { time } = require('console');
const fs = require('fs');
const ID = require("../../tools/id");

const avalibleChats = JSON.parse(fs.readFileSync("./data/chats/chats.json"));

const emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


var Chats = {
    CreateChat: (users,postid)=>{
        var chat = {
            ID:ID.createChatID(),
            users:users,
            postID:postid,
            messages:[]
        }      

        avalibleChats.push(chat);

        Chats.SaveChats();

        return chat;
    },
    SendMessages: (userID, postid, message)=>{
        var chat = avalibleChats.find((elem)=>elem.ID === postid)
        if(chat === undefined || chat === null || chat === NaN)
            return false;
        
        var user = chat.users.find((elem)=>elem === userID);
        if(user === undefined || user === null || user === NaN)
            return false;
        
        var message = {
            ID: ID.createMessageID(),
            timestamp: Date.now(),
            userID: userID,
            message: message
        }

        chat.messages.push(message);
        
        Chats.SaveChats();

        return true;
    },
    GetMessagesByUserID: (userID)=>{
        var messages = avalibleChats.filter((elem)=>elem.users.find((elem1)=>elem1 === userID) !== undefined)
        return messages;
    },
    GetMessagesByChatID: (chatID, timestamp)=>{
        var chat = avalibleChats.find((elem)=>elem.ID === chatID);
        if(chat === undefined || chat === null || chat === NaN)
            return false;
        
        if(timestamp !== undefined && timestamp !== null && timestamp !== NaN ){
            let tmp = JSON.parse(JSON.stringify(chat));
            tmp.messages = chat.messages.filter((elem)=>elem.timestamp > timestamp)
            return tmp
        }
        else{
            return chat;
        }
    },
    SaveChats: ()=>{
        fs.writeFileSync("./data/chats/chats.json", JSON.stringify(avalibleChats,null,2));
    }
}


module.exports = Chats;