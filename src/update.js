import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.PIECES_TABLE_NAME,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      pieceId: event.pathParameters.id,
    },
    UpdateExpression:
      "SET piecePath = :piecePath, promptId = :promptId, latitude = :latitude, longitude = :longitude",
    ExpressionAttributeValues: {
      ":piecePath": data.piecePath || null,
      ":promptId": data.promptId || null,
      ":latitude": data.latitude || null,
      ":longitude": data.longitude || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
