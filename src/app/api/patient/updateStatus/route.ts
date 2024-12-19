import db from "@/db/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
const formData=await request.formData();
const patId = formData.get("patId")?.toString();
  const docId = formData.get("docId")?.toString();

  const status = formData.get("status") as any;
  console.log("docId",docId,"patId",patId,status)

  if (!docId || !patId) {
    return NextResponse.json({ error: "Missing docId or patId" }, { status: 400 });
  }

  try {
    const updatedAppointment = await db.oppontement.update({
      where: { docID_patID: { docID: docId, patID: patId } },
      data: { status: status }
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
