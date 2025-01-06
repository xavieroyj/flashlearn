import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const isLoggedIn = session?.user !== undefined;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[1200px] rounded-full bg-black/90 backdrop-blur-md border border-white/10 px-4 py-2"
      >
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/icon.png"
                alt="FlashLearn"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>
            <span className="font-outfit font-bold text-lg bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              FlashLearn
            </span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Button
                asChild
                className="bg-white hover:bg-white/90 text-black rounded-full px-6"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full px-6 border-2 border-white/25"
                >
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button
                  asChild
                  className="bg-white hover:bg-white/90 text-black rounded-full px-6"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}