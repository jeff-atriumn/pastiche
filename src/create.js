import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.PIECES_TABLE_NAME,
    Item: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      pieceId: uuid.v1(),
      piecePath: data.piecePath,
      promptId: data.promptId,
      latitude: data.latitude,
      longitude: data.longitude,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
