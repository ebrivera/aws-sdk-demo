import AWS from 'aws-sdk';

export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(bucketName: string, region: string = 'us-east-1') {
    this.s3 = new AWS.S3({ region });
    this.bucketName = bucketName;
  }

  async uploadFile(key: string, body: Buffer): Promise<string> {
    const params = {
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
