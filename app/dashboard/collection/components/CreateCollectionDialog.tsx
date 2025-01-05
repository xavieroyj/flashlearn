"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCollection } from "@/app/actions/collection";
import { useRouter } from "next/navigation";

export default function CreateCollectionDialog() {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [collection, setCollection] = useState({ name: "", description: "" });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!collection.name) return;

        setIsSubmitting(true);
        try {
            const newCollection = await createCollection(collection.name, collection.description);
            toast.success("Collection created successfully");
            setOpen(false);
            setCollection({ name: "", description: "" });
            router.refresh();
        } catch (error) {
            toast.error("Failed to create collection");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Collection</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Collection</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Collection Name</Label>
                        <Input
                            value={collection.name}
                            onChange={e => setCollection(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter collection name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Description (optional)</Label>
                        <Textarea
                            value={collection.description}
                            onChange={e => setCollection(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter collection description"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!collection.name || isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Collection"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
} 