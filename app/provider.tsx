"use client";

import { PreferenceSchema } from "@/utils/zodSchema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { z } from "zod";

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<PreferenceProvider>{children}</PreferenceProvider>
		</QueryClientProvider>
	);
}

interface ContextProps {
	preferences: z.infer<typeof PreferenceSchema>[];
	setPreferences: Dispatch<
		SetStateAction<
			{
				currency: string;
			}[]
		>
	>;
}

const PreferencesContext = createContext<ContextProps | any>(undefined);

const PreferenceProvider = ({ children }: { children: React.ReactNode }) => {
	const [preferences, setPreferences] = useState<
		z.infer<typeof PreferenceSchema>[]
	>([]);
	const fetchPreferences = async () => {
		try {
			const response = await fetch("/api/preferences", {
				method: "GET",
			});
			if (response.ok) {
				const { data } = await response.json();
				const { preferences } = data;
				setPreferences(preferences);
				console.log(preferences);
			}
			if (!response.ok) {
				const data = await response.json();
				console.log(data);
			}
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchPreferences();
	}, []);

	return (
		<PreferencesContext.Provider value={{ preferences, setPreferences }}>
			{children}
		</PreferencesContext.Provider>
	);
};

export const usePrefernces = () => useContext(PreferencesContext);
