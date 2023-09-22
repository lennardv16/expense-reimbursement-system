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

const createUser = async (user) => {
  const cmd = new PutCommand({
    TableName: users,
    Item: username,
    ConditionExpression: 'attribute_not_exists(username)',
  });

  const res = await client.send(cmd);
};

const getUsers = async () => {
  const cmd = new ScanCommand({
    TableName: users,
  });

  const res = await client.send(cmd);
};

const getUser = async (username) => {
  const cmd = new GetCommand({
    TableName: users,
    Key: {
      username,
    },
  });

  const res = await client.send(cmd);
};

const updateUser = async (user_id, username, password, role) => {
  const params = {
    TableName: 'users',
    Key: {
      user_id: user_id,
    },
    UpdateExpression:
      'SET username = :username, password = :password, role = :role',
    ExpressionAttributeValues: {
      ':username': username,
      ':password': password,
      ':role': role,
    },
    ReturnValues: 'ALL_NEW',
  };

  const updatedUser = await ddb.update(params).promise();
  return updatedUser.Attributes;
};

const deleteUser = async () => {
  const cmd = new DeleteCommand({
    TableName: 'users',
    Item: {
      username,
    },
  });

  const res = await client.send(cmd);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
