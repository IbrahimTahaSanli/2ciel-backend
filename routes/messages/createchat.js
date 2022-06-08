var url = require("url");
var Posts = require("../../data/posts/posts");
const Users = require("../../data/users/users");
const Chats = require("../../data/chats/chats");

var Authentication = require("../authorize");

async function CreateChat(req, res, route){
    var q = url.parse(req.url, true);

    await route.getBody();
    if(req.body === undefined || req.body === null || req.body === NaN){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }
    
    req.body = JSON.parse(req.body);
    if(req.body.postid === undefined || req.body.postid === null || req.body.postid === NaN){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }
    
    let post = Posts.GetPostByID(req.body.postid);
    if(post === undefined || post === null || post === NaN){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }
    
    let chat = JSON.parse(JSON.stringify(Chats.CreateChat([route.prop.user.id, post.userId], post.id)));    
    if(chat === undefined || chat === null || chat === NaN){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }
    
    chat.users = chat.users.map((user)=>{
        return Users.GetUserByID(user).username;
        
    })
    
    chat.messages = chat.messages.map(elem=>{
        elem.userID = Users.GetUserByID(elem.userID).username
        return elem;
    })

    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify( chat, null, 2));
    
    res.end();

    route.next();
}



module.exports = {
    url:/^\/messages\/createchat/i,
    method: "POST",
    route: [
        Authentication,
        CreateChat

    ],
};
