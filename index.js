/**
 * Created by yu on 2015/10/25.
 */
var cheerio = require('cheerio');
var request  = require('superAgent');

request.get('http://lol.qq.com/web201310/info-heros.shtml')
    .end(function(err,res){
        if(err){console.log(err);}
        console.log(res.text)
    })
