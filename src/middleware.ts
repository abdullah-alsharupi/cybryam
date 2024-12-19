
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest, req: NextRequest) {
  let token = request.cookies.get("next-auth.session-token")?.value;
  const authHeader = request.headers.get("authorization");
  console.log("first")

  if (authHeader) {
    token = authHeader.split(" ")[1]; // إذا كان النوع هو Bearer
  }
  if (!token) {
    const url = request.nextUrl.clone();
    if (request.nextUrl.pathname == "/Dashboard") {
      url.pathname = "/login"; // تغيير المسار إلى /login
      return NextResponse.redirect(url);
    } if(request.url.includes("/api/Doctor")==false) {
      return NextResponse.json("Error server", { status: 500 });
    }
  }
}

// تحديد المسارات التي سيعمل عليها middleware
export const config = {
  matcher: [
    "/Dashboard/",
    "/Dashboard/user/",
    "/api/user/",
    "/api/Department/",
    "/api/News/",
    "/api/appointment/",
    "/api/Doctor/",
    "/api/patient/",
    "/Dashboard/",
    "/Dashboard/doctor/",
    "/Dashboard/news/",
    "/Dashboard/department/",
    "/Dashboard/patients/",
  ], // حدد المسارات المحمية
};
