import { NextResponse } from "next/server";
import { serialize } from "cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_AGE = process.env.NEXT_PUBLIC_MAX_AGE;
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;
export async function POST(request) {
	const { email, password } = await request.json();
	try {
		const response = await fetch(`${API_URL}/auth/signin`, {
			body: JSON.stringify({
				email,
				password,
				returnUrl: "/",
				rememberLogin: true,
			}),
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
		});
		if (response.ok) {
			const { token, status } = await response.json();
			const serialised = serialize(COOKIE_NAME, token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: MAX_AGE,
				path: "/",
			});
			return new Response(JSON.stringify(status), {
				status: 200,
				headers: {
					"Set-Cookie": serialised,
				},
			});
		}
		if (!response.ok) {
			const { message } = await response.json();
			return NextResponse.json({ message }, { status: 401 });
		}
	} catch (error) {
		return NextResponse.json(
			{
				status: "fail",
				message: "Internal server error",
			},
			{ status: 500 }
		);
	}
}
