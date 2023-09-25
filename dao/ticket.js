const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const db = new AWS.DynamoDB.DocumentClient();

const createTicket = async () => {
  const params = {
    TableName: 'Tickets',
    Item: {
      amount,
      description,
      status: 'pending', // Default status
    },
  };
  return await db.put(params).promise();
};
