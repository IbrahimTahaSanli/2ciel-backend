var url = require("url");
var Posts = require("../../data/posts/posts");
const Users = require("../../data/users/users");

var Authentication = require("../authorize");

async function Profile(req, res, route){
    var q = url.parse(req.url, true);

    res.writeHead(200, {'Content-Type': 'application/json'});

    //ret = JSON.parse(JSON.stringify( asd = Users.GetUserByID(0) !== null && asd !== undefined ? asd: {} ));
    let ret = JSON.parse(JSON.stringify(route.prop.user));
    delete ret.password;
    
    ret.postCount = Posts.GetPostByUser(ret.id).length; 
    res.write(JSON.stringify( ret, null, 2));
    
    res.end();

    route.next();
}



module.exports = {
    url:/^\/profile/i,
    method: "GET",
    route: [
        Authentication,
        Profile

    ],
};
