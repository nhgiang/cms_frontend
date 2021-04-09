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
  status: string;
  specializationName: string;
  index?: number;
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

export interface Feedback {
  studentName: string;
  courseName: string;
  photo: string;
  content: string;
}
