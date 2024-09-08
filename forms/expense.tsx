"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ExpenseSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ExpenseForm() {
	const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
	// const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof ExpenseSchema>>({
		resolver: zodResolver(ExpenseSchema),
		defaultValues: {
			title: "",
			expenseAmount: "",
			dateOfExpense: "",
			description: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof ExpenseSchema>) => {
		// mutation.mutate({
		// 	...values,
		// });
		setIsSubmiting(true);
		try {
			const response = await fetch("/api/expenses", {
				body: JSON.stringify({
					...values,
				}),
				method: "POST",
			});
			if (response.ok) {
				const { data } = await response.json();
				const { preferences } = data;
				console.log(preferences);
				setIsSubmiting(false);
				form.reset();
			}
			if (!response.ok) {
				const data = await response.json();
				console.log("Here", data);
				setIsSubmiting(false);
			}
		} catch (error) {
			setIsSubmiting(false);
			console.log(error);
		}
	};

	// const mutation = useMutation({
	// 	mutationFn: onSubmit,
	// 	onSuccess: () => {
	// 		// Invalidate and refetch
	// 		queryClient.invalidateQueries({ queryKey: ["expenses"] });
	// 	},
	// });
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-3"
			>
				<FormField
					name="title"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value={"Nshima"}>Nshima</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					name="expenseAmount"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="Expense Amount">Expense Amount</FormLabel>
							<FormControl>
								<Input placeholder="$100" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="dateOfExpense"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="Expense Date">Expense Date</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="description"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="Description">Description</FormLabel>
							<FormControl>
								<Textarea placeholder="The money was spent on" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isSubmiting} type="submit">
					{isSubmiting ? (
						<LucideLoader2 className="animate-spin" />
					) : (
						"Add Expense"
					)}
				</Button>
			</form>
		</Form>
	);
}
