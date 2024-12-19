import db from "@/db/db";
import { message } from "antd";
import { NextResponse } from "next/server";
import fs from "fs";
import { fi } from "date-fns/locale";
import path from "path";
export async function POST(request: Request, res: Response) {
  const formData = await request.formData();

  const headline = formData.get("headline");
  const title = formData.get("title");
  const depName = formData.get("depName");
  const userName = formData.get("userName");

  const file = formData.get("img") as File;
  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف

  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    imagePath = `img_News${Date.now()}.${file.name.split(".").pop()}`;
    await fs.promises.writeFile(
      `${process.cwd()}/public/images/${imagePath}`,
      Buffer.from(data)
    );
  }

  try {
    const user = await db.users.findFirst({
      where: { userName: userName as any },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "لايوجد مستخدم " }, { status: 404 });
    }

    const departmentId = await db.department.findFirst({
      where: { depName: depName as any },
      select: { id: true },
    });

    if (!departmentId) {
      return NextResponse.json({ message: "لايوجد قسم " }, { status: 404 });
    }

    await db.news.create({
      data: {
        hospital: { connect: { id: "cm3ajydoz000211ovixhoejny" } },
        headline: headline as string,
        title: title as string,
        createdAt:new Date(),

        img: imagePath,
        user: {
          connect: {
            id: user.id,
          },
        },
        department: {
          connect: {
            id: departmentId.id,
          },
        },
      },
      include: { user: true, department: true },
    });
    return NextResponse.json({ message: "تم الإضافة بنجاح" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ في إضافة القسم" });
  }
}
export async function PUT(request: Request, res: Response) {
  const formData = await request.formData();

  const headline = formData.get("headline");
  const title = formData.get("title");
  const depName = formData.get("depName");
  const userName = formData.get("userName");
  const id = formData.get("id");
  const file = formData.get("img") as any;
 
  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف
  const nameImg = formData.get("nameImg");
  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    imagePath = `img_News${Date.now()}.${file.name.split(".").pop()}`;

    await fs.promises.writeFile(
      `${process.cwd()}/public/images/${imagePath}`,
      Buffer.from(data)
    );
  } else {
    imagePath = file as any;
  }

  try {
    const user = await db.users.findFirst({
      where: { userName: userName as any },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "لايوجد مستخدم " }, { status: 404 });
    }

    const departmentId = await db.department.findFirst({
      where: { depName: depName as any },
      select: { id: true },
    });

    if (!departmentId) {
      return NextResponse.json({ message: "لايوجد قسم " }, { status: 404 });
    }
    
    const newNews = await db.news.update({
      where: { id: id as string },
      data: {
        headline: headline as string,
        title: title as string,
        img: imagePath,
        user: {
          connect: {
            id: user.id,
          },
        },
        department: {
          connect: {
            id: departmentId.id,
          },
        },
      },
      include: { user: true, department: true },
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
    return NextResponse.json({ message: "تم التعديل بنجاح" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ في تعديل القسم" });
  }
}
export async function GET() {
  try {
    const news = await db.news.findMany({
      where: { isDeleted: false },
      include: { department: true, user: true, hospital: true },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { message: "خظأ في جلب  الأخبار" },
      { status: 500 }
    );
  }
}
