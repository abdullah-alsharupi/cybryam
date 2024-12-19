// models/User.ts

import { message } from "antd";
import exp from "constants";
import { Content } from "next/font/google";
import { object, z } from "zod";
const phoneNumberRegex = /^[+]?[1-9]\d{1,14}$/;
export interface Hospital{
  id:string;
  name:string;
  email:string;
  phone:string;
  telephone:string;
  vision:string;
  description:string;
  img:string
  goal:string;
  message:string;
  
}
export const hospitalZodSchema=z.object({
  id:z.string().optional(),
  name:z.string().min(1,"يجب إدخال أسم الفرع اوالمركز الرئيسي"),
  email:z.string().min(1,""),
  phone:z.string().regex(phoneNumberRegex,'يجب ادخال ارقام تسعة ارقام'),
  telephone:z.string().min(4,"يجب إدخال الرقم "),
  vision:z.string().min(10,'يجب إدخال الرؤية'),
  goal:z.string().min(10,'يجب إدخال الهدف'),
message:z.string().min(10,'يجب إدخال الرسالة'),
  description:z.string().min(5,'يجب إدخال الوصف'),
  img:z.instanceof(File).optional().nullable()
  
}) 
export type hospitalType=z.infer<typeof hospitalZodSchema>
export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  news: News[];
  role: string;
}
export interface UpdateUser {
  id: string;
  userName: string;
  email: string;
  password: string;
  role: string;
}

export const doctorZodSchema = z.object({
  id:z.string().optional(),
  img: z.instanceof(File).optional().nullable(),
  doctorName: z.string().min(10, "اسم الدكتور يجب أن يكون على الأقل 10 أحرف"),
  phone: z
    .string()
    .regex(phoneNumberRegex, "رقم الهاتف يجب أن يتكون من 9 أرقام"),
  specialist: z.string().min(3, "التخصص يجب أن يكون على الأقل 3 أحرف"),
  department: z.object({
    depName: z.string().min(2, "اسم القسم مطلوب"),
  }), // يمكنك تحديد ما إذا كان هذا الحقل مطلوبًا أم لا
  weekwork: z
  .array(
    z.object({
      day: z.string().nonempty("اليوم مطلوب"),
      workinghour: z.array(
        z.object({
         
          startTime: z.string().min(1, "وقت بدء الدوام مطلوب"),
          endTime: z.string().min(1, "وقت انتهاء الدوام مطلوب"),
        })
      ).min(1, "يجب إضافة فترات زمنية لكل يوم"),
    })
  )
  .min(1, "يجب إضافة أيام الدوام"),
 // يمكنك تحديد ما إذا كان هذا الحقل مطلوبًا أم لا
  information: z.string().optional(),
});
export type doctroType = z.infer<typeof doctorZodSchema>;
export interface CreateUser {
  userName: string;
  email: string;
  password: string;
  roleName: string;
}

export interface Permission {
  id: string;
  page:string
  actions: string;
  entity: string;
  access: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
  users: User[];
}

export interface Role {
  name: string;
}

export interface News {
  id: string;
  headline: string;
  title: string;
  img: string;
  user: User;
  createdAt: Date;
  userId: string;
  department?: Department;
  depID: string;
}
export type Blog = {
  id?: string; // Unique identifier for the blog post
  title: string; // Title of the blog post
  content: string; // Content of the blog post
  img?: string; // Optional image URL associated with the blog post
  hospitalId?: string; // Identifier for the associated hospital
  createdAt?: Date; // Timestamp of when the blog post was created
  updatedAt?: Date; // Timestamp of the last update to the blog post
  isDeleted?: boolean; // Indicates if the blog post is deleted
  hospital?: string; // Associated Hospital object
};

export interface Session {
  id: string;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  userId: string;
}

export interface Department {
  actions: any;
  id: string;
  img?:string;
  depName: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  staffs: Staff[];
  doctors: Doctor[];
  news: News[];
  
}
export const departmentZodSchema = z.object({
  id: z.string().optional(),
  img: z.instanceof(File).optional().nullable(),
  description:z.string().optional(),
  depName: z.string().nonempty("اسم القسم مطلوب"),
});
export type departmentType = z.infer<typeof departmentZodSchema>;
export interface Staff {
  id: string;
  staffName: string;
  phone: string | null;
  department: Department;
  depID: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface Doctor {
  id: string;
  doctorName: string;
  phone: string | null;
  specialist: string;
  department: { depName: string };
  img?: string;
  information?: string;

  weekwork: Shift[];
}

export const userZodSchema = z
  .object({
    permissionPageDoctors: z.string().optional(),
    permissionPageNews: z.string().optional(),
    permissionPageDepartments: z.string().optional(),
    permissionPageBlogs: z.string().optional(),
    permissionPagePatients: z.string().optional(),
    userName: z.string().min(4, "الاسم مطلوب").max(50, "الاسم طويل جداً"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    password: z
      .string()
      .min(4, "يجب إدخال كلمة مرور لا تقل عن 4 أحرف")
      .max(100, "كلمة المرور طويلة جداً"),
    confirmPassword: z
      .string()
      .min(4, "يجب تأكيد كلمة المرور")
      .max(100, "كلمة المرور طويلة جداً"),
    roleName: z.enum(["admin", "user"], {
      message: "required choosing role name",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور لا تتطابق",
    path: ["confirmPassword"],
  });

export type userType = z.infer<typeof userZodSchema>;

// const imageSchema = z
//   .instanceof(File)
//   .refine((file) => file.size < 5 * 1024 * 1024).optional();

export const newsZodSchema = z.object({
  headline: z
    .string()
    .min(5, "Enter at least 5 letters")
    .max(100, "Headline too long"),
  title: z
    .string()
    .min(20, "Title is too short")
    .max(1000, "Title is too long"),
  img: z.instanceof(File).optional().nullable(),
  user: z
    .string()
    .min(5, "User must be at least 5 characters")
    .max(50, "User is too long"),
  department: z
    .string()
    .min(3, "Department must be at least 3 characters")
    .max(20, "Department is too long"),
});

export type newsType = z.infer<typeof newsZodSchema>;
export interface addNewsType {
  headline: string;
  title: string;
  img: string | null;
  user: string;
  department: string;
  createdAt:string;
}
export interface Patient {
  email: any;
  id: string;
  patName: string;
  address: string | null;
  gender: Gender | null;
  doctorBack: Date | null;
  phone: string;
  doctor: Oppontement;
}

enum Gender {
  female,
  male,
}

export interface Oppontement {
  [x: string]: any;
  doctor: Doctor;
  docID: string;
  patient: Patient;
  patID: string;
  createdAt: Date;
  date: Date;
  status:any;
  updatedAt: Date;
  isDeleted: boolean;
}
export enum AppointmentStatus{
  PENDING,
  RESCHEDULED,
  NO_SHOW,
  CANCELLED,
  COMPLETED,
  CONFIRMED,
  SCHEDULED

}
export interface Shift {
  day: Day;
  startTime: string;
  endTime: string;
}

enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}
export type CarouselSlideType = {
	src: string;
};