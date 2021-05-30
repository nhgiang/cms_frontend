import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EventTypeApiService } from '@shared/api/event-type.api.service';
import { EventApiService } from '@shared/api/event.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap, finalize, map } from 'rxjs/operators';
import { EventStatus } from 'types/enums';
import { EventEntity } from 'types/typemodel';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  eventStatus = EventStatus;
  editorConfig: AngularEditorConfig = {
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
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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
    }
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.thumbnail).pipe(switchMap(url => {
      this.form.get('thumbnail').setValue(url);
      const body = {
        ...this.form.value,
        status: isDraft ? this.eventStatus.Submitted : this.eventStatus.Draft,
      };
      return this.eventApi.create(body);
    }), finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Thêm mới thông tin sự kiện thành công!');
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
      link: [null, TValidators.required],
      host: [null, TValidators.textRange(1, 200)],
      address: [null, TValidators.textRange(1, 200)],
      thumbnail: [null, Validators.required],
      totalParticipant: [null, [TValidators.onlyNumber, Validators.required]],
      gifts: [null, [TValidators.onlyNumber, TValidators.required]]
    }, {
      validator: TValidators.timeValidator('startAt', 'endAt')
    });
  }
}