import AWS from 'aws-sdk';

export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;
 constructor(bucketName: string, region: string = 'us-east-1') {
     this.s3 = new S3Client({ region });
     this.bucketName = bucketName;
   }
  }
 async uploadFile(key: string, body: Buffer): Promise<string> {
     const command = new PutObjectCommand({
       Bucket: this.bucketName,
       Key: key,
       Body: body,
     });

     await this.s3.send(command);
     return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
   }
  }
 async downloadFile(key: string): Promise<Buffer> {
     const command = new GetObjectCommand({
       Bucket: this.bucketName,
       Key: key,
     });

     const response = await this.s3.send(command);
     const bodyBuffer = await response.Body.transformToByteArray();
     return Buffer.from(bodyBuffer);
 }
  }

  async deleteFile(key: string): Promise<void> {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3.send(command);
    }

  async listFiles(prefix?: string): Promise<string[]> {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: prefix,
      });

      const result = await this.s3.send(command);
      return result.Contents?.map(item => item.Key || '') || [];
  }
}
