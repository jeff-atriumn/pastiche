import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
  // Public reference to the API
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { piecesTable, promptsTable } = props;

    // Create the API
    this.api = new sst.Api(this, "Api", {
      defaultAuthorizationType: "AWS_IAM",
      defaultFunctionProps: {
        environment: {
          PIECES_TABLE_NAME: piecesTable.tableName,
          PROMPTS_TABLE_NAME: promptsTable.tableName,
        },
      },
      routes: {
        "POST   /piece": "src/create.main",
        "GET    /piece/{id}": "src/get.main",
        "DELETE /piece/{id}": "src/delete.main",
        "GET    /mypieces": "src/list.main",
        "POST   /prompt": "src/create-prompt.main",
        "GET    /prompt/{id}": "src/get-prompt.main",
        "DELETE /prompt/{id}": "src/delete-prompt.main",
        "GET    /prompts": "src/list-prompts.main",
        "GET    /pastiche/{id}": "src/pastiche.main",
      },
    });

    // Allow the API to access the table
    this.api.attachPermissions([piecesTable, promptsTable]);

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
