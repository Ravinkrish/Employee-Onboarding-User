var mongoose=require('mongoose');
var releaveschema=mongoose.Schema({
                    employeeid:Number,
                    releaveInfoDate:String
                            })

module.exports=mongoose.model('releaveinfo',releaveschema);
