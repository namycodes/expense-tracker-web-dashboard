"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { PreferenceSchema } from "@/utils/zodSchema";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { z } from "zod";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<QueryClientProvider
				client={
					new QueryClient({
						defaultOptions: {
							queries: {
								staleTime: 60 * 1000,
							},
						},
					})
				}
			>
				<PreferenceProvider>{children}</PreferenceProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

interface ContextProps {
	data: z.infer<typeof PreferenceSchema>[];
	isFetching: boolean;
}

const PreferencesContext = createContext<ContextProps | undefined>({
	data: [],
	isFetching: false,
});

const PreferenceProvider = ({ children }: { children: React.ReactNode }) => {
	const fetchPreferences = async () => {
		try {
			const response = await fetch("/api/preferences", {
				method: "GET",
			});
			if (response.ok) {
				const { data } = await response.json();
				const { preferences } = data;
				return preferences;
			}
			if (!response.ok) {
				const data = await response.json();
				return data;
			}
		} catch (err) {
			throw new Error("Internal Server Error");
		}
	};
	const { data, isFetching } = useQuery({
		queryKey: ["preferences"],
		queryFn: fetchPreferences,
	});

	return (
		<PreferencesContext.Provider value={{ data, isFetching }}>
			{children}
		</PreferencesContext.Provider>
	);
};

export const usePrefernces = () => useContext(PreferencesContext);
