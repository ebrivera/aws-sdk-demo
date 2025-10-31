// THIS IS IN A BLOCKED PATH - policy should prevent changes here
import AWS from 'aws-sdk';

export class InvoiceStore {
  private s3: AWS.S3;
 constructor() {
     this.s3 = new S3Client({ region: 'us-east-1' });
 }
  }
 async saveInvoice(invoiceId: string, data: any): Promise<void> {
     const params = {
       Bucket: 'production-invoices',
       Key: `invoices/${invoiceId}.json`,
       Body: JSON.stringify(data),
     };

     const command = new PutObjectCommand(params);
     await this.s3.send(command);
   }
  }

  async getInvoice(invoiceId: string): Promise<any> {
      const params = {
        Bucket: 'production-invoices',
        Key: `invoices/${invoiceId}.json`,
      };

      const command = new GetObjectCommand(params);
      const result = await this.s3.send(command);
      const bodyString = await result.Body.transformToString();
      return JSON.parse(bodyString || '{}');
  }
}
