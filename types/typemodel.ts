import {
  ContactStatus,
  EventStatus,
  InvoiceStatus,
  InvoiceType,
  PaymentMethod,
  UserStatus,
  VideoType,
} from './enums';

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
  data?: any;
  isMaster?: boolean;
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
  coverAvatar: string;
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
  image: string;
  video: string;
  videoType: VideoType;
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

export interface HelpCenter extends Entity {
  name: string;
  title: string;
  view: number;
  like: number;
  dislike: number;
}

export interface DataTableMetadata {
  columns: DataTableColumnMetaData[];
}

export interface DataTableColumnMetaData {
  key: string;
  name: string;
  sortable: boolean;
  width?: string;
  class?: string;
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
  status: EventStatus;
}

export interface Invoice extends Entity {
  code?: number;
  status: InvoiceStatus;
  type: InvoiceType;
  days?: number;
  totalPrice: number;
  note?: string;
  user?: User;
  items?: any[];
  bankCodePicked?: string;
  bankCode?: any;
  transactionAmount: number;
  transactionCode: any;
  transactionTime: any;
  invoicePrice: number;
  paymentMethod?: PaymentMethod;
  combos: any[];
  voucherId: string;
  voucher: any;
  updatedByUser: string;
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

export interface Teacher extends Entity {
  fullname: string;
  phoneNumber: string;
  email: string;
  specialization: string;
  address: string;
  dateOfBirth?: Date;
  degree?: string;
  coverLetter?: string;
  referenceLinks?: string;
  notes?: string;
}

export interface Payment {
  method: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  branch: string;
  image: string;
  imageActive: string;
}

export interface Vnpay {
  hashSecret: string;
  tmnCode: string;
}

export interface AboutUs {
  content: string;
  image: string;
  title: string;
  enpoint: number;
}

export interface Story {
  content: string;
  images: string[];
}

export interface VideoIntroContact extends VideoIntro { }

export interface Faq {
  answer: string;
  question: string;
}

export interface Feedback {
  courseName: string;
  content: string;
  photo: string;
  studentName: string;
}

export interface Footer {
  address: string;
  email: string;
  facebook: string;
  phoneNumber: string;
  youtube: string;
}

export interface Premium {
  course: string;
  discount: string;
  lession: string;
}

export interface Header {
  logoImage: string;
}

export interface QuestionAnswer {
  coverAvatar: string;
  items: Faq[];
}

export interface Education {
  coverAvatar: string;
}

export interface CreatePartner {
  name: string;
  domain: string;
  email: string;
  representative: string;
  address: string;
  phoneNumber: string;
  size: number;
  packageId?: string;
  admin: {
    email: string;
    password: string;
  };
  customPackage?: {
    name?: string;
    maxStorage: number;
    maxStudents: number;
    days: number;
    monthlyPrice: number;
  };
}
