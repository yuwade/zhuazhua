/**
 * Created by yu on 2015/10/25.
 */
//var assert = require('assert');
//var cheerio = require('cheerio');
//var request  = require('request');
//var iconv = require('iconv-lite');
//var fs = require('fs');
//var Q = require('q');
var hero = require('./controller/hero');
hero.addCharts();
//request.get('http://lol.qq.com/web201310/info-heros.shtml')
//    .charset('gbk')
//    .end(function(err,res) {
//        console.log(res.text)
//
//    });

//function get(url){
//    var options ={url:url,encoding : null};
//    var defer = Q.defer();
//    request.get(options,function(err,req,body){
//        if(err){console.log(err); return}
//        var charset="utf-8";
//        var arr=body.toString().match(/<meta([^>]*?)>/g);
//        if(arr){
//            arr.forEach(function(val){
//                var match=val.match(/charset\s*=\s*(.+)\"/);
//                if(match && match[1]){
//                    if(match[1].substr(0,1)=='"')match[1]=match[1].substr(1);
//                    charset=match[1].trim();
//                    return false;
//                }
//            })
//        }
//        var data = iconv.decode(body, charset);
//        //data = iconv.encode(data, 'utf8');
//        //data = iconv.decode(data, 'utf8');
//        defer.resolve(data);
//    })
//    return defer.promise
//}
//
//var url = 'http://lol.qq.com/web201310/info-heros.shtml';
//get(url).then(function(data){
//    //console.log(data)
//    //var $ = cheerio.load(data);
//    //var len = $('#jSearchHeroDiv li').html()
//    //console.log(len)
//})
//request.get('http://lol.qq.com/biz/hero/champion.js',function(err,req,body){
//    eval(body);
//    var data =  LOLherojs.champion.data;
//    for(var itme in data){
//        console.log(data[itme].name,data[itme].title)
//    }
//})