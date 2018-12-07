/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    educationFromConfig=require('../fromConfig/quali-education.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(educationFromConfig);
var educationSchema = new mongoose.Schema(
    schemaObject,{collection: "educationDetails"});

module.exports =mongoose.model('educationDetails',educationSchema);