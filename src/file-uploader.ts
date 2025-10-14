import { S3Service } from './s3-client';

export class FileUploader {
  private s3Service: S3Service;

  constructor(bucketName: string) {
    this.s3Service = new S3Service(bucketName);
  }

  async uploadDocument(fileName: string, content: string): Promise<string> {
    const buffer = Buffer.from(content, 'utf-8');
    const key = `documents/${Date.now()}-${fileName}`;
    return await this.s3Service.uploadFile(key, buffer);
  }

  async getDocument(key: string): Promise<string> {
    const buffer = await this.s3Service.downloadFile(key);
    return buffer.toString('utf-8');
  }

  async deleteDocument(key: string): Promise<void> {
    await this.s3Service.deleteFile(key);
  }
}
