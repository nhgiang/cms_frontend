import { Pipe, PipeTransform } from '@angular/core';
import { Option } from '@shared/interfaces/option.type';

@Pipe({
  name: 'option'
})
export class OptionPipe implements PipeTransform {

  transform(value: any, options: Option[], key: 'label' | 'color' = 'label'): any {
    const option = options.find(x => x.value === value);
    return option ? option[key] : undefined;
  }

}
