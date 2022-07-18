import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
  // Public reference to the bucket
  bucket;
  // Public reference to the table
  piecesTable;
  promptsTable;

  constructor(scope, id, props) {
    super(scope, id, props);

    // Create an S3 bucket
    this.bucket = new sst.Bucket(this, "Uploads");

    // Create the DynamoDB table
    this.piecesTable = new sst.Table(this, "Pieces", {
      fields: {
        userId: sst.TableFieldType.STRING,
        pieceId: sst.TableFieldType.STRING,
        piecePath: sst.TableFieldType.STRING,
        promptId: sst.TableFieldType.STRING,
        lat: sst.TableFieldType.NUMBER,
        long: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: "pieceId", sortKey: "userId" },
      globalIndexes: {
        pieceIndex: { partitionKey: "pieceId" },
        userIndex: { partitionKey: "userId" },
        promptIndex: { partitionKey: "promptId" },
      },
    });

    this.promptsTable = new sst.Table(this, "Prompts", {
      fields: {
        promptId: sst.TableFieldType.STRING,
        promptName: sst.TableFieldType.STRING,
        promptPath: sst.TableFieldType.STRING,
        active: sst.TableFieldType.NUMBER,
        userId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "promptId", sortKey: "userId" },
      globalIndexes: {
        promptIndex: { partitionKey: "promptId" },
        activeIndex: { partitionKey: "active" },
      },
    });
  }
}
