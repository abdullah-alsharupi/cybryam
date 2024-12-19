import db from "@/db/db";

import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();

  const depName = formData.get("depName");
  const description = formData.get("description");

  const file = formData.get("img") as File;

  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف

  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    imagePath = `img_Department${Date.now()}.${file.name.split(".").pop()}`;
    await fs.promises.writeFile(
      `${process.cwd()}/public/images/${imagePath}`,
      Buffer.from(data)
    );
  }
  
  try {
    const department = await db.department.create({
      data: {
        depName: depName as string,
        img: imagePath,
        description: description as string,
        hospital: { connect: { id: "cm3ajydoz000211ovixhoejny" } },
      },
    });
    if (department) return NextResponse.json(department);
  } catch (error: any) {
    if (error.code == "P2002") {
      return NextResponse.json(
        { message: " اسم القسم موجود بالفعل" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const departments = await db.department.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        depName: true,
        img: true,
        description: true,
        doctors: { where: { isDeleted: false } },
      },
    });
    // تحقق من نوع الطلب

    if (departments) return NextResponse.json(departments);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching departments" },
      { status: 500 }
    ); // إرجاع 500 في حالة وجود خطأ
  }
}
export async function PUT(request: Request, response: Response) {
  const formData = await request.formData();
  
  const depName = formData.get("depName");
  const description = formData.get("description");

  const file = formData.get("img") as any;

  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف
  const nameImg = formData.get("nameImg");
  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    imagePath = `img_Department${Date.now()}.${file.name.split(".").pop()}`;

    await fs.promises.writeFile(
      `${process.cwd()}/public/images/${imagePath}`,
      Buffer.from(data)
    );
  } else {
    imagePath = file as any;
  }

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  try {
    const department = await db.department.update({
      where: { id: id as any },
      data: {
        depName: depName as string,
        description: description as string,
        img: imagePath,
      },
    });
    if (nameImg !== "" && file.size > 0) {
      const deltImg = path.join(
        process.cwd(),
        "public/images",
        nameImg as string
      );
      if (fs.existsSync(deltImg)) {
        fs.promises.unlink(deltImg);
      }
    }
    return NextResponse.json(department);
  } catch (error: any) {
    if (error.code == "P2002") {
      return NextResponse.json(
        { message: " اسم القسم موجود بالفعل" },
        { status: 409 }
      );
    }

    // طباعة الخطأ في السجل
    return NextResponse.json(
      { message: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}
