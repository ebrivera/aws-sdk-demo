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
     const client = new DynamoDBClient({ region });
     this.dynamodb = DynamoDBDocumentClient.from(client);
     this.tableName = tableName;
 }
  }
 async getUser(id: string): Promise<User | null> {
     const params = {
       TableName: this.tableName,
       Key: { id: { S: id } },
     };

     const command = new GetItemCommand(params);
     const result = await this.dynamodb.send(command);
     return result.Item ? AWS.DynamoDB.Converter.unmarshall(result.Item) as User : null;
 }
  }

  async putUser(user: User): Promise<void> {
      const params = {
        TableName: this.tableName,
        Item: AWS.DynamoDB.Converter.marshall(user),
      };

      const command = new PutItemCommand(params);
      await this.dynamodb.send(command);
  }

  async deleteUser(id: string): Promise<void> {
    async deleteUser(id: string): Promise<void> {
        const command = new DeleteCommand({
          TableName: this.tableName,
          Key: { id: { S: id } },
        });

        await this.dynamodb.send(command);
    }
