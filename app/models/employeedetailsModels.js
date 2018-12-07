/**
 * Created by zendynamix on 25-11-2016.
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    employeeFromConfig=require('../fromConfig/employeedetails.json')
schemaObject=require('../utility').employeeschema.employeeSchemaBasedOnJson(employeeFromConfig);
console.log(schemaObject)
var employeeSchema = new mongoose.Schema(
    schemaObject,{collection: "employeeDetails"});

module.exports =mongoose.model('employeeDetails',employeeSchema);