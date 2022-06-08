var url = require("url");
var Posts = require("../../data/posts/posts");
const Users = require("../../data/users/users");
const Chats = require("../../data/chats/chats");

var Authentication = require("../authorize");

async function GetChat(req, res, route){
    var q = url.parse(req.url, true);

    res.writeHead(200, {'Content-Type': 'application/json'});

    await route.getBody();
    if(req.body === undefined || req.body === null || req.body === NaN){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }

    req.body = JSON.parse(req.body);
    if(req.body.chatid === undefined || req.body.chatid === null || req.body.chatid === NaN){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }
    console.log(req.body)
    let ret = JSON.parse(JSON.stringify(Chats.GetMessagesByChatID(req.body.chatid, req.body.timestamp))); 
    
    console.log(ret)
    if(ret === undefined || ret === null || ret === NaN){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }

    if(ret.users.find(e=>e === route.prop.user.id) === undefined ){
        res.writeHead(403, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }
    
    ret.users = ret.users.map((user)=>{
        return Users.GetUserByID(user).username;
        
    })
    
    ret.messages = ret.messages.map(elem=>{
        elem.userID = Users.GetUserByID(elem.userID).username
        return elem;
    })


    res.write(JSON.stringify( ret, null, 2));
    
    res.end();

    route.next();
}



module.exports = {
    url:/^\/messages\/getchat/i,
    method: "POST",
    route: [
        Authentication,
        GetChat

    ],
};
