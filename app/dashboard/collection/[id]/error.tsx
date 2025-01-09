'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardContent className="p-6 text-center space-y-4">
                    <h2 className="text-xl font-semibold">Something went wrong!</h2>
                    <p className="text-muted-foreground">
                        {error.message || 'Failed to load collection. Please try again.'}
                    </p>
                    <Button onClick={reset}>Try again</Button>
                </CardContent>
            </Card>
        </div>
    );
} 