"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleCollectionPin } from "@/app/actions/collection";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Collection {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    isPinned: boolean;
    Quiz: any[];
}

interface CollectionCardProps {
    collection: Collection;
    onPinToggle: (id: number) => void;
}

export default function CollectionCard({ collection, onPinToggle }: CollectionCardProps) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handlePinClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isPending) return;
        
        setIsPending(true);
        try {
            await toggleCollectionPin(collection.id);
            onPinToggle(collection.id);
        } catch (error) {
            toast.error("Failed to update pin status");
        } finally {
            setIsPending(false);
        }
    };

    const handleClick = () => {
        router.push(`/dashboard/collection/${collection.id}`);
    };

    return (
        <Card 
            onClick={handleClick}
            className="group hover:shadow-lg transition-shadow relative group cursor-pointer"
        >
            <button
                onClick={handlePinClick}
                className={cn(
                    "absolute top-2 right-2 p-2 rounded-full transition-all",
                    "hover:bg-muted",
                    "md:opacity-0 md:group-hover:opacity-100",
                    collection.isPinned && "md:opacity-100"
                )}
                disabled={isPending}
            >
                <Pin
                    className={cn(
                        "h-4 w-4 transition-transform",
                        collection.isPinned && "fill-current"
                    )}
                />
            </button>
            <CardHeader>
                <CardTitle className="group-hover:underline">{collection.name}</CardTitle>
                <CardDescription>{collection.description || "No description"}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Created: {format(new Date(collection.createdAt), 'PPP')}</p>
                    <p>Last Updated: {format(new Date(collection.updatedAt), 'PPP')}</p>
                    <p>Number of Quizzes: {collection.Quiz.length}</p>
                </div>
            </CardContent>
        </Card>
    );
}
