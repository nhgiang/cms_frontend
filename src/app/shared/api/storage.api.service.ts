import { HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, retry, switchMap, tap } from 'rxjs/operators';
import { VideoAsset } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class StorageApiService extends BaseApi {
  endpoint = 'files';
  private file: File;
  chunkSize = 200_000_000;
  uploadFile(file: Blob | File | string, fileName?: string): Observable<string> {
    if (!file || typeof file === 'string') {
      return of(file as string);
    }
    const form = new FormData();
    form.append('file', file, fileName || ((file as any).name || 'unknownfile'));
    return this.httpClient
      .post<any>(this.createUrl('/upload'), form)
      .pipe(map((result: { path: string }) => result.path));
  }

  uploadFiles(files: Blob[] | File[] | string[] | any[]): Observable<string[]> {
    if (!files || !files.some(file => typeof file !== 'string')) {
      return of(files as string[]);
    }
    const form = new FormData();
    let fileNames = [];
    files.forEach(file => {
      if (typeof file !== 'string') {
        form.append('files', file, (file.name || 'unknownfile'));
      } else {
        fileNames.push(file);
      }
    });
    return this.httpClient
      .post<any>(this.createUrl('/uploads'), form)
      .pipe(map((res: any[]) => {
        fileNames = [...fileNames, ...res.map(file => file.path)];
        return fileNames;
      }));
  }

  uploadVideo(file: Blob | File | string, fileName?: string) {
    if (!file || typeof file === 'string') {
      return of(file as string);
    }
    const form = new FormData();
    form.append('file', file, fileName || ((file as any).name || 'unknownfile'));
    return this.httpClient.post<VideoAsset>(this.createUrl('/upload-video'), form).pipe(tap(console.log));
  }

  createUploadUrl(body: {
    name: string,
    size: number
  }) {
    return this.httpClient.post<any>(this.createUrl('/create-video'), body);
  }

  uploadVideoFile(file: File | string, fileName?: string) {
    if (typeof file === 'string') {
      return of(file);
    }
    this.file = file;
    let videoId;
    return this.createUploadUrl({ name: file.name, size: file.size }).pipe(
      switchMap(res => {
        videoId = res.id;
        const blob = this.file.slice(0, this.chunkSize);
        return this.uploadToVimeo(res, blob, 0);
      }),
      switchMap(_ => {
        return this.httpClient.get<{ duration: number, id: string }>(this.createUrl(`/get-video/${videoId}`));
      })
    );
  }

  uploadToVimeo(res, file, offset?: number): Observable<any> {
    if (offset < this.file.size) {
      const headers = new HttpHeaders({
        'Tus-Resumable': '1.0.0',
        'Content-Type': 'application/offset+octet-stream',
        'Upload-Offset': `${offset || 0}`,
        'Accept': 'application/vnd.vimeo.*+json;version=3.4',
      });

      return this.httpClient.patch(`${res.uploadLink}`, file, {
        headers,
        observe: 'response'
      }).pipe(filter(event => event.type === HttpEventType.Response), switchMap(t => {
        const offSet = t.headers.get('upload-offset');
        const blob = this.file.slice(+offSet, +offSet + this.chunkSize);
        return this.uploadToVimeo(res, blob, +offSet);
      }));
    } else {
      return of(null);
    }
  }
}
