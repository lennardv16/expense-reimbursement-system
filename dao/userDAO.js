const ddb = require('./dynamoDB');

// Function to register a new user
const registerUser = async (user_id, username, password, role) => {
  const params = {
    TableName: 'users',
    Item: {
      username: username,
      password: password,
      role: 'employee', // Default role
    },
    ConditionExpression: 'attribute_not_exists(username)',
  };

  await ddb.put(params).promise();
  return params.Item;
};

const userLogin = async (req, res) => {};

const getUser = async (username) => {
  const params = {
    TableName: 'users',
    Key: {
      username: username,
    },
  };

  const user = await ddb.get(params).promise();
  return user.Item;
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

const deleteUser = async (user_id) => {
  const params = {
    TableName: 'users',
    Key: {
      user_id: user_id,
    },
  };

  await dynamoDB.delete(params).promise();
};

module.exports = {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
};
