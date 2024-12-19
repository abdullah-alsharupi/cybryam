import db from "@/db/db";
import { hashSync } from "bcrypt";
import { JWT_SECRET } from "@/secret";
import { message } from "antd";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    email,
    userName,
    password,
    roleName,
    permissionPageDepartments,
    permissionPageDoctors,
    permissionPageNews,
    permissionPagePatients,
    permissionPageBlogs
  } = await request.json();

  // تحويل الجسم إلى JSON
  try {
    let users = await db.users.findFirst({
      where: { email: email as any },
    });

    if (users) {
      return NextResponse.json(
        { message: " الايميل مأخوذ مسبقا" },
        { status: 401 }
      );
    }

    const user = await db.users.create({
      data: {
        email,
        userName,
        password: hashSync(password, 10),
        role: roleName,
        permissions: {
          connect: [
            { id: permissionPageDoctors },
            { id: permissionPageNews },
            { id: permissionPagePatients },
            {id:permissionPageBlogs},
            { id: permissionPageDepartments },
          ],
        },
        hospital:{connect:{id:"cm3ajydoz000211ovixhoejny"}}
      },
    });
    if (user) {
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 24); // 24 hours from now

      const session = await db.session.create({
        data: {
          userId: user.id,
          expirationDate: expirationDate,
        },
      });
      return NextResponse.json(user);
    }
  } catch (error) {
    console.error(error); // طباعة الخطأ في السجل
    return NextResponse.json(
      { message: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await db.users.findMany({
      where: { isDeleted: false },
      include: { permissions: true },
    });
    if (users) return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "خطأ في جلب بيانات  المستخدمين" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { id } = await request.json();

  try {
    const users = await db.users.update({
      where: { id: id },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "خطأ في جلب بيانات  المستخدمين" },
      { status: 500 }
    );
  }
}
