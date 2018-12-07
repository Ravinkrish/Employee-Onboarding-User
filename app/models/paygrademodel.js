/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    payGradeFromConfig=require('../fromConfig/paygrade.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(payGradeFromConfig);
var payGradeSchema = new mongoose.Schema(
    schemaObject,{collection: "payGradeDetails"});

module.exports =mongoose.model('payGradeDetails',payGradeSchema);