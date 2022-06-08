var url = require("url");
var Posts = require("../../data/posts/posts");
const Users = require("../../data/users/users");
const Chats = require("../../data/chats/chats");

var Authentication = require("../authorize");

async function GetUserMessages(req, res, route){
    var q = url.parse(req.url, true);

    console.log(route.prop.user)

    res.writeHead(200, {'Content-Type': 'application/json'});

    
    let ret = JSON.parse(JSON.stringify(Chats.GetMessagesByUserID(route.prop.user.id))); 
    ret.forEach(element => {
        element.messages = [element.messages[element.messages.length - 1 ]]
        element.users = element.users.map((user)=>{
            return Users.GetUserByID(user).username;

        })
        if(element.messages[0] !== undefined && element.messages[0] !== null && element.messages[0] !== NaN)
            element.messages[0].username = Users.GetUserByID(element.messages[0].userID).username;
    });

    res.write(JSON.stringify( ret, null, 2));
    
    res.end();

    route.next();
}



module.exports = {
    url:/^\/messages\/getusermessages/i,
    method: "GET",
    route: [
        Authentication,
        GetUserMessages

    ],
};
