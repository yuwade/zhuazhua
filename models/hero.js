/**
 * Created by yu on 2015/10/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hero = new Schema({
    id:String,
    key:Number,
    name:String,
    title:String,
    tags:[String]
});

mongoose.model('hero',hero);