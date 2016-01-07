/**
 * Created by yu on 2015/11/1.
 */
var Q = require('q');
var request = require('request');
var iconv = require('iconv-lite');
exports.getByUrl=requestByUrl;



function requestByUrl(url,encode){
    var options ={url:url,
        encoding : null,
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36'
    };
    var defer = Q.defer();
    request.get(options,function(err,req,body){
        if(err){console.log(err); return}
        var charset="utf-8";
        var arr=body.toString().match(/<meta([^>]*?)>/g);
        if(arr){
            arr.forEach(function(val){
                var match=val.match(/charset\s*=\s*(.+)\"/);
                if(match && match[1]){
                    if(match[1].substr(0,1)=='"')match[1]=match[1].substr(1);
                    charset=match[1].trim();
                    return false;
                }
            })
        }
        if(encode){
            charset=encode;
        }
        var data = iconv.decode(body, charset);
        defer.resolve(data);
    })
    return defer.promise
}
function isNext(){

}