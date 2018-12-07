/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/language.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var languageSchema = new mongoose.Schema(
    schemaObject,{collection: "languageDetails"});

module.exports =mongoose.model('languageDetails',languageSchema);