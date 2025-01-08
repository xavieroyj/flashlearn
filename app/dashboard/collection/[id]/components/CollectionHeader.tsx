'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CollectionHeaderProps {
    name: string;
    description?: string | null;
    isPinned: boolean;
    onAddQuestion: () => void;
}

export default function CollectionHeader({ 
    name, 
    description, 
    isPinned, 
    onAddQuestion 
}: CollectionHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">{name}</h1>
                {description && (
                    <p className="text-muted-foreground mt-1">{description}</p>
                )}
            </div>
            <div className="flex items-center gap-4">
                <Button onClick={onAddQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                </Button>
                {isPinned && (
                    <span className="text-muted-foreground">📌 Pinned</span>
                )}
            </div>
        </div>
    );
} 