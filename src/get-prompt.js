import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.PROMPTS_TABLE_NAME,
    IndexName: "promptIndex",
    KeyConditionExpression: "promptId = :promptId",
    ExpressionAttributeValues: {
      ":promptId": event.pathParameters.id,
    },
  };

  const result = await dynamoDb.query(params);
  // if (!result.Item) {
  //   throw new Error("Item not found.");
  // }

  return result.Items;
});
