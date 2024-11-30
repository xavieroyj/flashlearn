"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { registerSchema, type RegisterFormData } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Register() {
	const router = useRouter();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (data: RegisterFormData) => {
		setError("");
		setLoading(true);

		try {
			const { error } = await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: data.name,
			});

			if (error) {
				setError(error.message || "An unknown error occurred");
				return;
			}

			router.push("/login");
		} catch (err) {
			setError("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="mr-2 h-6 w-6"
					>
						<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
					</svg>
					FlashLearn
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&quot;FlashLearn has revolutionized the way I study. The AI-powered flashcards make learning efficient and enjoyable.&quot;
						</p>
						<footer className="text-sm">Sofia Davis</footer>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<Card>
						<CardHeader className="space-y-1">
							<CardTitle className="text-2xl font-bold">Create an account</CardTitle>
							<CardDescription>
								Enter your information below to create your account
							</CardDescription>
						</CardHeader>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<CardContent className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										{...form.register("name")}
										type="text"
										placeholder="John Doe"
									/>
									{form.formState.errors.name && (
										<p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
									)}
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										{...form.register("email")}
										type="email"
										autoComplete="email"
										placeholder="test@example.com"
									/>
									{form.formState.errors.email && (
										<p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
									)}
								</div>
								<div className="grid gap-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										{...form.register("password")}
										type="password"
										autoComplete="new-password"
									/>
									{form.formState.errors.password && (
										<p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
									)}
								</div>
								{error && (
									<div className="text-sm text-destructive">{error}</div>
								)}
							</CardContent>
							<CardFooter>
								<Button
									className="w-full"
									type="submit"
									disabled={loading}
								>
									{loading && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Sign up
								</Button>
							</CardFooter>
						</form>
					</Card>
				</div>
			</div>
		</div>
	);
}