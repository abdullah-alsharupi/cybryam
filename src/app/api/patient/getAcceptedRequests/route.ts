import db from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
  
    try {
      const doctors = await db.oppontement.findMany({
        where: {status:'CONFIRMED',isDeleted:false},
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
        ); 
      }
    } catch (error) {
      console.error(error); 
      return NextResponse.json(
        { message: "Error fetching departments" },
        { status: 500 }
      ); 
    }
  }