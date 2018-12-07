/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    trainingsetupFromConfig=require('../fromConfig/trainingsetup.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(trainingsetupFromConfig);
var trainingsetupSchema = new mongoose.Schema(
    schemaObject,{collection: "trainingsetupDetails"});

module.exports =mongoose.model('trainingsetupDetails',trainingsetupSchema);