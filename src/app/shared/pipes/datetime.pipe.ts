import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe extends DatePipe implements PipeTransform {

  transform(value: any, hasTime?: any): any {
    return hasTime ? super.transform(value, 'dd/MM/yyyy HH:mm') : super.transform(value, 'dd/MM/yyyy');
  }

}
