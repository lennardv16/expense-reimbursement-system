const uuid = require('uuid');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const ddb = new DynamoDBClient({ region: 'us-east-1' });
const client = DynamoDBDocumentClient.from(ddb);

function updateTix() {
  const params = {
    TableName: 'users',
    Key: {
      user_id,
    },
    UpdateExpression: 'set #n = :value',
    ExpressionAttributeNames: {
      '#n': 'name',
    },
    ExpressionAttributeValues: {
      ':value': newName,
    },
  };
  return DocumentClient.update(params).promise();
}
