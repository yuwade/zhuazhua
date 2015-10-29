/**
 * Created by yu on 2015/10/28.
 */
var model = require('../models');
var Hero = model.Hero;

exports.add = function(obj){
    var hero = new Hero(obj);
    hero.save(function(err){
        if(err){console.log(err)}else{
            //console.log('add ok;')
        }
    });
}
exports.removeAll=function(){
    //var hero = new Hero();
    //Hero.remove();

    Hero.where({}).findOneAndRemove()
}

