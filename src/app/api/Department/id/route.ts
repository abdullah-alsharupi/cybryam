import db from "@/db/db";
import { request } from "http";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id"); // استخراج المعرف من جسم الطلب

  try {
    const departments = await db.department.findMany({
      where: { OR:[{depName: id as string,},{id:id as string}],isDeleted:false},
      select: {
        description: true,
        img: true,
        depName: true,
        doctors: {
          where: { isDeleted: false },
          select: {
            doctorName: true,
            specialist: true,
            img: true,
            phone: true,
            id:true
          },
        },
      },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error(error); // طباعة الخطأ في السجل
    return NextResponse.json(
      { message: "Error fetching departments" },
      { status: 500 }
    ); // إرجاع 500 في حالة وجود خطأ
  }
}
export async function PUT(request: Request) {
  const { id } = await request.json(); // استخراج المعرف من جسم الطلب

  try {
    const departments = await db.department.update({
      where: { id: id as any },
      data: { isDeleted: true },
    });

    if (departments) {
      return NextResponse.json(departments);
    }
  } catch (error) {
    console.error(error); // طباعة الخطأ في السجل
    return NextResponse.json(
      { message: "خطأ في حذف القسم", error },
      { status: 500 }
    ); // إرجاع 500 في حالة وجود خطأ
  }
}
