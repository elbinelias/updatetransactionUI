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
  
  
  var params = {
  TableName: "sam-app-TasksTable-1XBYUVN0OLZ40",
  Key: { 
   "id" : event.item,
   "user" : 'user#johndoe'
  },
  UpdateExpression: "set endtoendID = :x, gcpID = :y, statuschange = :a, remittanceInfo = :b, clientref = :c, amt = :d",

        ExpressionAttributeValues: {
            ":x": event.endtoendid,
            ":y": event.item,
            ":a": event.showstatus,
            ":b": event.clientref,
            ":c": event.remittanceInfo,
            ":d": event.amt
        }
 };

	
	var documentClient = new AWS.DynamoDB.DocumentClient();
	
	documentClient.update(params, function(err, data) {
   if (err) console.log(err);
   else console.log(data);
});
   callback(null, "message");
};