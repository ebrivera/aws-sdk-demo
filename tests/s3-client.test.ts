import { S3Service } from '../src/s3-client';

// Mock AWS SDK
jest.mock('aws-sdk', () => {
  const mockS3 = {
    putObject: jest.fn().mockReturnThis(),
    getObject: jest.fn().mockReturnThis(),
    deleteObject: jest.fn().mockReturnThis(),
    listObjectsV2: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };

  return {
    S3: jest.fn(() => mockS3),
  };
});

describe('S3Service', () => {
  let s3Service: S3Service;
  let mockS3: any;

  beforeEach(() => {
    const AWS = require('aws-sdk');
    s3Service = new S3Service('test-bucket', 'us-east-1');
    mockS3 = new AWS.S3();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('should upload a file successfully', async () => {
      mockS3.promise.mockResolvedValueOnce({ ETag: '"abc123"' });

      const buffer = Buffer.from('test content');
      const result = await s3Service.uploadFile('test.txt', buffer);

      expect(result).toBe('https://test-bucket.s3.amazonaws.com/test.txt');
      expect(mockS3.putObject).toHaveBeenCalledWith({
        Bucket: 'test-bucket',
        Key: 'test.txt',
        Body: buffer,
      });
    });

    it('should handle upload errors', async () => {
      mockS3.promise.mockRejectedValueOnce(new Error('Upload failed'));

      const buffer = Buffer.from('test content');
      
      await expect(s3Service.uploadFile('test.txt', buffer))
        .rejects.toThrow('Upload failed');
    });
  });

  describe('downloadFile', () => {
    it('should download a file successfully', async () => {
      const mockBody = Buffer.from('file content');
      mockS3.promise.mockResolvedValueOnce({ Body: mockBody });

      const result = await s3Service.downloadFile('test.txt');

      expect(result).toEqual(mockBody);
      expect(mockS3.getObject).toHaveBeenCalledWith({
        Bucket: 'test-bucket',
        Key: 'test.txt',
      });
    });
  });

  describe('deleteFile', () => {
    it('should delete a file successfully', async () => {
      mockS3.promise.mockResolvedValueOnce({});

      await s3Service.deleteFile('test.txt');

      expect(mockS3.deleteObject).toHaveBeenCalledWith({
        Bucket: 'test-bucket',
        Key: 'test.txt',
      });
    });
  });

  describe('listFiles', () => {
    it('should list files with prefix', async () => {
      mockS3.promise.mockResolvedValueOnce({
        Contents: [
          { Key: 'docs/file1.txt' },
          { Key: 'docs/file2.txt' },
        ],
      });

      const result = await s3Service.listFiles('docs/');

      expect(result).toEqual(['docs/file1.txt', 'docs/file2.txt']);
      expect(mockS3.listObjectsV2).toHaveBeenCalledWith({
        Bucket: 'test-bucket',
        Prefix: 'docs/',
      });
    });

    it('should handle empty bucket', async () => {
      mockS3.promise.mockResolvedValueOnce({ Contents: [] });

      const result = await s3Service.listFiles();

      expect(result).toEqual([]);
    });
  });
});
