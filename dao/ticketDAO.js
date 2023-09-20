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
