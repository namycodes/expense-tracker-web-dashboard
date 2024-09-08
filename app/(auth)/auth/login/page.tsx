import LogInBanerImage from "@/components/custom/loginBannerImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/forms/login";

export default function Login() {
	return (
		<div className="flex justify-center gap-10 items-center h-screen">
			<LogInBanerImage />
			<Card className="w-[500px]">
				<CardHeader>
					<CardTitle className="text-center">Sign in to continue</CardTitle>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}
