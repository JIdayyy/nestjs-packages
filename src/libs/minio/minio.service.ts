import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      port: +this.configService.get('MINIO_PORT'),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });
  }

  slugify(value: string) {
    return value
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  getObject(path: string) {
    return this.client.getObject(this.configService.get('MINIO_BUCKET'), path);
  }

  writeStream({
    stream,
    serverPath,
  }: {
    stream: string | Readable | Buffer;
    serverPath: string;
  }) {
    return this.client.putObject(
      this.configService.get('MINIO_BUCKET'),
      serverPath,
      stream,
    );
  }

  bucketExists() {
    return this.client.bucketExists(this.configService.get('MINIO_BUCKET'));
  }

  makeBucket() {
    return this.client.makeBucket(this.configService.get('MINIO_BUCKET'));
  }

  putObject({
    localPath,
    serverPath,
    metaData,
  }: {
    localPath: string;
    serverPath: string;
    metaData: any;
  }) {
    return this.client.fPutObject(
      this.configService.get('MINIO_BUCKET'),
      serverPath,
      localPath,
      metaData,
    );
  }
}
