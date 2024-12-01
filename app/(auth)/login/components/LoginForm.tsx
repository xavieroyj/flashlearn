"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { LoginFormData, loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
		const { error } = await authClient.signIn.email({
		  email: data.email,
		  password: data.password,
		});
  
		if (error) {
		  setError(error.message || "");
		  return;
		}
  
		router.push("/dashboard");
	  } catch (err) {
		setError("An unexpected error occurred");
	  } finally {
		setLoading(false);
	  }
	};


	return (
		<form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-4">
			<div className="grid gap-2">
				{error && <div className="text-sm text-destructive">{error}</div>}
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					{...form.register("email")}
					type="email"
					placeholder="name@example.com"
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
				/>
				{form.formState.errors.password && (
					<p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
				)}
			</div>
			<Button className="w-full" type="submit" disabled={loading}>
				{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
				Sign in
			</Button>
		</form>
	)
}