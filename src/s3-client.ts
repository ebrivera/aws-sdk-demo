import AWS from 'aws-sdk';

export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;
 import { S3Client } from "@aws-sdk/client-s3";

 constructor(bucketName: string, region: string = 'us-east-1') {
     this.s3 = new S3Client({ region });
     this.bucketName = bucketName;
 }
  }

  async uploadFile(key: string, body: Buffer): Promise<string> {
    import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

    async uploadFile(key: string, body: Buffer): Promise<string> {
        const client = new S3Client({ region: this.s3.config.region });

        const command = new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: body,
        });

        await client.send(command);
        return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    }
  async downloadFile(key: string): Promise<Buffer> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };
 import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

 async downloadFile(key: string): Promise<Buffer> {
     const client = new S3Client({ region: this.s3.config.region });

     const command = new GetObjectCommand({
         Bucket: this.bucketName,
         Key: key,
     });

     const response = await client.send(command);
     const chunks: Uint8Array[] = [];
     for await (const chunk of response.Body) {
         chunks.push(chunk);
     }
     return Buffer.concat(chunks);
 }
    };

    await this.s3.deleteObject(params).promise();
  }

  async listFiles(prefix?: string): Promise<string[]> {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: this.bucketName,
      Prefix: prefix,
    import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

    async deleteFile(key: string): Promise<void> {
        const client = new S3Client({ region: this.s3.config.region });

        const command = new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        });

        await client.send(command);
    }
async listFiles(prefix?: string): Promise<string[]> {
    const client = new S3Client({ region: this.s3.config.region });

    const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: prefix,
    });

    try {
        const result = await client.send(command);
        return result.Contents?.map(item => item.Key || '') || [];
    } catch (error) {
        console.error("Error listing files:", error);
        throw error;
    }
}
