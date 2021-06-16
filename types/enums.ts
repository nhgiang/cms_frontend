import { Option } from '@shared/interfaces/option.type';

export enum UserStatus {
  Active = 'Active',
  InActive = 'InActive',
}

export enum UploaderStatus {
  NotSelected,
  Selected,
  InProgress,
  Completed,
}

export enum AssetType {
  undefined = 0,
  Video,
  Image,
  File,
}

export enum FileUploadErrors {
  Size = 1,
  Type = 2,
}

export enum ContactStatus {
  NotContactedYet = 'NotContactedYet',
  Contacted = 'Contacted',
}

export enum UnitAndTest {
  Unit = 'Unit',
  Test = 'Test',
}

export enum VideoType {
  Youtube = 'Youtube',
  Vimeo = 'Vimeo',
}

export const EventStatusOptions: Option[] = [
  { value: 'Submitted', label: 'Đã công bố', color: '#73D13D' },
  { value: 'Happening', label: 'Đang diễn ra', color: '#40A9FF' },
  { value: 'Done', label: 'Đã diễn ra', color: '#FFEC3D' },
  { value: 'Canceled', label: 'Hủy', color: '#F759AB' },
  { value: 'Draft', label: 'Nháp', color: '#D9D9D9' },
];

export const EventUserStatusOptions: Option[] = [
  { value: 'Wait', label: 'Chưa diễn ra', color: '#73D13D' },
  { value: 'Happening', label: 'Đang diễn ra', color: '#40A9FF' },
  { value: 'Done', label: 'Đã diễn ra', color: '#FFEC3D' },
];

export enum EventStatus {
  Draft = 'Draft',
  Canceled = 'Canceled',
  Submitted = 'Submitted',
  Happening = 'Happening',
  Done = 'Done',
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
  { value: 'Canceled', label: 'Hủy bỏ', color: '#ca4e53' },
];

export enum PaymentMethod {
  Bank = 'Bank',
  VNPay = 'VNPay',
}

export enum AccountType {
  Course = 'Gói lẻ',
  Membership = 'Membership',
}
