const fs = require('fs');
const ID = require("../../tools/id");

const avaliblePosts = JSON.parse(fs.readFileSync("./data/posts/posts.json"));

var Posts = {
    AddPost: (post) => {
        if(post.userId == undefined)
            return false;
        if(post.description == undefined || post.description === "")
            post.description = "NAN";
        if(post.header == undefined || post.header === "")
            return false;
        if(post.price == undefined || post.price === "")
            return false;
        if(post.images == undefined)
            post.images = [];    
        
        post.id = ID.createPostID();
        avaliblePosts.push(post);
    
        Posts.SavePosts();

        return true;
    },
    GetPostCount: ()=>avaliblePosts.length,
    GetPostByID: (postID) => {
        return avaliblePosts.find(elem => elem.id === postID);
    },
    GetPostByUser: (userID) => {
        return avaliblePosts.filter(elem => elem.userId === userID );
    },
    Filter: (ByDescription, ByHeader, ByPriceMin, ByPriceMax, ByCurrency, Index, Length)=>{
        console.log(Index + " - " + Length)
        return avaliblePosts.filter(
            elem => {
            return elem.price > (ByPriceMin === undefined || ByPriceMin === null || ByPriceMin ==="NaN"? Number.MIN_VALUE: ByPriceMin) && 
                elem.price < (ByPriceMax === undefined || ByPriceMax === null || ByPriceMax ==="NaN"? Number.MAX_VALUE: ByPriceMax) && 
                elem.header.toLowerCase().includes((ByHeader === undefined || ByHeader === null || ByHeader ==="NaN"? "" : ByHeader).toLowerCase()) && 
                elem.currency.toLowerCase().includes((ByCurrency === undefined || ByCurrency === null || ByCurrency ==="NaN"? "₺" : ByCurrency).toLowerCase()) && 
                elem.description.toLowerCase().includes((ByDescription === undefined || ByDescription === null || ByDescription ==="NaN"? "" : ByDescription).toLowerCase())
        }).slice((Index === undefined ? 0:Index), (Length === undefined ? 24: Length));
    },
    GetPostByIndex: (start = 0, count = NUMBER.POSITIVE_INFINITY) => {
        return avaliblePosts.slice(start,count);
    },
    RemovePosts: (post) => {
        if(avaliblePosts.splice(avaliblePosts.indexOf(post),1) == [])
            return false;
        Posts.SavePosts();
        return true;
    },
    SavePosts: ()=>{
        fs.writeFileSync("posts.json", JSON.stringify(avaliblePosts,null,2));
    }
}

module.exports = Posts;