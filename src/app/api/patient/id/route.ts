import db from "@/db/db";
import { message } from "antd";
import { request } from "http";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  try {
    const doctors = await db.oppontement.findFirst({
      where: { patID: id as string },
      include: {
        doctor: true,
        patient: true,
      },
    });
    if (doctors !== null) {
      return NextResponse.json(doctors);
    } else {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      ); // إرجاع 404 إذا لم يتم العثور على الأقسام
    }
  } catch (error) {
    console.error(error); // طباعة الخطأ في السجل
    return NextResponse.json(
      { message: "Error fetching departments" },
      { status: 500 }
    ); // إرجاع 500 في حالة وجود خطأ
  }
}
export async function PUT(request: Request) {
  const formData = await request.formData();
  const patId = formData.get("patId")?.toString();
  const docId = formData.get("docId")?.toString();
  try {
    const softDeleteDoctor = await db.oppontement.update({
      where: {
        docID_patID: { docID: docId as string, patID: patId as string },
      },
      data: { isDeleted: true },
    });

    if (softDeleteDoctor) {
      return NextResponse.json({ message: `تم حذف الدكتور` }, { status: 200 });
    }
  } catch (error) {
    console.error(error); // طباعة الخطأ في السجل
    return NextResponse.json(
      { message: "خطأ في حذف الدكتور", error },
      { status: 500 }
    ); // إرجاع 500 في حالة وجود خطأ
  }
}
