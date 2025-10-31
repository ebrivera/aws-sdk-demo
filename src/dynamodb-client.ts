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
 import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
 import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

 constructor(tableName: string, region: string = 'us-east-1') {
     const client = new DynamoDBClient({ region });
     this.dynamodb = DynamoDBDocumentClient.from(client);
     this.tableName = tableName;
 }
  }

  async getUser(id: string): Promise<User | null> {
    const params = {
      import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
      import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

      async getUser(id: string): Promise<User | null> {
          const client = new DynamoDBClient({ region: 'us-east-1' });
          const docClient = DynamoDBDocumentClient.from(client);

          const command = new GetCommand({
              TableName: this.tableName,
              Key: { id }
          });

          try {
              const result = await docClient.send(command);
              return result.Item as User || null;
          } catch (error) {
              console.error("Error retrieving user:", error);
              throw error;
          }
      }
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
    import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
    import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

    async putUser(user: User): Promise<void> {
        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);

        const command = new PutCommand({
            TableName: this.tableName,
            Item: user,
        });

        await docClient.send(command);
    }
async deleteUser(id: string): Promise<void> {
    const client = new DynamoDBClient({ region: 'us-east-1' });
    const docClient = DynamoDBDocumentClient.from(client);

    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id }
    });

    await docClient.send(command);
}
