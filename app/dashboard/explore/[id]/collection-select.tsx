'use client';

import { useState } from "react";
import {
    Dialog,
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
import { Button } from "@/components/ui/button";

interface Collection {
    id: number;
    name: string;
}

interface CollectionSelectProps {
    collections: Collection[];
    onCollectionSelect: (collectionId: number) => void;
    onCancel: () => void;
}

export default function CollectionSelect({
    collections,
    onCollectionSelect,
    onCancel,
}: CollectionSelectProps) {
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