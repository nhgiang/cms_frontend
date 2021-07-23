import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig, AngularEditorService } from '@kolkov/angular-editor';
import { EventTypeApiService } from '@shared/api/event-type.api.service';
import { EventApiService } from '@shared/api/event.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { FixFontEditorDirective } from '@shared/services/fix-font-editor-service.ts/fix-font-editor.directive';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, map, switchMap } from 'rxjs/operators';
import { EventStatus } from 'types/enums';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
  providers: [FixFontEditorDirective, AngularEditorService]
})
export class EventCreateComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  eventStatus = EventStatus;
  editorConfig: AngularEditorConfig = {
    sanitize: false,
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'fontName',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'subscript',
        'superscript',
        'indent',
        'outdent',
      ],
      [
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode'
      ]
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(
    private fb: FormBuilder,
    private eventTypeApi: EventTypeApiService,
    private eventApi: EventApiService,
    private route: ActivatedRoute,
    private storageApi: StorageApiService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  eventTypes$ = (params: {
    page: number,
    limit: number
  }) => {
    return this.eventTypeApi.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.title };
    })));
  }

  submit(isDraft: boolean) {
    if (!isDraft) {
      Ultilities.validateForm(this.form);
    } else {
      if (this.form.controls.title.invalid && this.form.controls.typeId) {
        this.form.get('title').markAsDirty();
        this.form.get('typeId').markAsDirty();
        this.form.get('typeId').updateValueAndValidity();
        this.form.get('title').updateValueAndValidity();
        return;
      }
    }
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.thumbnail).pipe(switchMap(url => {
      this.form.get('thumbnail').setValue(url);
      const body = {
        ...this.form.value,
        status: isDraft ? this.eventStatus.Draft : this.eventStatus.Submitted,
      };
      return this.eventApi.create(body);
    }), finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Thêm mới thông tin sự kiện thành công!');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, TValidators.textRange(1, 200)],
      description: [null, TValidators.required],
      typeId: [null, TValidators.required],
      startAt: [null, TValidators.required],
      endAt: [null, TValidators.required],
      showCountDown: [null],
      link: [null, [TValidators.required, TValidators.link]],
      host: [null, TValidators.textRange(1, 200)],
      address: [null, TValidators.textRange(1, 200)],
      thumbnail: [null, Validators.required],
      totalParticipant: [null, [TValidators.onlyNumber(), Validators.required]],
      gifts: [null, [TValidators.onlyNumber(), TValidators.required]]
    }, {
      validators: TValidators.timeValidator('startAt', 'endAt')
    });
  }
}
