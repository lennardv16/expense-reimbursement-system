const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: 'us-east-1',
});

// Function to register a new user
function registerUser(user_id, username, password) {
  const params = {
    TableName: 'users',
    Item: {
      user_id,
      username,
      password,
    },
  };
  return docClient.put(params).promise();
}
// async function registerUser(username, password) {
//   // Check if the username is already registered
//   const existingUser = await getUserByUsername(username);

//   if (existingUser) {
//     throw new Error('Username already registered');
//   }

//   // Hash the password before storing it
//   const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

//   // Create a new user in DynamoDB with default employee role
//   const params = {
//     TableName: tableName,
//     Item: {
//       username,
//       password: hashedPassword,
//       role: 'employee', // Default role
//     },
//   };

//   try {
//     await dynamoDB.put(params).promise();
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error;
//   }
// }

// // Function to get user data by username
// async function getUserByUsername(username) {
//   const params = {
//     TableName: tableName,
//     Key: {
//       username,
//     },
//   };

//   try {
//     const result = await dynamoDB.get(params).promise();
//     return result.Item;
//   } catch (error) {
//     console.error('Error fetching user by username:', error);
//     throw error;
//   }
// }

module.exports = { registerUser };
