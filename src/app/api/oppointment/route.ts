import db from "@/db/db";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { patName, phone, address, gender, doctor, date, id } =await request.json();
  

  try {
    const Oppointment = await db.oppontement.create({
      data: {
        status: "PENDING",

        patient: {
          connectOrCreate: {
            where: { id: id },
            create: { patName, phone, address, gender },
          },
        },
        date: date,
        
        doctor: { connect: { id: doctor } },
      },
    });
    if (Oppointment) {
      const response = NextResponse.json(Oppointment);
      response.cookies.set("PatientId", Oppointment.patID, {
        path: "/",

        maxAge: 60 * 60 * 24 * 2, // 2 أيام
      });
      response.cookies.set("PatientName", patName, {
        path: "/",

        maxAge: 60 * 60 * 24 * 2, // 2 أيام
      });
      return response;
    }
  } catch (error: any) {
    if (error.code == "P2002") {
      console.log(error.code);
      return NextResponse.json(
        { message: "  الحجز موجود بالفعل" },
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
    const today = new Date(); // Get the current date in YYYY-MM-DD format

    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 - 1);

    const getAppointement = await db.oppontement.findMany({
      where: {
        date: {
          gte: startDate.toString(),
          lte: endDate.toString(),
        },
      },
      include: {
        patient: { select: { patName: true } },
        doctor: { select: { doctorName: true } },
      },
    });
    return NextResponse.json(getAppointement);
  } catch (error) {
    return NextResponse.json(
      { message: "خطأ في جلب الحجوزات اليومية" },
      { status: 500 }
    );
  }
}
