/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UploadVideoIntroComponent } from './upload-video-intro.component';

describe('UploadVideoIntroComponent', () => {
  let component: UploadVideoIntroComponent;
  let fixture: ComponentFixture<UploadVideoIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadVideoIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadVideoIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
