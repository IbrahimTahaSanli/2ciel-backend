const fs = require('fs');
const ID = require("../../tools/id");

const avalibleUsers = JSON.parse(fs.readFileSync("./data/users/users.json"));

const emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


var Users = {
    AddUser: (user)=>{
        if(user.username === undefined || user.username === "" || user.username.length < 10 || user.username.length > 40)
            return false;
        if(user.password === undefined || user.password === "" || user.password.length < 10 || user.password.length > 24)
            return false;
        if(user.email === undefined || user.email === "" || !(emailReg.test(user.email)))
            return false;
        
        user.id = ID.createUserID();
        avalibleUsers.push(user);

        Users.SaveUsers();

        return true;
    },
    GetUserByID: (userID)=>{
        return avalibleUsers.find( elem => elem.id === userID);      
    },
    GetUserByUserName: (userName) => {
        return avalibleUsers.find( elem => elem.username === userName );
    },
    GetUserByUserEmail: (email) => {
        return avalibleUsers.find( elem => elem.email === email );
    },
    RemoveUser: (userID) => {
        if(avalibleUsers.splice(avalibleUsers.findIndex(elem => elem.id === userID),1) == [])
            return false;

        Users.SaveUsers();
        return true;
    },
    SaveUsers: ()=>{
        fs.writeFileSync("./data/users/users.json", JSON.stringify(avalibleUsers,null,2));
    }
}


module.exports = Users;