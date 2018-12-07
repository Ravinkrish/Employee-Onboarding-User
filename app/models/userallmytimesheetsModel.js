/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/userallmytimesheets.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var userallmytimesheetsSchema = new mongoose.Schema(
    schemaObject,{collection: "userallmytimesheetsDetails"});

module.exports =mongoose.model('userallmytimesheetsDetails',userallmytimesheetsSchema);