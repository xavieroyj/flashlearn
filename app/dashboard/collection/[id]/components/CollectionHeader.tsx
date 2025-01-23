'use client';

import { Button } from "@/components/ui/button";
import { Plus, Globe2, Lock } from "lucide-react";

interface CollectionHeaderProps {
    name: string;
    description?: string | null;
    isPinned: boolean;
    isPublic: boolean;
    onAddQuestion: () => void;
    onToggleVisibility: () => void;
}

export default function CollectionHeader({
    name,
    description,
    isPinned,
    isPublic,
    onAddQuestion,
    onToggleVisibility
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
                <Button
                    variant="outline"
                    onClick={onToggleVisibility}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 text-foreground hover:bg-white/10"
                >
                    {isPublic ? (
                        <>
                            <Globe2 className="h-4 w-4 mr-2" />
                            Public
                        </>
                    ) : (
                        <>
                            <Lock className="h-4 w-4 mr-2" />
                            Private
                        </>
                    )}
                </Button>
                {isPinned && (
                    <span className="text-muted-foreground">📌 Pinned</span>
                )}
            </div>
        </div>
    );
} 