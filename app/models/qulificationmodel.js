/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    qualificationFromConfig=require('../fromConfig/qualification.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(qualificationFromConfig);
var qualificationSchema = new mongoose.Schema(
    schemaObject,{collection: "qualificationDetails"});

module.exports =mongoose.model('qualificationDetails',qualificationSchema);