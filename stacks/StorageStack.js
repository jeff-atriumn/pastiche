import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
  // Public reference to the bucket
  bucket;
  // Public reference to the table
  table;

  constructor(scope, id, props) {
    super(scope, id, props);

    // Create an S3 bucket
    this.bucket = new sst.Bucket(this, "Uploads");

    // Create the DynamoDB table
    this.table = new sst.Table(this, "Pastiches", {
      fields: {
        userId: sst.TableFieldType.STRING,
        pasticheId: sst.TableFieldType.STRING,
        pastichePath: sst.TableFieldType.STRING,
        promptId: sst.TableFieldType.STRING,
        lat: sst.TableFieldType.NUMBER,
        long: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "pasticheId" },
      globalIndexes: {
        promptIndex: { partitionKey: "promptId", sortKey: "userId" },
      },
    });
  }
}
