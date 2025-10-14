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
    this.dynamodb = new AWS.DynamoDB.DocumentClient({ region });
    this.tableName = tableName;
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
