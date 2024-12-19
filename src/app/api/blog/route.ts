import db from "@/db/db";
import { message } from "antd";
import { NextResponse } from "next/server";
import fs from "fs";
import { useParams } from "next/navigation";
import path from "path";
export async function POST(request: Request, res: Response) {
  const formData = await request.formData();

  const content = formData.get("content");
  const title = formData.get("title");
 
  const file = formData.get("img") as File;
  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف

  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    imagePath = `img_Blog${Date.now()}.${file.name.split(".").pop()}`;

    await fs.promises.writeFile(
      `${process.cwd()}/public/images/${imagePath}`,
      Buffer.from(data)
    );
  }

  try {
    await db.blog.create({
      data: {
        hospital: { connect: { id: "cm3ajydoz000211ovixhoejny" } },
        title: title as string,
        content: content as string,
        img: imagePath,
      },
    });

    return NextResponse.json({ message: "تم الإضافة بنجاح" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ في إضافة المدونات" });
  }
}
export async function PUT(request: Request, res: Response) {
  const formData = await request.formData();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const content = formData.get("content");
  const title = formData.get("title");

  const file = formData.get("img") as File;
  
  let imagePath: string | null = null; // مسار الصورة سيكون null إذا لم يتم إرسال ملف
  const nameImg = formData.get("nameImg");
  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    imagePath = `img_Blog${Date.now()}.${file.name.split(".").pop()}`;

    await fs.promises.writeFile(
      `${process.cwd()}/public/images/${imagePath}`,
      Buffer.from(data)
    );
  } else {
    imagePath = file as any;
  }

  try {
 
   const updatBlog= await db.blog.update({
        where: { id: id as string },
        data: {
          title: title as string,
          content: content as string,
          hospital: { connect: { id: "cm3ajydoz000211ovixhoejny" } },
          img: imagePath,
          updatedAt:new Date().toISOString()

        },
        include: { hospital: true },
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
    const blog = await db.blog.findMany({
      where: { isDeleted: false },
      include: { hospital: true },
    });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { message: "خظأ في جلب  الأخبار" },
      { status: 500 }
    );
  }
}
