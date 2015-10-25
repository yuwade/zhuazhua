/**
 * Created by yu on 2015/10/25.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var characterClass = new Schema({
    name:{type:String},
    name_cn:{type:String},
    avator_url:{type:String},
    type:{type:String}
});