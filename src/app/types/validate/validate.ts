import { z } from "zod";

export const userZodSchema = z.object({
    userName: z.string().min(4,"name is require").max(50,"name is too long"),
    email: z.string().email(),
    password: z.string().min(4,"u must input at least 4").max(10,"password is too long"),
    roleName:z.string()
  });
  export type userType=z.infer<typeof userZodSchema>;
  
  // const imageSchema = z
  //   .instanceof(File)
  //   .refine((file) => file.size < 5 * 1024 * 1024).optional();
  
  export const newsZodSchema = z.object({
    headline: z.string().min(5, "Enter at least 5 letters").max(100, "Headline too long"),
    title: z.string().min(20, "Title is too short").max(1000, "Title is too long"),
    img:z.instanceof(File).optional().nullable(),
    user: z.string().min(5, "User must be at least 5 characters").max(50, "User is too long"),
    department: z.string().min(3, "Department must be at least 3 characters").max(20, "Department is too long"),
  });
  export type newsType=z.infer<typeof newsZodSchema>;


const GenderSchema = z.enum(['male', 'female' ]);
const phoneNumberRegex = /^[0-9]{9}$/;  
const OppontementSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialization: z.string(),
});

export const AppointUpdateSchema = z.object({
  patName: z.string().min(1, "name required").max(100, "name length too long"),
  date: z.date().nullable().refine((date:any) => date !== null, {
    message: "يجب اختيار تاريخ",
  }),  docId: z.string().min(1, "doctor is required"),
  patId: z.string().min(1, "patient is required"), 
  status: z.string().min(3, "status is required"), 
});
export const PatientSchema = z.object({
  id:z.string().optional(),
  patName: z.string().min(1,"name require").max(100,"name length too long"),
  address: z.string().min(1,"address require").max(100,"address length too long"),
  gender: GenderSchema.nullable(),
  phone: z.string().regex(phoneNumberRegex),
  doctor:z.string(),
  date: z.date().nullable().refine((date:any) => date !== null, {
    message: "يجب اختيار تاريخ",
  }),
});

export type PatientType = z.infer<typeof PatientSchema>;

export const BlogSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(100,"title is too long"),
  content: z.string().min(1, "Content cannot be empty").max(500,"content is too long"),
  img:z.instanceof(File).optional().nullable(),});
export type BlogType = z.infer<typeof BlogSchema>;
