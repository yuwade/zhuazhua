/**
 * Created by yu on 2015/11/1.
 */
var Crawler = require("crawler");
var config = require('../config');
var _ = require('lodash');

var c = new Crawler({maxConnections : config.maxConnections});
var host = 'http://cha.17173.com';
module.exports = function(){
    analysisMap();
};


function first(options){
    c.queue([{
        uri: options.url,
        callback: function (error, result,$) {
            var container = $('.hero_guide li');
            var pageNextUrl = '';
            var minTime = new Date();
            var len = container.length-1;
            _.each(container,function(li,index){
                var _a=$(li).find('h6 a');
                var nextUrl= _a.attr('href');
                var title = _a.text();
                var time = new Date($(li).find('.g_info span').text()||new Date());
                var champion = {name:options.name,title:title,time:time};
                requestVideoUrl(nextUrl,champion)
                minTime = Math.min(minTime,time)
                if(len==index){
                    if(pageNextUrl=$('.next'))
                    {
                        if(minTime>new Date(2015,10,1)){
                            var nextRequest = host+pageNextUrl.find('a').attr('href');
                            options.url = nextRequest;
                            first(options);
                        }
                    }
                }
            })
        }
    }]);
}
function requestVideoUrl(nextUrl,champion) {
    var url = nextUrl;
    var slashArray= url.split('/');
    var id = slashArray[slashArray.length-1].split('.')[0];
    var embed = '<embed width="100%" height="100%" name="MainPlayer" src="http://f.v.17173cdn.com/201512253/flash/PreloaderFile.swf" id="MainPlayer" type="application/x-shockwave-flash" style="" quality="high" bgcolor="#131313" allowscriptaccess="always" allowfullscreeninteractive="true" wmode="transparent" flashvars="cid='+id+'&amp;userId=&amp;lrt=高玩教你玩游戏&amp;liveurl=">';
    champion.embed =embed;
//database

}
function run(data){
    _.each(data.result,function(champion){
        var url ='http://cha.17173.com/lol/heros/video/'+champion['_id']+'.html#vi'
        var ops = {name:champion.name.toLowerCase(),url:url};
        first(ops);
    });
}
function analysisMap(){
    c.queue([{
        uri: 'http://cha.17173.com/lol/api.html?callback=run',
        jQuery: false,
        callback: function (error, response) {
            eval(response.body);
        }
    }]);
}