import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameTeacher'
})
export class NameTeacherPipe implements PipeTransform {

  transform(data: any, args?: any): any {
    return data.role === 'Teacher' ? ('Giảng viên ' + data?.fullName || data.email) : (data?.fullName || data.email);
  }

}
