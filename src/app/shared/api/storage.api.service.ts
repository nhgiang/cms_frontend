import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class StorageApiService extends BaseApi {
  endpoint = 'files';

  uploadFile(file: Blob | File | string): Observable<string> {
    if (!file || typeof file === 'string') {
      return of(file as string);
    }
    const form = new FormData();
    const fileName = (file as any).name || 'unknownfile';
    form.append('file', file, fileName);
    return this.httpClient
      .post<any>(this.createUrl('/upload'), form)
      .pipe(map((result: { path: string }) => result.path));
  }
}
