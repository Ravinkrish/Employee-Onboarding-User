/**
 * Created by Pro on 8/11/2017.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    jobdetailsFromConfig=require('../fromConfig/jobdetails.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(jobdetailsFromConfig);
var jobdetailsSchema = new mongoose.Schema(
    schemaObject,{collection: "jobDetails"});

module.exports =mongoose.model('jobDetails',jobdetailsSchema);