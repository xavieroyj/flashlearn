"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Pin, Trash, User2 } from "lucide-react";
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
import Image from "next/image";

interface UserInfo {
  name: string;
  image: string | null;
}

interface Collection {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  Quiz: any[];
  user?: UserInfo; // This could be null or absent if we only show it for explore
}

interface CollectionCardProps {
  collection: Collection;
  isOwner: boolean;
  // Called when an action modifies the collection (like pin/deletion)
  onAction?: (id: number) => void;
  // If true, route takes user to the dashboard route; otherwise, explore route
  inDashboard?: boolean;
}

export default function CollectionCard({
  collection,
  isOwner,
  onAction,
  inDashboard = true,
}: CollectionCardProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // For pinned/unpinned changes
  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPending) return;

    setIsPending(true);
    toggleCollectionPin(collection.id)
      .then(() => {
        toast.success(collection.isPinned ? "Collection unpinned" : "Collection pinned");
        onAction?.(collection.id);
      })
      .catch(() => {
        toast.error("Failed to update pin status");
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  // For route navigation
  const handleCardClick = () => {
    if (inDashboard) {
      router.push(`/dashboard/collection/${collection.id}`);
    } else {
      router.push(`/dashboard/explore/${collection.id}`);
    }
  };

  // For final deletion
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPending) return;

    setIsPending(true);
    try {
      await deleteCollection(collection.id);
      toast.success("Collection deleted successfully");
      onAction?.(collection.id);
    } catch (error) {
      toast.error("Failed to delete collection");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      className="group hover:shadow-lg transition-shadow relative cursor-pointer"
    >
      {/* Top-right actions: only visible if user is owner */}
      {isOwner && (
        <div className="absolute top-2 right-2 flex gap-2">
          {/* Delete Button */}
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
                <Trash className="size-4 text-destructive" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the collection and all its quizzes. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Pin Button */}
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
      )}

      <CardHeader>
        <CardTitle className="group-hover:underline">{collection.name}</CardTitle>
        <CardDescription>
          {collection.description || "No description"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Created: {format(new Date(collection.createdAt), "PPP")}</p>
          <p>Last Updated: {format(new Date(collection.updatedAt), "PPP")}</p>
          <p>Number of Quizzes: {collection.Quiz?.length ?? 0}</p>
        </div>

        {/* If isOwner is false, we might show user info (for explore page) */}
        {!isOwner && collection.user && (
          <div className="flex items-center gap-2 mt-4 text-muted-foreground/70">
            {collection.user.image ? (
              <Image
                src={collection.user.image}
                alt={collection.user.name || "User"}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <User2 className="w-4 h-4" />
            )}
            <span>{collection.user.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
