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

const createUser = async () => {
  const cmd = new PutCommand({
    TableName: 'Users',
    Item: {
      username,
    },
  });

  try {
    const res = await client.send(cmd);
    return res;
  } catch (err) {
    console.error('User cannot be created', err);
    throw new Error('User creation failed');
  }
};

const getUsers = async () => {
  const cmd = new ScanCommand({
    TableName: 'Users',
    Item: {
      username,
    },
  });

  const res = await client.send(cmd);
  return res.Item;
};

const getByUsername = async (username) => {
  const cmd = new GetCommand({
    TableName: 'Users',
    Key: {
      username,
    },
  });

  const res = await client.send(cmd);
  return res.Item;
};

const updateUser = async (user_id, username, password, role) => {
  const cmd = new UpdateCommand({
    TableName: 'Users',
    Key: {
      user_id: user_id,
    },
    UpdateExpression: 'SET username = :username, password = :password, role = :role',
    ExpressionAttributeValues: {
      ':username': username,
      ':password': password,
      ':role': role,
    },
    ReturnValues: 'ALL_NEW',
  });

  const updatedUser = await ddb.update(params).promise();
  return updatedUser.Attributes;
};

const deleteUser = async () => {
  const cmd = new DeleteCommand({
    TableName: 'Users',
    Item: {
      username,
    },
  });

  const res = await client.send(cmd);
};

module.exports = {
  createUser,
  getUsers,
  getByUsername,
  updateUser,
  deleteUser,
};
