"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { LoginFormData, loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (data: LoginFormData) => {
		setError("");
		setLoading(true);

		try {
			const { error: signInError } = await authClient.signIn.email({
				email: data.email,
				password: data.password,
			});

			if (signInError) {
				setError(signInError.message || "Invalid credentials");
				return;
			}

			router.push("/dashboard");
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
			{error && (
				<div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-inter">
					<div className="flex items-center gap-2">
						<AlertCircle className="w-4 h-4" />
						{error}
					</div>
				</div>
			)}

			<div className="space-y-2">
				<Label
					htmlFor="email"
					className="text-sm font-medium font-inter text-muted-foreground/70"
				>
					Email address
				</Label>
				<div className="relative group">
					<Input
						id="email"
						type="email"
						autoComplete="email"
						placeholder="name@example.com"
						className="h-12 bg-white/[0.03] border-white/10 text-foreground font-inter 
								 placeholder:text-muted-foreground/30 rounded-xl 
								 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 
								 transition-all group-hover:border-primary/20"
						{...form.register("email")}
					/>
					{form.formState.errors.email && (
						<div className="absolute inset-y-0 right-3 flex items-center">
							<AlertCircle className="w-5 h-5 text-red-400" />
						</div>
					)}
				</div>
				{form.formState.errors.email && (
					<p className="text-sm font-inter text-red-400">
						{form.formState.errors.email.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="password"
					className="text-sm font-medium font-inter text-muted-foreground/70"
				>
					Password
				</Label>
				<div className="relative group">
					<Input
						id="password"
						type="password"
						autoComplete="current-password"
						className="h-12 bg-white/[0.03] border-white/10 text-foreground font-inter 
								 placeholder:text-muted-foreground/30 rounded-xl 
								 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 
								 transition-all group-hover:border-primary/20"
						{...form.register("password")}
					/>
					{form.formState.errors.password && (
						<div className="absolute inset-y-0 right-3 flex items-center">
							<AlertCircle className="w-5 h-5 text-red-400" />
						</div>
					)}
				</div>
				{form.formState.errors.password && (
					<p className="text-sm font-inter text-red-400">
						{form.formState.errors.password.message}
					</p>
				)}
			</div>

			<Button
				type="submit"
				disabled={loading}
				className="w-full h-12 bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd] 
						 hover:brightness-110 text-primary-foreground font-medium font-inter 
						 rounded-xl transition-all relative overflow-hidden"
			>
				<div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
				<span className="relative flex items-center justify-center gap-2">
					{loading ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Signing in...
						</>
					) : (
						"Sign in"
					)}
				</span>
			</Button>
		</form>
	);
}