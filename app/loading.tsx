import { LucideLoader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex justify-center items-center w-full h-screen">
			<LucideLoader2 className="animate-spin" />;
		</div>
	);
}
