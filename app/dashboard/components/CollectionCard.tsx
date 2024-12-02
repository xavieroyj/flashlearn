"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Pin, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleCollectionPin, deleteCollection } from "@/app/actions/collection";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

    const handlePinClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isPending) return;
        
        setIsPending(true);
        toggleCollectionPin(collection.id)
            .then(() => {
                onPinToggle(collection.id);
            })
            .catch(() => {
                toast.error("Failed to update pin status");
            })
            .finally(() => {
                setIsPending(false);
            });
    };

    const handleClick = () => {
        router.push(`/dashboard/collection/${collection.id}`);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isPending) return;
        
        setIsPending(true);
        try {
            await deleteCollection(collection.id);
            toast.success("Collection deleted successfully");
            onPinToggle(collection.id); // Using this to trigger a refresh
        } catch (error) {
            toast.error("Failed to delete collection");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Card 
            onClick={handleClick}
            className="group hover:shadow-lg transition-shadow relative group cursor-pointer"
        >
            <div className="absolute top-2 right-2 flex gap-2">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                                "p-2 rounded-full transition-all",
                                "hover:bg-muted",
                                "md:opacity-0 md:group-hover:opacity-100"
                            )}
                            disabled={isPending}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={e => e.stopPropagation()}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the collection and all its quizzes. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <button
                    onClick={handlePinClick}
                    className={cn(
                        "p-2 rounded-full transition-all",
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
            </div>
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
