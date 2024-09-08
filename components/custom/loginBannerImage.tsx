import Image from "next/image";

export default function LogInBanerImage() {
	return (
		<div className="flex flex-col gap-10">
			<div>
				<h1
					className={`text-2xl  text-transparent bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text`}
				>
					Welcome to the Ultimate Expense Tracker
				</h1>
				<h2 className="text-[14px] text-gray-500">
					Making you see and improve your money spending habits is our priority!
				</h2>
			</div>
			<Image
				src={require("@/public/exp.svg")}
				width={500}
				height={500}
				alt="image-exp"
			/>
		</div>
	);
}
