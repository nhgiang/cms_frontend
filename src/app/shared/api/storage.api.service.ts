import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VideoAsset } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class StorageApiService extends BaseApi {
  endpoint = 'files';

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
    if (!files.some(file => typeof file !== 'string')) {
      return of(files as string[]);
    }
    const form = new FormData();
    let fileNames = [];
    files.forEach(file => {
      if (typeof file !== 'string') {
        form.append('file', file, (file.name || 'unknownfile'));
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

  uploadVideo(file: Blob | File | string, fileName?: string): Observable<VideoAsset> | Observable<string> {
    if (!file || typeof file === 'string') {
      return of(file as string);
    }
    const form = new FormData();
    form.append('file', file, fileName || ((file as any).name || 'unknownfile'));
    return this.httpClient.post<VideoAsset>(this.createUrl('/upload'), form);
  }
}
