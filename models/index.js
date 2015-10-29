/**
 * Created by yu on 2015/10/25.
 */

var mongoose = require('mongoose');
mongoose.connect(require('../config').db,{
 server: {poolSize: 4}
},function(err){
 if(err){
   console.error(err.message);
 }else{
  console.log('mongodb is ok')
 }

})

require('./hero');




exports.Hero = mongoose.model('hero');