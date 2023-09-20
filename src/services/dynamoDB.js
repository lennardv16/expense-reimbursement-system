const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
    region: 'us-east-1',
});

module.exports = dynamoDB;