import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.PROMPTS_TABLE_NAME,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      promptId: event.pathParameters.id,
    },
    UpdateExpression:
      "SET promptPath = :promptPath, promptName = :promptName, active = :active",
    ExpressionAttributeValues: {
      ":promptPath": data.promptPath || null,
      ":promptName": data.promptName || null,
      ":active": data.active || null,
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
