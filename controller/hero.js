/**
 * Created by yu on 2015/10/29.
 */
var request = require('request');
var Hero = require('../porxy').Hero;
exports.addCharts=function(){
    request.get('http://lol.qq.com/biz/hero/champion.js',function(err,req,body){
        eval(body);
        var data =  LOLherojs.champion.data;
        for(var itme in data){
            Hero.add(data[itme]);
        }
    })
    //Hero.removeAll();
    //Hero.add({name:"haha",id:"dd"})

}