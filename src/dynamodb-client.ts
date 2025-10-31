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
     this.dynamodb = DynamoDBDocumentClient.from(new DynamoDBClient({ region }));
     this.tableName = tableName;
 }
  async getUser(id: string): Promise<User | null> {
      const params = {
        TableName: this.tableName,
        Key: { id },
      };

      const command = new GetCommand(params);
      const result = await this.dynamodb.send(command);
      return result.Item as User || null;
  }
    return result.Item as User || null;
  }
 async putUser(user: User): Promise<void> {
     const params = {
       TableName: this.tableName,
       Item: AWS.DynamoDB.Converter.marshall(user),
     };

     const command = new PutItemCommand(params);
     await this.dynamodb.send(command);
 }
  }

  async deleteUser(id: string): Promise<void> {
      const params = {
        TableName: this.tableName,
        Key: { id: { S: id } },
      };

      const command = new DeleteItemCommand(params);
      await this.dynamodb.send(command);
  }
}
