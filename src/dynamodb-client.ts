import AWS from 'aws-sdk';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: number;
}

export class DynamoDBService {
  private dynamodb: AWS.DynamoDB.DocumentClient;
  private tableName: string;

  constructor(tableName: string, region: string = 'us-east-1') {
    // Different pattern: using DocumentClient
    import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
    import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

    constructor(tableName: string, region: string = 'us-east-1') {
      // Updated pattern: using DynamoDBDocumentClient from @aws-sdk/lib-dynamodb
      const client = new DynamoDBClient({ region });
      this.dynamodb = DynamoDBDocumentClient.from(client);
      this.tableName = tableName;
    }
    this.tableName = tableName;
  import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
  import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

  async getUser(id: string): Promise<User | null> {
    // Initialize DynamoDB client and document client
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);

    // Create GetCommand with table name and key
    const command = new GetCommand({
      import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
      import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

      async putUser(user: User): Promise<void> {
        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);

        const command = new PutCommand({
          TableName: this.tableName,
          import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
          import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

          async deleteUser(id: string): Promise<void> {
            const client = new DynamoDBClient({});
            const docClient = DynamoDBDocumentClient.from(client);

            // Create a DeleteCommand with the necessary parameters
            const command = new DeleteCommand({
              TableName: this.tableName,
              Key: { id },
            });

            // Send the command using the document client
            await docClient.send(command);
          }
        });

        // Send the command using the new DynamoDBDocumentClient
        await docClient.send(command);
      }
      Key: { id },
    });

    // Send command and await response
    const response = await docClient.send(command);

    // Return the item or null if not found
    return response.Item as User || null;
  }

  async getUser(id: string): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    const result = await this.dynamodb.get(params).promise();
    return result.Item as User || null;
  }

  async putUser(user: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: user,
    };

    await this.dynamodb.put(params).promise();
  }

  async deleteUser(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    await this.dynamodb.delete(params).promise();
  }
}
