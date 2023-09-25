const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const db = new DynamoDBClient({ region: 'us-east-1' });
const client = DynamoDBDocumentClient.from(db);

const createUser = async (user) => {
  const cmd = new PutCommand({
    TableName: 'Users',
    Item: {
      username,
      password,
    },
  });

  const res = await client.send(cmd);
  console.log(res);
  return res;
  // return await client.send(cmd);
};

const getUsers = async () => {
  const cmd = new ScanCommand({
    TableName: 'Users',
  });

  const res = await client.send(cmd);
  console.log(res);
  return res;
  // return await client.send(cmd);
};

const getUser = async () => {
  const cmd = new GetCommand({
    TableName: 'Users',
    Key: {
      username,
    },
  });

  const res = await client.send(cmd);
  console.log(res);
  return res;
};

const updateUser = async (username) => {
  const cmd = new UpdateCommand({
    TableName: 'Users',
    Key: {
      username,
    },
    UpdateExpression: 'set role = :role',
    ExpressionAttributeValues: {
      ':role': 'manager', // Set role to manager
    },
    ReturnValues: 'ALL_NEW',
  });

  const res = await client.send(cmd);
  console.log(res);
  return res;
};

const deleteUser = async (username) => {
  const cmd = new DeleteCommand({
    TableName: 'Users',
    Item: {
      username,
    },
  });

  const res = await client.send(cmd);
  console.log(res);
  return res;
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
