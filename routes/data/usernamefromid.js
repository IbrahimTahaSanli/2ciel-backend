var url = require("url");
const Users = require("../../data/users/users");

var Authentication = require("../authorize");


async function usernamefromid(req, res, route){
    var q = url.parse(req.url, true);

    await route.getBody();
    if(req.body === undefined || req.body === null || req.body === NaN){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }

    req.body = JSON.parse(req.body);
    
    let user = Users.GetUserByID(req.body.userid);
    if(user === undefined || user === null || user === NaN){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
        return route.failRoute();
    }


    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({username:user.username}));
    
    res.end();

    route.next();
}



module.exports = {
    url:/^\/profile\/getusernamefromid/i,
    method: "POST",
    route: [
        Authentication,
        usernamefromid
    ],
};
