/**
 * Created by yu on 2015/12/29.
 */
var Crawler = require("crawler");
var config = require('../config');
var _ = require('lodash');

var c = new Crawler({
    maxConnections : config.maxConnections,
    callback : function (error, result, $) {
        var pageNextUrl = '';
        var minTime = new Date();
        var container = $('.article-container dl');
        var len = container.length-1;
        _.each(container,function(dl,index){
            var item = $(dl);
            var nextUrl = item.find('a').attr('href');
            var title= item.find('a').attr('title');
            var _b = item.find('b').text();
            var _timeStr = nextUrl.split('/')[3]+_b.split('/')[1];
            var time = new Date(_timeStr.substring(0,4)+'/'+_timeStr.substring(4,6)+'/'+_timeStr.substring(6));
            var name =  _.trimRight(result.request.path,'/').split('/').slice(-1)[0];
            var videoLength = item.find('strong').text();
            var champion = {name:name,time:time,title:title,videoLength:videoLength};
            requestVideoUrl(nextUrl,champion);

            minTime = Math.min(minTime,time)
            if(len==index){
                if(pageNextUrl=$('#cms_page_next'))
                {
                    if(minTime>new Date(2015,10,1)){
                        c.queue(pageNextUrl.attr('href'));
                    }
                }
            }
        })


    }
});


function requestVideoUrl(url,champion){
    c.queue([{
        maxConnections : config.maxConnections,
        uri: url,
        callback: function (error, result,$) {
            champion.videoUrl = $('.box-sp5 iframe').attr('src');
            //database;
        }
    }]);
}
module.exports = function(champions){
    var queues = _.map(champions,function(hero){
        return 'http://lol.178.com/list/'+hero.toLowerCase()+'/';
    })
    c.queue(queues);
};

