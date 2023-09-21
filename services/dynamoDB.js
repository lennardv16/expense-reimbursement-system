const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: 'us-east-1',
});
