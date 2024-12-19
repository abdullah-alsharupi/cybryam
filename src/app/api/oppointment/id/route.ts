import db from "@/db/db";
import { message } from "antd";
import { request } from "http";
import { url } from "inspector";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const {searchParams}=new URL(request.url)
   const id=searchParams.get('id')?.toString()
    try {
        const oppontement=await db.oppontement.findMany({
            where:{patient:{id:id}},
            include:{doctor:{select:{doctorName:true,specialist:true ,department:{select:{depName:true}},img:true,weekwork:{select:{day:true,startTime:true,endTime:true}}}},patient:{select:{patName:true,address:true,phone:true,gender:true}}}
        })
        if(oppontement.length==0){
            return NextResponse.json(oppontement)
            
        }
        return NextResponse.json(oppontement)
    } catch (error) {
        return NextResponse.json({message:"error server"},{status:500})
    }
    
} 