import LogInBanerImage from "@/components/custom/loginBannerImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignupForm from "@/forms/signup";

export default function Signup() {
	return (
		<div className="flex justify-center gap-10 items-center h-screen">
			<LogInBanerImage />
			<Card className="w-[500px]">
				<CardHeader>
					<CardTitle className="text-center">Sign up to continue</CardTitle>
				</CardHeader>
				<CardContent>
					<SignupForm />
				</CardContent>
			</Card>
		</div>
	);
}
