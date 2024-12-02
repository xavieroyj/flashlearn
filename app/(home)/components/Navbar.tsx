import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Navbar() {
    // Get whether the user is logged in
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const isLoggedIn = session?.user !== undefined;

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Book className="h-6 w-6" />
                    <span className="font-bold text-xl">FlashLearn</span>
                </Link>

                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <Button asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" asChild>
                        <Link href="/login">Sign in</Link>
                    </Button>
                    <Button asChild>
                            <Link href="/register">Get Started</Link>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}