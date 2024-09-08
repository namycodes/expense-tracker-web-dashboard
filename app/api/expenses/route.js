import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;
export async function GET(request) {

	const url = new URL(request.url)
	const page = url.searchParams.get('page')

	const cookieStorage = cookies();
	const token = cookieStorage.get(COOKIE_NAME);
	if (!token || token.value === undefined) {
		return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
	}
	const decoded = await jwt.decode(
		token?.value
	);
	console.log(decoded);
	try {
		const response = await fetch(`${API_URL}/expenses/${decoded?._id}?page=${page}&limit=3`, {
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
			method: "GET",
		});
		if (response.ok) {
			const {data} = await response.json();
			console.log(data);
			return NextResponse.json({ data }, { status: 200 });
		}
		if (!response.ok) {
			const data = await response.json();
			console.log(data);
			return NextResponse.json({ data }, { status: 500 });
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function POST(request) {
	const {
		title,
		expenseAmount,
		dateOfExpense,
		description
	} = await request.json()
	const cookieStorage = cookies();
	const token = cookieStorage.get(COOKIE_NAME);
	if (!token || token.value === undefined) {
		return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
	}
	const decoded = await jwt.decode(
		token?.value
	);
	try {
		const response = await fetch(`${API_URL}/expenses/${decoded?._id}`, {
			headers: {
				Authorization: `Bearer ${token.value}`,
				"Content-type":"application/json"
			},
			method: "POST",
			body: JSON.stringify({
				title,
  				expenseAmount,
  				dateOfExpense,
  				description
			}),

		});
		if (response.ok) {
			const {data} = await response.json();
			console.log(data);
			return NextResponse.json({ data }, { status: 200 });
		}
		if (!response.ok) {
			const data = await response.json();
			console.log(data);
			return NextResponse.json({ data }, { status: 500 });
		}
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
