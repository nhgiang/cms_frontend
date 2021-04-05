import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

// export const baseUrl = new InjectionToken<string>('baseUrl', {
//   providedIn: 'root',
//   factory: () => environment.api
// });
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');