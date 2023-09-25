const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const db = new AWS.DynamoDB.DocumentClient();

const createUser = async (user) => {
  const params = {
    TableName: 'Users',
    Item: user,
  };
  return await db.put(params).promise();
};

const getUsers = async () => {
  const params = {
    TableName: 'Users',
  };
  return await db.scan(params).promise();
};

const getUser = async (username) => {
  const params = {
    TableName: 'Users',
    Key: {
      username,
    },
  };
  return await db.get(params).promise();
};

const updateUser = async (user) => {
  const params = {
    TableName: 'Users',
    Key: {
      username: user.username,
    },
    UpdateExpression: 'set role = :role',
    ExpressionAttributeValues: {
      ':role': user.role || 'manager',
    },
    ReturnValues: 'ALL_NEW',
  };
  const res = await db.update(params).promise();
  console.log(res);
  return res;
  // return await db.update(params).promise();
};

const deleteUser = async (username) => {
  const params = {
    TableName: 'Users',
    Key: {
      username,
    },
  };
  return await db.delete(params).promise();
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
