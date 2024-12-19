import db from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const blog = await db.blog.findMany({
        orderBy:{createdAt:"desc"},take:10,
        where: { isDeleted: false} ,
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
  