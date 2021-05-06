import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeDuration'
})
export class TimeDurationPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return Math.round(moment.duration(value * 1000).as('minutes'));
  }
}
