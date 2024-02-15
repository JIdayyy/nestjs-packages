import { MinioService } from '../../src/libs/minio';
import { Test } from '@nestjs/testing';
import { ConfigFactory, ConfigModule } from '@nestjs/config';

const testConfig: ConfigFactory = () => ({
  MINIO_ENDPOINT: 'localhost',
  MINIO_PORT: 9000,
  MINIO_USE_SSL: false,
  MINIO_BUCKET: 'test',
});

describe('MinioService', () => {
  let minioService: MinioService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MinioService],
      imports: [ConfigModule.forFeature(testConfig)],
    }).compile();

    minioService = module.get<MinioService>(MinioService);
  });

  describe('slugify', () => {
    it('should slugify a string', () => {
      expect(minioService.slugify('Hello World')).toBe('hello-world');
    });

    it('should slugify a string with special characters', () => {
      expect(minioService.slugify('Hello World!')).toBe('hello-world');
    });
  });

  describe('getObject', () => {
    it('should return an object', () => {
      expect(minioService.getObject('path')).toBeDefined();
    });
  });
});
