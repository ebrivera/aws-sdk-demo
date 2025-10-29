import AWS from 'aws-sdk';

export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(bucketName: string, region: string = 'us-east-1') {
    import { S3Client } from "@aws-sdk/client-s3";

    constructor(bucketName: string, region: string = 'us-east-1') {
      // Initialize the S3 client using the new AWS SDK v3 pattern
      this.s3 = new S3Client({ region });
      this.bucketName = bucketName;
    }
    this.bucketName = bucketName;
  }

  async uploadFile(key: string, body: Buffer): Promise<string> {
    import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

    async uploadFile(key: string, body: Buffer): Promise<string> {
      const params = {
        Bucket: this.bucketName,
        Key: key,
        Body: body,
      };

      // Create a new S3 client instance
      import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

      async downloadFile(key: string): Promise<Buffer> {
        const params = {
          Bucket: this.bucketName,
          Key: key,
        };

        // Create a new S3 client instance
        const client = new S3Client({});
 import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

 async deleteFile(key: string): Promise<void> {
   const params = {
     Bucket: this.bucketName,
     Key: key,
   };

   // Create a new S3 client instance
   import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

   async listFiles(prefix?: string): Promise<string[]> {
     const client = new S3Client({});
  
     const command = new ListObjectsV2Command({
       Bucket: this.bucketName,
       Prefix: prefix,
     });

     // Send the command using the new client and command pattern
     const response = await client.send(command);
  
     // Map the response contents to extract object keys
     return response.Contents?.map(item => item.Key || '') || [];
   }
  
   // Create a DeleteObjectCommand with the specified parameters
   const command = new DeleteObjectCommand(params);

   // Send the command using the client
   await client.send(command);
 }
        // Create a GetObjectCommand with the specified parameters
        const command = new GetObjectCommand(params);

        // Send the command using the client and await the response
        const response = await client.send(command);

        // Convert the response body to a buffer
        const bodyBuffer = await response.Body.transformToByteArray();
        return Buffer.from(bodyBuffer);
      }

      // Create a PutObjectCommand with the parameters
      const command = new PutObjectCommand(params);

      // Send the command using the client
      const result = await client.send(command);

      return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    }
      Bucket: this.bucketName,
      Key: key,
      Body: body,
    };

    const result = await this.s3.putObject(params).promise();
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  async downloadFile(key: string): Promise<Buffer> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    const result = await this.s3.getObject(params).promise();
    return result.Body as Buffer;
  }

  async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }

  async listFiles(prefix?: string): Promise<string[]> {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: this.bucketName,
      Prefix: prefix,
    };

    const result = await this.s3.listObjectsV2(params).promise();
    return result.Contents?.map(item => item.Key || '') || [];
  }
}
