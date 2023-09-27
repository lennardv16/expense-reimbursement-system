const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const db = new AWS.DynamoDB.DocumentClient();

const createTicket = async (ticket) => {
  const params = {
    TableName: 'Tickets',
    Item: ticket,
  };
  return await db.put(params).promise();
};

const getTickets = async () => {
  const params = {
    TableName: 'Tickets',
  };
  return await db.scan(params).promise();
};

const getPendingTickets = async () => {
  const params = {
    TableName: 'Tickets',
    FilterExpression: '#s = :status',
    ExpressionAttributeNames: {
      '#s': 'status',
    },
    ExpressionAttributeValues: {
      ':status': 'Pending',
    },
  };
  return await db.scan(params).promise();
};

const getUserTickets = async (username) => {
  const params = {
    TableName: 'Tickets',
    FilterExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': username,
    },
  };
  return await db.scan(params).promise();
};

const getTicketById = async (ticketId) => {
  const params = {
    TableName: 'Tickets',
    Key: {
      ticketId,
    },
  };
  return await db.get(params).promise();
};

const approveTicket = async (ticketId) => {
  const params = {
    TableName: 'Tickets',
    Key: {
      ticketId,
    },
    ConditionExpression: '#s = :p',
    UpdateExpression: 'SET #s = :a',
    ExpressionAttributeNames: {
      '#s': 'status',
    },
    ExpressionAttributeValues: {
      ':a': 'Approved',
      ':p': 'Pending',
    },
    ReturnValues: 'ALL_NEW',
  };
  return await db.update(params).promise();
};

const denyTicket = async (ticketId) => {
  const params = {
    TableName: 'Tickets',
    Key: {
      ticketId,
    },
    ConditionExpression: '#s = :p',
    UpdateExpression: 'SET #s = :d',
    ExpressionAttributeNames: {
      '#s': 'status',
    },
    ExpressionAttributeValues: {
      ':d': 'Denied',
      ':p': 'Pending',
    },
    ReturnValues: 'ALL_NEW',
  };
  return await db.update(params).promise();
};

const deleteTicket = async (ticketId) => {
  const params = {
    TableName: 'Tickets',
    Key: {
      ticketId,
    },
  };
  return await db.delete(params).promise();
};

module.exports = {
  createTicket,
  getTickets,
  getPendingTickets,
  getUserTickets,
  getTicketById,
  approveTicket,
  denyTicket,
  deleteTicket,
};
