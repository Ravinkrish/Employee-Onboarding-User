/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/userpendingtimesheets.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var userpendingtimesheetsSchema = new mongoose.Schema(
    schemaObject,{collection: "userpendingtimesheetsDetails"});

module.exports =mongoose.model('userpendingtimesheetsDetails',userpendingtimesheetsSchema);