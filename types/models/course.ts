import { Entity } from 'types/typemodel';

export interface Course extends Entity {
  name: string;
  teacherAvatar: string;
  teacherName: string;
  typeName: string;
  studentPrice: number;
  partnerPrice: number;
  totalStudent: number;
}
export interface Specialization extends Entity {
  name: string;
}
