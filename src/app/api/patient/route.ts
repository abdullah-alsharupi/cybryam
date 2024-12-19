import db from "@/db/db";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date(); // Get the current date in YYYY-MM-DD format

    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 - 1);
 // const getOppontement = await db.oppontement.findMany({
    //   distinct:"docID",

    //   where: {
        
    //     isDeleted:false
    //   },
    //   orderBy:{createdAt:"desc"},
      
    //   include: { doctor: {select:{_count:{select:{ patient:true}},department:{select:{depName:true}}}},patient:true },
    // });
    const getOppontement = await db.oppontement.findMany({
      
      where: {
        isDeleted:false
      },
      orderBy:{createdAt:"desc"},
      include: { doctor: true, patient: true },
    });

    return NextResponse.json(getOppontement);
  } catch (error) {
    return NextResponse.json(
      { message: "خطأ في عملية الجلب" },
      { status: 500 }
    );
  }
}

export async function POSt() {
  try {
    const today = new Date(); // Get the current date in YYYY-MM-DD format

    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 - 1);

    const getOppontement = await db.oppontement.findMany({
      
      where: {
        isDeleted:false
      },
      orderBy:{createdAt:"desc"},
      include: { doctor: true, patient: true },
    });

    return NextResponse.json(getOppontement);
  } catch (error) {
    return NextResponse.json(
      { message: "خطأ في عملية الجلب" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  const body=await request.json();
  const {patId,docId,patName,status,date}=body

  try {
    const update = await db.oppontement.update({
      where: { 
        
        docID_patID: { docID: docId as string, patID: patId as string },
  
      },
      data: { patient:{update:{patName:patName}},
      status:status,date:date},
    });

    if (update) {
      return NextResponse.json(
        { message: `update successfully  ` },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error); // طباعة الخطأ في السجل
    return NextResponse.json({ message: "error   ", error }, { status: 500 }); // إرجاع 500 في حالة وجود خطأ
  }
}
