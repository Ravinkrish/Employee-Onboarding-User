function  employeeSchemaBasedOnJson(jsonConfig){
    var schemaFields=Object.keys(jsonConfig)

    var schemaObject={};
    for(var j=0;j<schemaFields.length;j++){
 if(schemaFields[j]!=="Skillsdata"||schemaFields[j]!=="Qalificationdata"||schemaFields[j]!=="Certificationdata"||schemaFields[j]!=="Languagedata"||schemaFields[j]!=="Dependentdata"||schemaFields[j]!=="Emergencycontactdata"||schemaFields[j]!=="Documentdata")
       {
        schemaObject[schemaFields[j]]=jsonConfig[schemaFields[j]].type
       }
        if(schemaFields[j]=="Skillsdata"||schemaFields[j]=="Qalificationdata"||schemaFields[j]=="Certificationdata"||schemaFields[j]=="Languagedata"||schemaFields[j]=="Dependentdata"||schemaFields[j]=="Emergencycontactdata"||schemaFields[j]=="Documentdata")
        {
        console.log(schemaFields[j])
        var s=schemaFields[j];

        var skilldatas=jsonConfig[s];
        console.log(skilldatas)
        schemaObject[schemaFields[j]]=[];
           var obj = {};
       for(var i=0;i<skilldatas.length;i++)
        {
for(key in skilldatas[i])
{
obj[key]=skilldatas[i][key].type;
}
schemaObject[schemaFields[j]].push(obj);
}
console.log(schemaObject[schemaFields[j]]);
    }
    }
    console.log(schemaObject);
    return schemaObject;
}


module.exports ={
    employeeSchemaBasedOnJson:employeeSchemaBasedOnJson
}


