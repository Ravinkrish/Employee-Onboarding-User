/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/trainingsession.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var trainsessionSchema = new mongoose.Schema(
    schemaObject,{collection: "trainsessionDetails"});

module.exports =mongoose.model('trainsessionDetails',trainsessionSchema);