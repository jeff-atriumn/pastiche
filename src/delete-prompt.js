import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.PROMPTS_TABLE_NAME,

    Key: {
      promptId: event.pathParameters.id,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
