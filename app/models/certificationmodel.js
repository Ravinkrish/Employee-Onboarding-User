/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    companyFromConfig=require('../fromConfig/certification.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(companyFromConfig);
var certificationSchema = new mongoose.Schema(
    schemaObject,{collection: "certificationDetails"});

module.exports =mongoose.model('certificationDetails',certificationSchema);