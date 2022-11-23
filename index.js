//update lambda
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
console.log('Loading function');

exports.handler = function(event, context,callback) {
  console.log(JSON.stringify(event, null, 2));
  console.log('endtoendid %j', event.endtoendid);
  console.log('gcpid %j', event.item);
  console.log('status %j', event.showstatus);
  console.log('clientref %j', event.clientref);
  console.log('remittanceinfo %j', event.remittanceInfo);
  console.log('amount %j', event.amt);
  console.log('bifastid %j', event.bifastid);
  console.log('transactionid %j', event.transactionid);
  console.log('key id %j', event.id_key);
  console.log('key user %j',event.id_user);
  
  if(event.remittanceInfo)
  {
      var params = {
      TableName: "sam-app2-TasksTable-MJZZ6ROSJM0A",
      Key: { 
       "id" : event.id_key,
       "user" : event.id_user
      },
        UpdateExpression: "set endtoendID = :x, gcpID = :y, statuschange = :a, remittanceInfo = :b, clientref = :c, amt = :d",
        
        ExpressionAttributeValues: {
            ":x": event.endtoendid,
            ":y": event.item,
            ":a": event.showstatus,
            ":b": event.clientref,
            ":c": event.remittanceInfo,
            ":d": event.amt
        },
     };

	
	var documentClient = new AWS.DynamoDB.DocumentClient();
	
    documentClient.update(params, function(err, data) {
   if (err) console.log(err);
   else console.log("Executed gcp successfully: %j",data);
    });
}
else {
     var params = {
      TableName: "sam-app2-TasksTable-MJZZ6ROSJM0A",
      Key: { 
       "id" : event.id_key,
       "user" : event.id_user
      },
        UpdateExpression: "set endtoendID = :x, gcpID = :y, statuschange = :a, transactionid = :b, bifastid = :c, amt = :d",
        
        ExpressionAttributeValues: {
            ":x": event.endtoendid,
            ":y": event.item,
            ":a": event.showstatus,
            ":b": event.bifastid,
            ":c": event.transactionid,
            ":d": event.amt
        },
     };

	
	var documentClient = new AWS.DynamoDB.DocumentClient();
	
    documentClient.update(params, function(err, data) {
   if (err) console.log(err);
   else console.log("Executed bifast successfully: %j",data);
    });
}
   callback(null, "message");
};
