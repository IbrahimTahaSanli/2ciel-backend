const Nhttp = require("./Nhttp");


const get_buy = require("./routes/get_buy/get_buy");

const tokenlogin = require("./routes/login/tokenlogin");
const login = require("./routes/login/login");
const relogin = require("./routes/login/relogin");

const verifyUserName = require("./routes/register/verifyusername");
const verifyEmail = require("./routes/register/verifyemail");
const register = require("./routes/register/register");

const profile = require("./routes/profile/profileGet");

const sendmessage = require("./routes/messages/sendmessage");
const getchat = require("./routes/messages/getchat");
const getusersmessages = require("./routes/messages/getusersmessages");
const usernamefromid = require("./routes/data/usernamefromid");

const {SERVERTIMEOUT, SERVERPORT} = require("./conf.json");
const createchat = require("./routes/messages/createchat");


let route = [
    get_buy,

    verifyUserName,
    verifyEmail,
    register,

    tokenlogin,
    login,
    relogin,

    createchat,
    sendmessage,
    getchat,
    usernamefromid,
    profile,

    getusersmessages

]

console.log("Server Live @"+SERVERPORT);

nHttp = new Nhttp(route, SERVERPORT, SERVERTIMEOUT, opts = 
    {
        DomainName:"localhost", 
        PreSetHeaders:
        {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Access-Control-Allow-Credentials': "true",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        }});
nHttp.startServer();