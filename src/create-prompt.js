import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.PROMPTS_TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      promptId: uuid.v1(), // A unique uuid
      promptPath: data.promptPath,
      active: data.active,
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
