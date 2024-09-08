import { NextResponse } from "next/server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function POST(request: Request) {
	const body = await request.json();
	try {
		const response = await fetch(`${API_URL}/auth/signup`, {
			body: JSON.stringify({
				...body,
			}),
		});
		if (response.ok) {
			const { message } = await response.json();
			return NextResponse.json(
				{
					message,
				},
				{ status: 201 }
			);
		}
		if (!response.ok) {
			const data = await response.json();
			return NextResponse.json(
				{
					data,
				},
				{ status: 500 }
			);
		}
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
