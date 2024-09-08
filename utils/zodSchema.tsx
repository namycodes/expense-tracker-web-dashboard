import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string({ required_error: "Email is required" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(8, "Password should be at least 8 characters and above"),
});

export const SignUpSchema = LoginSchema.extend({
	phone: z.string({ required_error: "Phone number is required" }),
	firstname: z.string({ required_error: "Firstname is required" }),
	lastname: z.string({ required_error: "Lastname is required" }),
	username: z
		.string({ required_error: "Username is required" })
		.min(3, "usernam should at least be 3 characters long"),
	confirmPassword: z.string({ required_error: "confirm password is required" }),
});

export const ExpenseSchema = z.object({
	title: z.string(),
	expenseAmount: z.string(),
	dateOfExpense: z.string(),
	description: z.string(),
});
export const PreferenceSchema = z.object({
	currency: z.string(),
});
