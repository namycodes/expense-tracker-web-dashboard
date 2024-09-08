import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME
export async function GET(request) {
    const cookieStorage = cookies()
   
	try {
        const deleted = await cookieStorage.delete(COOKIE_NAME)
        console.log(deleted)
        return NextResponse.json({
            status:"logged Out"
        },{status: 200})
		
	} catch (error) {
		return NextResponse.json(
			{
				status: "fail",
				message: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
