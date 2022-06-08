var url = require("url");
var Posts = require("../../data/posts/posts");


async function buyGet(req, res, route){
    var q = url.parse(req.url, true).query;

    res.writeHead(200, {'Content-Type': 'application/json'
    })

    console.log(q);

    ret = JSON.stringify(Posts.Filter(q.description, q.header,
        q.pricemin === undefined || q.pricemin === null || q.pricemin === `NaN`?Number.MIN_VALUE:parseFloat(q.pricemin) ,
        q.pricemax === undefined || q.pricemax === null || q.pricemax === `NaN`?Number.MAX_VALUE:parseFloat(q.pricemax),
        q.currency,
        q.index === undefined || q.index === null || q.index === `NaN`?Number.MAX_VALUE:parseInt(q.index),
        q.length === undefined || q.length === null || q.length === `NaN`?Number.MAX_VALUE:parseInt(q.length),), null, 2);

    res.write(ret);
    
    res.end();

    route.next();
}



module.exports = {
    url:/^\/buy/i,
    method: "GET",
    route: [
        buyGet
    ],
};
