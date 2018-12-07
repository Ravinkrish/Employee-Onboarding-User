/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/userapprovedtimesheets.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var userapprovedtimesheetsSchema = new mongoose.Schema(
    schemaObject,{collection: "userapprovedtimesheetsDetails"});

module.exports =mongoose.model('userapprovedtimesheetsDetails',userapprovedtimesheetsSchema);