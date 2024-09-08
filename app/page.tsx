"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField } from "@/components/ui/form";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import ExpenseForm from "@/forms/expense";
import { Currencies } from "@/lib/currencies";
import { pacifico } from "@/public/fonts/font";
import { PreferenceSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
	LucideArrowLeft,
	LucideArrowRight,
	LucideCog,
	LucideEdit2,
	LucideLoader2,
	LucideMoon,
	LucidePlus,
	LucideSun,
	LucideUser,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePrefernces } from "./provider";

interface expenseProp {
	_id: string;
	title: string;
	income: number;
	expenseAmount: number;
	dateofExpense: Date;
	description: string;
}

export default function Home() {
	const [checked, setChecked] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const { preferences } = usePrefernces();

	const form = useForm<z.infer<typeof PreferenceSchema>>({
		resolver: zodResolver(PreferenceSchema),
		defaultValues: {
			currency: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof PreferenceSchema>) => {
		setIsSaving(true);
		try {
			const response = await fetch("/api/preferences", {
				body: JSON.stringify({
					...values,
				}),
				method: "PATCH",
			});
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setIsSaving(false);
			}
			if (!response.ok) {
				const data = await response.json();
				console.log(data);
				setIsSaving(false);
			}
		} catch (error) {
			setIsSaving(false);
			console.log(error);
		}
	};
	const handleOnCheckedChange = async () => {
		setChecked(!checked);
	};
	const fetchExpenses = async () => {
		try {
			const response = await fetch("/api/expenses", {
				method: "GET",
			});
			if (response.ok) {
				const { data } = await response.json();
				console.log(data);
				return data;
			}
			if (!response.ok) {
				const data = await response.json();
				console.log(data);
			}
		} catch (error) {
			console.log(error);
			throw new Error("An error Occured");
		}
	};
	const { data, isFetching } = useQuery({
		queryKey: ["expenses"],
		queryFn: fetchExpenses,
	});

	return (
		<ResizablePanelGroup
			className="h-screen max-h-screen w-full"
			direction="horizontal"
		>
			<ResizablePanel className="p-5 flex flex-col gap-2" defaultSize={20}>
				<div className="flex gap-5 justify-between items-center">
					<h1 className="text-xl">Settings</h1>
					<LucideCog />
				</div>
				<hr />
				<h1>Preferences</h1>
				<hr />
				<div className="flex justify-between items-center">
					<h1>Theme</h1>
					<div className="flex items-center gap-2">
						{checked ? <LucideMoon /> : <LucideSun />}
						<Switch
							checked={checked}
							onCheckedChange={handleOnCheckedChange}
							aria-readonly
						/>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<h1>Currency</h1>
					<div className="flex items-center gap-3">
						{preferences.map((preference: any) => (
							<h3 key={preference?._id}>{preference?.currency}</h3>
						))}

						<HoverCard>
							<HoverCardTrigger asChild>
								<LucideEdit2
									size={15}
									className="hover:scale-110 hover:cursor-pointer"
								/>
							</HoverCardTrigger>
							<HoverCardContent className="flex gap-3 flex-col">
								<h1>Select your Currency</h1>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="flex flex-col gap-3"
									>
										<FormField
											control={form.control}
											name="currency"
											render={({ field }) => (
												<FormControl>
													<Select
														onValueChange={field.onChange}
														value={field.value}
													>
														<SelectTrigger>
															<SelectValue placeholder="Choose your curency" />
														</SelectTrigger>
														<SelectContent>
															{Currencies.map((currency) => (
																<SelectItem value={currency.currency}>
																	{currency.name} - {currency.currency}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
											)}
										/>
										<Button
											variant={"outline"}
											disabled={isSaving}
											type="submit"
										>
											{isSaving ? (
												<LucideLoader2 className="animate-spin" />
											) : (
												"Save"
											)}
										</Button>
									</form>
								</Form>
							</HoverCardContent>
						</HoverCard>
					</div>
				</div>
				<div>
					<h1>Profile</h1>
				</div>
				<hr />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={80} className="p-5 flex flex-col gap-5">
				<h1
					className={`text-2xl text-transparent bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text ${pacifico.className}`}
				>
					Welcome to the ultimate expense tracker
				</h1>
				<div className="flex gap-10">
					<Card className="w-[200px]">
						<CardHeader>
							<CardTitle>Income</CardTitle>
						</CardHeader>
						<CardContent>
							{preferences.map((preference: any) => (
								<h1>{preference?.currency} 100</h1>
							))}
						</CardContent>
					</Card>
					<Card className="w-[200px]">
						<CardHeader>
							<CardTitle>Expenses</CardTitle>
						</CardHeader>
						<CardContent>
							{preferences.map((preference: any) => (
								<h1>{preference?.currency} 100</h1>
							))}
						</CardContent>
					</Card>
					<Card className="w-[200px]">
						<CardHeader>
							<CardTitle>Savings</CardTitle>
						</CardHeader>
						<CardContent>
							{preferences.map((preference: any) => (
								<h1>{preference?.currency} 100</h1>
							))}
						</CardContent>
					</Card>
				</div>
				<div className="flex justify-between items-center">
					<h1 className="text-2xl">Daily Expenses</h1>
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<LucidePlus /> Add Expense
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-md bg-white">
							<DialogHeader>
								<DialogTitle>Add An Expense</DialogTitle>
							</DialogHeader>
							<ExpenseForm />
						</DialogContent>
					</Dialog>
				</div>
				<hr />
				<div className="grid grid-cols-3 gap-3">
					{isFetching ? (
						<>
							<Skeleton className="h-[150px]" />
							<Skeleton className="h-[150px]" />
							<Skeleton className="h-[150px]" />
						</>
					) : (
						""
					)}
					{!isFetching &&
						data?.expenses &&
						data?.expenses.map((expense: expenseProp) => {
							return (
								<Card className="h-[140px]" key={expense?._id}>
									<CardHeader>
										<CardTitle>{expense?.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<h1 className="text-red-500">-${expense.expenseAmount}</h1>
										<h1 className="text-gray-500 text-sm">
											{expense.description}
										</h1>
									</CardContent>
								</Card>
							);
						})}
				</div>
				{!isFetching && data?.expenses.length <= 0 && (
					<div className="flex justify-center items-center">
						<Image
							src={require("@/public/empty.svg")}
							width={200}
							height={200}
							alt="empyt cart"
						/>
					</div>
				)}
				<div className="flex justify-between items-center">
					<Button>
						<LucideArrowLeft />
						Prev
					</Button>
					<Button>
						Next <LucideArrowRight />
					</Button>
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
