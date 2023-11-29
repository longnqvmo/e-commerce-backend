import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { cloudflareConfig } from 'src/configs/cloudflare.config';

@Injectable()
export class CloudflareService {
  private apiUrl = `https://${cloudflareConfig.ACCOUNT}.r2.cloudflarestorage.com`;
  private publicUrl = `https://${cloudflareConfig.PUBLIC_URL}`;
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: cloudflareConfig.REGION,
      endpoint: this.apiUrl,
      credentials: {
        accessKeyId: cloudflareConfig.ACCESS_KEY_ID,
        secretAccessKey: cloudflareConfig.SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: any) {
    const filename = file.fieldname + '-' + Date.now();
    const s3Params = {
      Body: file.buffer,
      Bucket: cloudflareConfig.BUCKET,
      Key: filename,
      contentType: file.mimetype,
    };
    const command = new PutObjectCommand(s3Params);
    await this.s3.send(command);
    return filename;
  }

  async uploadFiles(files: any) {
    const filenames = [];
    for (let i = 0; i < files.length; i++) {
      const filename = files[i].fieldname + '-' + Date.now();
      const s3Params = {
        Body: files[i].buffer,
        Bucket: cloudflareConfig.BUCKET,
        Key: filename,
        contentType: files[i].mimetype,
      };
      const command = new PutObjectCommand(s3Params);
      await this.s3.send(command);
      filenames.push(filename);
    }
    return filenames;
  }

  async deleteFile(file: any) {
    const filename = file.name;
    const s3Params = {
      Bucket: cloudflareConfig.BUCKET,
      Key: filename,
    };
    const command = new DeleteObjectCommand(s3Params);
    await this.s3.send(command);
    return `OK`;
  }

  async deleteFiles(files: any) {
    const s3Params = {
      Bucket: cloudflareConfig.BUCKET,
      Delete: {
        Objects: files.map((file: any) => ({ Key: file.name })),
      },
    };
    const command = new DeleteObjectsCommand(s3Params);
    await this.s3.send(command);
    return `OK`;
  }
}
