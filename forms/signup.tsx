"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignupForm() {
	const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
	const [errMsg, setErrMsg] = useState<string>("");
	const { push } = useRouter();
	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			phone: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
		setIsSubmiting(true);
		try {
			const response = await fetch("/api/auth/sigup", {
				method: "POST",
				body: JSON.stringify({
					...values,
				}),
			});
			if (response.ok) {
				const data = await response.json();
				setIsSubmiting(false);
				console.log(data);
				push("/auth/login");
			}
			if (!response.ok) {
				const { message } = await response.json();
				setErrMsg(message);
				setIsSubmiting(false);
			}
		} catch (error) {
			console.log(error);
			setIsSubmiting(false);
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-3 h-full"
			>
				{errMsg !== "" ? (
					<h1 className="text-red-700 text-center text-sm">{errMsg}</h1>
				) : (
					""
				)}
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="firstname"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="FristName">Firstname</FormLabel>
								<FormControl>
									<Input {...field} placeholder="john" type="text" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastname"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="LastName">Lastname</FormLabel>
								<FormControl>
									<Input {...field} placeholder="doe" type="text" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="Username">Username</FormLabel>
							<FormControl>
								<Input {...field} placeholder="john-dew" type="text" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="Phone">Phone number</FormLabel>
								<FormControl>
									<Input {...field} placeholder="e.g 09748932--" type="text" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="Email">Email</FormLabel>
								<FormControl>
									<Input {...field} placeholder="john@yahoo.com" type="email" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="Password">Password</FormLabel>
								<FormControl>
									<Input {...field} placeholder="********" type="password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="confirmPassword">ConfirmPassword</FormLabel>
								<FormControl>
									<Input {...field} placeholder="********" type="password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button disabled={isSubmiting} type="submit">
					{isSubmiting ? <LucideLoader2 className="animate-spin" /> : "Signup"}
				</Button>
				<Link href={"/auth/login"} className="hover:underline">
					Already have an account? Login
				</Link>
			</form>
		</Form>
	);
}
