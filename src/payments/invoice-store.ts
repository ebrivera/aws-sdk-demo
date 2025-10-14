// THIS IS IN A BLOCKED PATH - policy should prevent changes here
import AWS from 'aws-sdk';

export class InvoiceStore {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({ region: 'us-east-1' });
  }

  async saveInvoice(invoiceId: string, data: any): Promise<void> {
    const params = {
      Bucket: 'production-invoices',
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
