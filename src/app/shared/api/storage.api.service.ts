import { Injectable } from '@angular/core';
import { AnonymousCredential, BlobServiceClient } from '@azure/storage-blob';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { VideoAsset } from 'types/typemodel';
import { BaseApi } from './base-api';
import { v4 } from 'uuid';
declare var imageCompression: any;
const options = {
  maxSizeMB: 0.5,
  useWebWorker: true,
};

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
    if (file.type.startsWith('image'))
      return from(imageCompression(file as File, options)).pipe(
        switchMap((compressed: any) => {
          console.info('File gốc size: ', file.size);
          console.info('File nén: ', compressed.size);
          form.append(
            'file',
            compressed,
            fileName || (file as any).name || 'unknownfile'
          );
          return this.httpClient
            .post<any>(this.createUrl('/upload'), form)
            .pipe(map((result: { path: string }) => result.path));
        })
      );
    else {
      form.append(
        'file',
        file,
        fileName || (file as any).name || 'unknownfile'
      );
      return this.httpClient
        .post<any>(this.createUrl('/upload'), form)
        .pipe(map((result: { path: string }) => result.path));
    }
  }

  uploadFiles(files: Blob[] | File[] | string[] | any[]): Observable<string[]> {
    if (!files || !files.some((file) => typeof file !== 'string')) {
      return of(files as string[]);
    }
    const form = new FormData();
    let fileNames = [];
    return forkJoin(
      (files as any[]).map((file: any) => {
        if (typeof file !== 'string')
          return imageCompression(file as File, options);
        else return of(file as string);
      })
    ).pipe(
      tap((files: any[]) => {
        files.forEach((file: any) => {
          if (typeof file !== 'string')
            form.append(
              'files',
              file as File,
              (file.name as any) || 'unknownfile'
            );
          else fileNames.push(file);
        });
      }),
      switchMap(() =>
        this.httpClient.post<any>(this.createUrl('/uploads'), form).pipe(
          map((res: any[]) => {
            fileNames = [...fileNames, res.map((file) => file.path)];
            return fileNames;
          })
        )
      )
    );
  }

  uploadVideo(file: Blob | File | string, fileName?: string) {
    if (!file || typeof file === 'string') {
      return of(file as string);
    }
    const form = new FormData();
    form.append('file', file, fileName || (file as any).name || 'unknownfile');
    return this.httpClient.post<VideoAsset>(
      this.createUrl('/upload-video'),
      form
    );
  }

  createUploadUrl(body: { name: string; size: number }) {
    return this.httpClient.post<any>(this.createUrl('/create-video'), body);
  }

  uploadVideoPrivate(file: File | string) {
    if (typeof file === 'string') {
      return of(file);
    }
    this.file = file;
    const fileName = `azure-video-${v4()}`;
    return this.createUploadUrl({ name: fileName, size: file.size }).pipe(
      switchMap((res) => {
        return this.putToAzure(res.uploadUrl, file, res.fileName).pipe(
          mapTo(res.fileName)
        );
      })
    );
  }

  putToAzure(uploadUrl: string, file: File, fileName: string): Observable<any> {
    const anonymousCredential = new AnonymousCredential();
    const blobClient = new BlobServiceClient(uploadUrl, anonymousCredential);
    const containerClient = blobClient.getContainerClient('');
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    return from(
      blockBlobClient.uploadData(file, {
        blockSize: 8 * 1024 * 1024, // 8MB Block size
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      })
    );
  }

  uploadVideoPublic(file: File | string) {
    if (typeof file === 'string') {
      return of(file);
    }
    this.file = file;
    const fileName = `azure-video-${v4()}`;
    return this.createUploadUrl({ name: fileName, size: file.size }).pipe(
      switchMap((res) => {
        return this.putToAzure(res.uploadUrl, file, res.fileName).pipe(
          mapTo(res.fileName)
        );
      })
    );
  }

  encodeVideo(body: { fileName: string }) {
    return this.httpClient.post(this.createUrl('/encode-video'), body);
  }

  getVideo(id: string, isPrivate: boolean) {
    if (isPrivate) {
      return this.httpClient.get(this.createUrl(`/get-video/${id}`));
    } else {
      return this.httpClient.get(this.createUrl(`/get-video-public/${id}`));
    }
  }
}
