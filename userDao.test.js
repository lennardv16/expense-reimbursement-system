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
  const id = uuid.v4();
  const cmd = new PutCommand({
    TableName: 'Users',
    Item: {
      user_id: id,
      username,
      password,
      role: 'employee', // Default role
    },
  });

  try {
    const res = await client.send(cmd);
    return res.Item;
  } catch (err) {
    console.error('User cannot be created', err);
    throw new Error('User creation failed');

  }
  return DynamoDBDocumentClient.scan(params).promise();
};

const getUsers = async () => {
  const cmd = new ScanCommand({
    TableName: 'Users',
  });

  try {
    const res = await client.send(cmd);
  } catch (err) {
    console.error('Error getting users:', err);
    throw new Error('Failed to get users');
  }
};

const getUser = async (username) => {
  const cmd = new GetCommand({
    TableName: 'Users',
    Key: {
      username,
    },
  });

  try {
    const res = await client.send(cmd);
    return res.Item;
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('User retrieval failed');
  }
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
  getUser,
  updateUser,
  deleteUser,
};
