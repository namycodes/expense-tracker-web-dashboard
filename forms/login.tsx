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
import { LoginSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
	const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
	const [errMsg, setErrMsg] = useState<string>("");
	const { replace } = useRouter();
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		setIsSubmiting(true);
		const { email, password } = values;
		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
				}),
			});
			if (response.ok) {
				const data = await response.json();
				setIsSubmiting(false);
				console.log(data);
				replace("/");
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
				className="flex flex-col gap-5 h-full"
			>
				{errMsg !== "" ? (
					<h1 className="text-red-700 text-center text-sm">{errMsg}</h1>
				) : (
					""
				)}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="Email">Email</FormLabel>
							<FormControl>
								<Input {...field} placeholder="john@yahoo.com" type="text" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
				<Button disabled={isSubmiting} type="submit">
					{isSubmiting ? <LucideLoader2 className="animate-spin" /> : "Login"}
				</Button>
				<Link href={"/auth/signup"} className="hover:underline">
					Don{"'"}t have an account? Signup
				</Link>
			</form>
		</Form>
	);
}
