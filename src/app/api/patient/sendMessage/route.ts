import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import twilio from "twilio";
import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { patientId, Message } = body;

  try {
    const patient = await db.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return NextResponse.json(
        { message: "not found patient" },
        { status: 404 }
      );
    }
    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
    // Send email
    if (patient.email) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SMTP_EMAIL,
          pass: SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: patient.email,
        subject: "Appointment Message",
        text: Message,
      });
    }

    // Send SMS
    //   if (patient.phone) {
    //     const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    //     await twilioClient.messages.create({
    //       body: message,
    //       from: process.env.TWILIO_PHONE_NUMBER,
    //       to: patient.phone,
    //     });
    //   }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
  //    else {
  //     res.setHeader('Allow', ['POST']);
  //     return res.status(405).end(`Method ${req.method} Not Allowed`);
  //   }
}
