import { Injectable } from '@nestjs/common';
import { CloudflareService } from 'src/service/cloudflare/cloudflare.service';

@Injectable()
export class UploadService {
  constructor(private cloudflareService: CloudflareService) {}

  async uploadImage(file: any) {
    const result = await this.cloudflareService.uploadFile(file);
    return result;
  }

  async uploadImages(files: any) {
    const result = await this.cloudflareService.uploadFiles(files);
    return result;
  }

  async deleteImage(file: any) {
    const result = await this.cloudflareService.deleteFile(file);
    return result;
  }

  async deleteImages(files: any) {
    const result = await this.cloudflareService.deleteFiles(files);
    return result;
  }
}
