'use client';

import { getUserCollections } from "@/app/actions/collection";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface CollectionSelectDialogProps {
    onCollectionSelect: (collectionId: number) => void;
    onCancel: () => void;
}

export default function CollectionSelectDialog({
    onCollectionSelect,
    onCancel,
}: CollectionSelectDialogProps) {
    const collections = await getUserCollections();
    const [selectedCollection, setSelectedCollection] = useState<string>();

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Select Collection</DialogTitle>
                <DialogDescription>
                    Choose which collection to add this quiz to.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Select
                    value={selectedCollection}
                    onValueChange={setSelectedCollection}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a collection" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Your Collections</SelectLabel>
                            {collections.map((collection) => (
                                <SelectItem
                                    key={collection.id}
                                    value={collection.id.toString()}
                                >
                                    {collection.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        if (selectedCollection) {
                            onCollectionSelect(parseInt(selectedCollection));
                        }
                    }}
                    disabled={!selectedCollection}
                >
                    Add to Collection
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}