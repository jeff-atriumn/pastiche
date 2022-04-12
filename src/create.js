import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      pasticheId: uuid.v1(), // A unique uuid
      pastichePath: data.pastichePath,
      promptId: data.promptId,
      latitude: data.latitude,
      longitude: data.longitude,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
