/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/clients.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var clientSchema = new mongoose.Schema(
    schemaObject,{collection: "ClientDetails"});

module.exports =mongoose.model('ClientDetails',clientSchema);