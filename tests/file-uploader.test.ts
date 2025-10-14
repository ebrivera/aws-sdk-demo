import { FileUploader } from '../src/file-uploader';
import { S3Service } from '../src/s3-client';

jest.mock('../src/s3-client');

describe('FileUploader', () => {
  let uploader: FileUploader;
  let mockS3Service: jest.Mocked<S3Service>;

  beforeEach(() => {
    uploader = new FileUploader('test-bucket');
    mockS3Service = (uploader as any).s3Service;
  });

  describe('uploadDocument', () => {
    it('should upload document with timestamp prefix', async () => {
      const mockUrl = 'https://test-bucket.s3.amazonaws.com/documents/123-test.txt';
      mockS3Service.uploadFile.mockResolvedValueOnce(mockUrl);

      const result = await uploader.uploadDocument('test.txt', 'Hello World');

      expect(result).toBe(mockUrl);
      expect(mockS3Service.uploadFile).toHaveBeenCalled();
      
      const callArgs = mockS3Service.uploadFile.mock.calls[0];
      expect(callArgs[0]).toMatch(/^documents\/\d+-test\.txt$/);
      expect(callArgs[1].toString()).toBe('Hello World');
    });
  });

  describe('getDocument', () => {
    it('should download and convert buffer to string', async () => {
      const mockBuffer = Buffer.from('File content');
      mockS3Service.downloadFile.mockResolvedValueOnce(mockBuffer);

      const result = await uploader.getDocument('documents/test.txt');

      expect(result).toBe('File content');
      expect(mockS3Service.downloadFile).toHaveBeenCalledWith('documents/test.txt');
    });
  });

  describe('deleteDocument', () => {
    it('should delete document', async () => {
      mockS3Service.deleteFile.mockResolvedValueOnce();

      await uploader.deleteDocument('documents/test.txt');

      expect(mockS3Service.deleteFile).toHaveBeenCalledWith('documents/test.txt');
    });
  });
});
