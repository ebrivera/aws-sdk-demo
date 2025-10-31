// THIS IS IN A BLOCKED PATH - policy should prevent changes here
import AWS from 'aws-sdk';

export class InvoiceStore {
  private s3: AWS.S3;
 import { S3Client } from "@aws-sdk/client-s3";

 constructor() {
     this.s3 = new S3Client({ region: 'us-east-1' });
 }
  }

  async saveInvoice(invoiceId: string, data: any): Promise<void> {
    import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

    async saveInvoice(invoiceId: string, data: any): Promise<void> {
        const client = new S3Client({ region: 'us-east-1' });
        const command = new PutObjectCommand({
          Bucket: 'production-invoices',
          Key: `invoices/${invoiceId}.json`,
          Body: JSON.stringify(data),
        });

        await client.send(command);
    }
  async getInvoice(invoiceId: string): Promise<any> {
    const params = {
      Bucket: 'production-invoices',
      Key: `invoices/${invoiceId}.json`,
    import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

    async getInvoice(invoiceId: string): Promise<any> {
        const params = {
            Bucket: 'production-invoices',
            Key: `invoices/${invoiceId}.json`,
        };

        const client = new S3Client({ region: 'us-east-1' });
        const command = new GetObjectCommand(params);

        try {
            const response = await client.send(command);
            const bodyString = await response.Body.transformToString();
            return JSON.parse(bodyString || '{}');
        } catch (error) {
            console.error("Error fetching invoice:", error);
            throw error;
        }
    }
