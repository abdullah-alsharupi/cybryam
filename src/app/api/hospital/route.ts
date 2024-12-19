import { hospitalType } from "@/app/types/types";
import db from "@/db/db";
import path from 'path';
import { message } from "antd";

import fs from 'fs'
import { NextRequest, NextResponse } from "next/server";
import { emit } from "process";
export async function GET() {
  
  try {
    const hospital = await db.hospital.findMany({});
    return NextResponse.json(hospital);
  } catch (error) {
    return NextResponse.json({ message: "erro server" }, { status: 500 });
  }
}

// export async function GET() {
//   try {
//     const hospitalData = await db.hospital.({
//       data: {
//         email: "Almajd@gmail.com",
//         name: "Al-Majd Hospital",
//         phone: "777778888",
//         telephone: "04333",
//         description:
//           "AL-MAJD HOSPITAL is a leading healthcare facility dedicated to providing comprehensive medical services to our community. With a team of highly skilled professionals, state-of-the-art technology, and a patient-centered approach, we ensure that every individual receives the highest quality of care",
//         vision:
//           "To be a leading healthcare institution dedicated to providing compassionate, innovative, and patient-centered care. We envision a community where every individual has access to comprehensive medical services, state-of-the-art technology, and a team of highly skilled professionals committed to improving health and well-being. Our goal is to set the standard for excellence in healthcare, fostering a culture of safety, respect, and continuous improvement for all patients and their families.",
//       },

//     });
//     return NextResponse.json(hospitalData)
//   } catch (error) {
//     return NextResponse.json({message:"errror"},{status:500})
//   }
// }
export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name");
  const vision = formData.get("vision");
  const email = formData.get("email");
  const telephone = formData.get("telephone");
  const phone = formData.get("phone");
  const description = formData.get("description");
  const goal = formData.get("goal");
  const message = formData.get("message");
  const file = formData.get("img") as File ;

  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف

  if (file && file.size > 0) {
    
    const data = await file.arrayBuffer();
    imagePath = `img_Hospital${Date.now()}.${file.name.split(".").pop()}`;
    await fs.promises.writeFile(
      `${process.cwd()}/public/images/${imagePath}`,
      Buffer.from(data)
    );
  }
  else {
    imagePath=file as any
  }

  try {
    const addHospital = await db.hospital.create({
      data: {
        name: name as string,
        vision: vision as string,
        email: email as string,
        description: description as string,
        phone: phone as string,
        telephone: telephone as string,
        img: imagePath,
        goal: goal as string,
        message: message as string,
      },
    });
    return NextResponse.json({ message: "تم إضافة الفرع بنجاح" });
  } catch (error: any) {
    if (error.code == "P2002") {
      return NextResponse.json(
        { message: " اسم الفرع موجود بالفعل" },
        { status: 409 }
      );
    }
    const filePath = path.join(process.cwd(), 'public/images', imagePath as string);
    if (fs.existsSync(filePath)){
      fs.promises.unlink(filePath)
    
    }
    
    return NextResponse.json(
      { message: "خطأ في إضافة الفرع" },
      { status: 500 }
    );
  }
}
export async function PUT(req:Request){
  const formData = await req.formData();
  const name = formData.get("name");
  const vision = formData.get("vision");
  const email = formData.get("email");
  const telephone = formData.get("telephone");
  const phone = formData.get("phone");
  const description = formData.get("description");
  const goal = formData.get("goal");
  const message = formData.get("message");
  const file = formData.get("img") as any;
 
  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف
  const nameImg = formData.get("nameImg");
  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    imagePath = `img_Hospital${Date.now()}.${file.name.split(".").pop()}`;

    await fs.promises.writeFile(
      `${process.cwd()}/public/images/${imagePath}`,
      Buffer.from(data)
    );
  } else {
    imagePath = file as any;
  }
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id")?.toString();
try {
  
    const updatHosptial=await db.hospital.update({where:{id:id},data:{
      name: name as string,
      vision: vision as string,
      email: email as string,
      description: description as string,
      phone: phone as string,
      telephone: telephone as string,
      img: imagePath,
      goal: goal as string,
      message: message as string,
    }})
    if (nameImg !== "" && file.size>0) {
      const deltImg = path.join(process.cwd(), 'public/images', nameImg as string);
         if (fs.existsSync(deltImg)){
           fs.promises.unlink(deltImg)
         
         }
           
           
         }
    return NextResponse.json('تم التعديل بنجاح')
  
} catch (error:any) {
  if (error.code == "P2002") {
    return NextResponse.json(
      { message: " اسم الفرع موجود بالفعل" },
      { status: 409 }
    );
  }
  
  return NextResponse.json(
    { message: "خطأ في تحديث الفرع" },
    { status: 500 }
  );
}

}