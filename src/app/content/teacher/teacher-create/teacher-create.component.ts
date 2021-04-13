import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { FileModel, SettingTeacher } from 'types/typemodel';
import { ContentStateService } from '../../content-state.service';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss']
})
export class TeacherCreateComponent implements OnInit {
  form: FormGroup;
  avatarUrl: string;
  image: FileModel;

  constructor(
    private fb: FormBuilder,
    private contentState: ContentStateService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.contentState.createTeacher(this.form)
  }

  private getBase64(img: Blob, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  onCropped(image: FileModel) {
    this.image = image;
    this.getBase64(image.file, (img: string) => {
      this.avatarUrl = img;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.textRange(1, 200)],
      position: [null, TValidators.textRange(1, 200)]
    });
  }
}
