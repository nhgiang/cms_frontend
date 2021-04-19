import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TValidators } from '@shared/extentions/validators';
import { AssetType } from 'types/enums';
import { FileModel } from 'types/typemodel';

@Component({
  selector: 'app-skills-modal',
  templateUrl: './skills-modal.component.html',
  styleUrls: ['./skills-modal.component.scss']
})
export class SkillsModalComponent implements OnInit {

  // type: 'create' | 'edit' = 'create';
  assetType = AssetType;
  form: FormGroup;
  image: any;

  constructor(
    fb: FormBuilder
  ) {
    this.form = fb.group({
      icon: [null, TValidators.required],
      name: [null, TValidators.required],
      description: [null, TValidators.required]
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(console.log);
  }

  onCropped(image: FileModel) {
    this.image = image;
    this.getBase64(image.file, (img: string) => {
      this.form.get('photo').setValue(img);
    });
  }

  private getBase64(img: Blob, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}
