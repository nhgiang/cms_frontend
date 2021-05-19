import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toImage'
})
export class ToImagePipe implements PipeTransform {

  transform(value: File | string, ...args: unknown[]): string {
    if (typeof value === 'string') {
      return value;
    }
    let base64 = '';
    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = (e) => {
      base64 = e.target.result as string;
    };
    return base64;
  }
}
