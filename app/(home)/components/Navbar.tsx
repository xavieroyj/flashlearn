import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Book className="h-6 w-6" />
                    <span className="font-bold text-xl">FlashLearn</span>
                </Link>
                
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" asChild>
                        <Link href="/login">Sign in</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Get Started</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}