// THIS IS IN A BLOCKED PATH - policy should prevent changes here
import AWS from 'aws-sdk';

export class InvoiceStore {
  private s3: AWS.S3;

  constructor() {
    import { S3Client } from "@aws-sdk/client-s3";

    constructor() {
      // Initialize the S3 client with the specified region using the new AWS SDK v3 pattern
      this.s3 = new S3Client({ region: 'us-east-1' });
    }
  }

  async saveInvoice(invoiceId: string, data: any): Promise<void> {
    const params = {
      import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

      async saveInvoice(invoiceId: string, data: any): Promise<void> {
        const params = {
          Bucket: 'production-invoices',
          Key: `invoices/${invoiceId}.json`,
          Body: JSON.stringify(data),
        };

        import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

        async getInvoice(invoiceId: string): Promise<any> {
          const params = {
            Bucket: 'production-invoices',
            Key: `invoices/${invoiceId}.json`,
          };

          // Create a new S3 client
          const client = new S3Client({});

          // Create a command using the new GetObjectCommand
          const command = new GetObjectCommand(params);

          // Send the command and await the response
          const response = await client.send(command);

          // Transform the response body to a string
          const bodyString = await response.Body.transformToString();

          return JSON.parse(bodyString || '{}');
        }
        const client = new S3Client({});

        // Create a PutObjectCommand with the parameters
        const command = new PutObjectCommand(params);

        // Send the command using the client
        await client.send(command);
      }
      Key: `invoices/${invoiceId}.json`,
      Body: JSON.stringify(data),
    };

    await this.s3.putObject(params).promise();
  }

  async getInvoice(invoiceId: string): Promise<any> {
    const params = {
      Bucket: 'production-invoices',
      Key: `invoices/${invoiceId}.json`,
    };

    const result = await this.s3.getObject(params).promise();
    return JSON.parse(result.Body?.toString() || '{}');
  }
}
