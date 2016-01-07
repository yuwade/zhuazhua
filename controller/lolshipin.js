/**
 * Created by yu on 2016/1/5.
 */
var Crawler = require("crawler");
var config = require('../config');
var _ = require('lodash');
module.exports = function(champions){
    var queues = _.map(champions,function(hero){
        return 'http://www.lolshipin.com/yingxiong/'+hero.toLowerCase()+'/';
    })
    c.queue(queues);
};
var host = 'http://www.lolshipin.com';
var c = new Crawler({
    maxConnections : config.maxConnections,
    forceUTF8:true,
    incomingEncoding:'gb2312',
    callback : function (error, result, $) {
        var pageNextUrl = '';
        var minTime = new Date();
        var container = $('.sa-comic_show_list ul li');
        var len = container.length-1;
        var name =  _.trimRight(result.request.path,'/').split('/').slice(-1)[0];
        console.log('container',container.length)
        _.each(container,function(li,index){
            var item = $(li);
            var nextUrl = item.find('.pic a').attr('href');
            var title= item.find('.pic a').attr('title');
            var _time = item.find('.info .date').text();
            var time = new Date(_time);
            var champion = {name:name,time:time,title:title};
            requestVideoUrl(host+nextUrl,champion);

            minTime = Math.min(minTime,time)
            if(len==index){
                var pagelist = $('.mod-page a');
                pageNextUrl = $(pagelist[pagelist.length-1]).attr('href');
                if(pageNextUrl!='#')
                {
                    if(minTime>new Date(2015,10,1)){
                        c.queue(host+'/yingxiong/'+name+'/'+pageNextUrl);
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
            if($('embed')){
                var embed = $("<Hill_man>").append($('embed')).html()
                champion.embed =embed;
            }else {
                champion.videoUrl = $('.content iframe').attr('src');
            }

            //database;
            //console.log(champion);
        }
    }]);
}
c.queue('http://www.lolshipin.com/yingxiong/irelia/');
