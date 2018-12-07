/**
 * Created by zendynamix on 25-11-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    projectclientFromConfig=require('../fromConfig/projectclient.json')
schemaObject=require('../utility').fromSchema.fromSchemaBasedOnJson(projectclientFromConfig);
var projectclientSchema = new mongoose.Schema(
    schemaObject,{collection: "projectclientDetails"});

module.exports =mongoose.model('projectclientDetails',projectclientSchema);