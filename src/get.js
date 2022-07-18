import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.PIECES_TABLE_NAME,
    IndexName: "pieceIndex",
    KeyConditionExpression: "pieceId = :pieceId",
    ExpressionAttributeValues: {
      ":pieceId": event.pathParameters.id,
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});
