import { Option } from '@shared/interfaces/option.type';

export enum UserStatus {
  Active = 'Active',
  InActive = 'InActive',
}

export enum UploaderStatus {
  NotSelected,
  Selected,
  InProgress,
  Completed
}

export enum AssetType {
  undefined = 0,
  Video,
  Image,
  File
}

export enum FileUploadErrors {
  Size = 1,
  Type = 2
}

export enum ContactStatus {
  NotContactedYet = 'NotContactedYet',
  Contacted = 'Contacted'
}

export enum UnitAndTest {
  Unit = 'Unit',
  Test = 'Test',
}

export enum VideoType {
  Youtube = 'Youtube',
  Vimeo = 'Vimeo',
}

export enum InvoiceStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Success = 'Success',
  Failure = 'Failure',
}

export enum InvoiceType {
  Course = 'Course',
  Membership = 'Membership',
}

export const InvoiceStatusOptions: Option[] = [
  { value: 'Pending', label: 'Đang chờ', color: '#D9D9D9' },
  { value: 'Processing', label: 'Đang xử lý', color: '#FFEC3D' },
  { value: 'Success', label: 'Thành công', color: '#73D13D' },
  { value: 'Failure', label: 'Thất bại', color: '#F759AB' },
];
