/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/employeement.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var employeementSchema = new mongoose.Schema(
    schemaObject,{collection: "employeementDetails"});

module.exports =mongoose.model('employeementDetails',employeementSchema);