import { ContactStatus, InvoiceStatus, InvoiceType, UserStatus } from './enums';

export interface QueryResult<T> {
  meta: Meta;
  items: Array<T>;
}

export interface Meta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Entity {
  id: string;
  created: Date;
  lastModified: Date;
}

export interface User extends Entity {
  email: string;
  fullName: string;
  role: string;
  dateOfBirth: Date;
  phoneNumber: string;
  emailConfirmed: boolean;
  phoneNumberConfirmed: string;
  address: string;
  job: string;
  avatar: string;
  gender: string;
  specializationId: string;
  partnerId: string;
  status: UserStatus;
  specializationName: string;
  index?: number;
  bio: string;
}

export interface TeacherCreateCommand {
  email: string;
  password: string;
  fullName: string;
  avatar: string;
  phoneNumber: string;
  specializationId: string;
  bio: string;
}
export interface TeacherUpdateCommand extends TeacherCreateCommand {
  id: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface SettingFeedback {
  studentName: string;
  courseName: string;
  photo: string;
  content: string;
}

export interface FileModel {
  file: Blob;
  fileName: string;
}

export interface SettingTeacher {
  description: string;
  teachers: SettingTeacherItem[];
}

export interface SettingTeacherItem {
  name: string;
  avatar: string;
  position: string;
}

export interface VideoIntro {
  title: string;
  iamge: string;
  video: string;
}

export interface ConsultingInformation extends Entity {
  name: string;
  email: string;
  phoneNumber: string;
  courseInterested: string;
  note: string;
  status: ContactStatus;
  statusTransformed: string;
}

export interface DataTableMetadata {
  columns: DataTableColumnMetaData[];
}

export interface DataTableColumnMetaData {
  key: string;
  name: string;
  sortable: boolean;
  width?: string;
  sortOrder?: string;
}
export interface CourseType {
  id: string;
  created: Date;
  lastModified: Date;
  name: string;
  index: number;
}

export interface VideoAsset {
  path: string;
  duration: number;
  size?: number;
}

export interface BlogType extends Entity {
  name: string;
  index: number;
}

export interface Blog extends Entity {
  typeId: string;
  title: string;
  description: string;
  coverImage: string;
  authorName: string;
}

export interface EventEntity extends Entity {
  partnerId: string;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  link: string;
  host: string;
  address: string;
  thumbnail: string;
  totalParticipant: number;
  gifts: string;
  type: EventType;
}

export interface Invoice extends Entity {
  code: number;
  status: InvoiceStatus;
  type: InvoiceType;
  days: number;
  totalPrice: number;
  note: string;
  user: User;
  items: InvoiceItem;
  bankCodePicked: string;
  bankCode: any;
  transactionAmount: number;
  transactionCode: any;
  transactionTime: any;
}

export interface InvoiceItem {
  courseId: string;
  courseName: string;
  price: number;
  days: number;
}

export interface EventType extends Entity {
  partnerId: string;
  title: string;
  description: string;
}

export interface Partner extends Entity {
  fullname: string;
  phoneNumber: string;
  email: string;
  academyName: string;
  address: string;
  package: string;
  numberOfParticipants: number;
}
