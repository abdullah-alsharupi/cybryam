import db from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id")?.toString(); 
  try {
    const blogs = await db.blog.findUnique({
      where: {id:id},
      include: { hospital:true },
    });
    if (blogs == null) {
      return NextResponse.json({ message: "المدونات غير موجودة" }, { status: 404 }); // إرجاع 404 إذا لم يتم العثور على الأقسام
    }
    return NextResponse.json(blogs);
  } catch (error) {
    console.error(error); // طباعة الخطأ في السجل
    return NextResponse.json({ message: "خطأ في البيانات" }, { status: 500 }); // إرجاع 500 في حالة وجود خطأ
  }
}
export async function PUT(request: Request) {
  const { id } = await request.json(); // استخراج المعرف من جسم الطلب

  try {
    const softDeleteNews = await db.blog.update({
      where: { id: id as any },
      data: { isDeleted: true },
    });

    if (softDeleteNews) {
      return NextResponse.json({ message: `تم حذف المدونة` }, { status: 200 });
    }
  } catch (error) {
    console.error(error); // طباعة الخطأ في السجل
    return NextResponse.json(
      { message: "خطأ في حذف الخبر", error },
      { status: 500 }
    ); // إرجاع 500 في حالة وجود خطأ
  }
}
