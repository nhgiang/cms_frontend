import { Injectable } from '@angular/core';
import { AnonymousCredential, BlobServiceClient } from '@azure/storage-blob';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { VideoAsset } from 'types/typemodel';
import { BaseApi } from './base-api';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageApiService extends BaseApi {
  endpoint = 'files';
  file: File;
  chunkSize = 200_000_000;
  uploadFile(
    file: Blob | File | string,
    fileName?: string
  ): Observable<string> {
    if (!file || typeof file === 'string') {
      return of(file as string);
    }
    const form = new FormData();
    form.append('file', file, fileName || (file as any).name || 'unknownfile');
    return this.httpClient
      .post<any>(this.createUrl('/upload'), form)
      .pipe(map((result: { path: string }) => result.path));
  }

  uploadFiles(files: Blob[] | File[] | string[] | any[]): Observable<string[]> {
    if (!files || !files.some((file) => typeof file !== 'string')) {
      return of(files as string[]);
    }
    const form = new FormData();
    let fileNames = [];
    files.forEach((file) => {
      if (typeof file !== 'string') {
        form.append('files', file, file.name || 'unknownfile');
      } else {
        fileNames.push(file);
      }
    });
    return this.httpClient.post<any>(this.createUrl('/uploads'), form).pipe(
      map((res: any[]) => {
        fileNames = [...fileNames, ...res.map((file) => file.path)];
        return fileNames;
      })
    );
  }

  uploadVideo(file: Blob | File | string, fileName?: string) {
    if (!file || typeof file === 'string') {
      return of(file as string);
    }
    const form = new FormData();
    form.append('file', file, fileName || (file as any).name || 'unknownfile');
    return this.httpClient
      .post<VideoAsset>(this.createUrl('/upload-video'), form)
      .pipe(tap(console.log));
  }

  createUploadUrl(body: { name: string; size: number }) {
    return this.httpClient.post<any>(this.createUrl('/create-video'), body);
  }

  uploadVideoFile(file: File | string) {
    if (typeof file === 'string') {
      return of(file);
    }
    this.file = file;
    const fileName = `azure-video-${v4()}`;
    return this.createUploadUrl({ name: fileName, size: file.size }).pipe(
      switchMap(res => {
        return this.uploadToVimeo(res.uploadUrl, file, res.fileName).pipe(mapTo(res.fileName));
      })
    );
  }

  uploadToVimeo(
    uploadUrl: string,
    file: File,
    fileName: string
  ): Observable<any> {
    const anonymousCredential = new AnonymousCredential();
    const blobClient = new BlobServiceClient(uploadUrl, anonymousCredential);
    const containerClient = blobClient.getContainerClient('');
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    return from(blockBlobClient.uploadData(file, {
      blockSize: 8 * 1024 * 1024, // 8MB Block size
      blobHTTPHeaders: {
        blobContentType: file.type
      }
    }));
  }

  encodeVideo(body: { fileName: string; unitId: string }) {
    return this.httpClient.post(this.createUrl('/encode-video'), body);
  }

  getVideo(id) {
    return this.httpClient.get(this.createUrl(`/get-video/${id}`));
  }
}
