const crypto = require("crypto");

module.exports = class ID{
    static createPostID(){
        return crypto.randomBytes(24).toString("hex")        
    }
    static createUserID(){
        return crypto.randomBytes(24).toString("hex")        
    }
    static createChatID(){
        return crypto.randomBytes(32).toString("hex")        
    }
    static createMessageID(){
        return crypto.randomBytes(64).toString("hex")        
    }

}