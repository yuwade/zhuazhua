/**
 * Created by yu on 2015/10/25.
 */
var Crawler = require("crawler");
var url = require('url');
var _ = require('lodash');
var web178 = require('./controller').Web178;


//require('./controller/17173');
var c = new Crawler({
    maxConnections : 10
});
c.queue([{
    uri: 'http://lol.qq.com/biz/hero/champion.js',
    jQuery: false,
    callback: function (error, result) {
        eval(result.body);
        var champions =_.values(LOLherojs.champion.keys);
        web178(champions)
    }
}]);