import { VideoType } from 'types/enums';
import { Entity } from 'types/typemodel';

export interface Course extends Entity {
  typeId: any;
  hasStudent: any;
  name: string;
  teacherAvatar: string;
  teacherName: string;
  typeName: string;
  studentPrice: number;
  partnerPrice: number;
  totalStudent: number;
  view: number;
  purchase: number;
  videoIntroType: VideoType;
  videoIntro: string;
  index: number;
  published: boolean;
  skills: any[];
  userId: any;
  isOwner: any;
  isHidden: any; //dành cho partner

  isVisible: boolean;
}
export interface Specialization extends Entity {
  name: string;
}

export interface Lesson extends Entity {
  id: string;
  created: Date;
  lastModified: Date;
  courseId: string;
  title: string;
  unitsAndTests: UnitAndTest[];
  order: number;
}

export interface UnitAndTest {
  id: string;
  type: UnitAndTest;
  title: string;
  description: string;
  duration: number;
  point: number;
  totalQuestion: number;
  created: Date;
}

export interface Feedback {
  id: string;
  created: Date;
  lastModified: Date;
  courseId: string;
  courseName: string;
  studentName: string;
  content: string;
  photo: string;
}

export interface Unit {
  id: string;
  lessionId: string;
  title: string;
  description: string;
  duration: 0;
  video: string;
  attachments: string[];
}
