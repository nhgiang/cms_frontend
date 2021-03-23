import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, 'HH:mm dd/MM/yyyy');
  }

}
