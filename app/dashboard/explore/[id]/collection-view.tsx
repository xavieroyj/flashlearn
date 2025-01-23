'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Plus, User2 } from "lucide-react";
import Image from "next/image";
import CollectionSelect from "./collection-select";
import { cloneCollectionAction, copyQuizAction } from "@/app/actions/explore";

interface CollectionViewProps {
    collection: any;
    isOwnCollection: boolean;
    userCollections: {
        id: number;
        name: string;
    }[];
}

export default function CollectionView({ collection, isOwnCollection, userCollections }: CollectionViewProps) {
    if (isOwnCollection) {
        return (
            <div className="space-y-8">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{collection.name}</h1>
                        {collection.description && (
                            <p className="text-muted-foreground mt-1">{collection.description}</p>
                        )}
                    </div>
                </div>
                <div className="text-muted-foreground">
                    This is your own collection. View it in the Collections tab to make changes.
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{collection.name}</h1>
                    {collection.description && (
                        <p className="text-muted-foreground mt-1">{collection.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground/70 mt-4">
                        <div className="flex items-center gap-2">
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
                            <span>Created by {collection.user.name}</span>
                        </div>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd] text-primary-foreground hover:opacity-90">
                            <Copy className="h-4 w-4 mr-2" />
                            Clone Collection
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Clone Collection</DialogTitle>
                            <DialogDescription>
                                Create a copy of this collection in your library.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={async (formData: FormData) => {
                            const name = formData.get('name') as string;
                            const description = formData.get('description') as string;
                            await cloneCollectionAction(collection.id, name, description);
                        }}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={`Copy of ${collection.name}`}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={collection.description || ''}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Copy</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.Quiz.map((quiz: any, index: number) => (
                    <Card key={quiz.id} className="rounded-[20px] bg-gradient-to-b from-card to-card/50 p-8 border border-white/[0.05] relative overflow-hidden group">
                        <div className="absolute -z-10 opacity-0 group-hover:opacity-100 transition-opacity inset-0 bg-primary/5 blur-xl" />
                        
                        <div className="mb-4">
                            <h3 className="text-xl font-medium text-foreground mb-2">Question {index + 1}</h3>
                            <p className="text-muted-foreground/70">{quiz.question}</p>
                        </div>

                        <div className="space-y-2">
                            {quiz.options.map((option: string, optionIndex: number) => (
                                <div 
                                    key={optionIndex}
                                    className="text-sm text-muted-foreground/70 pl-4"
                                >
                                    {String.fromCharCode(65 + optionIndex)}. {option}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="bg-white/5 backdrop-blur-lg border border-white/10 text-foreground hover:bg-white/10">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add to My Collection
                                    </Button>
                                </DialogTrigger>
                                <CollectionSelect
                                    collections={userCollections}
                                    onCollectionSelect={async (targetCollectionId: number) => {
                                        await copyQuizAction(quiz.id, targetCollectionId);
                                    }}
                                    onCancel={() => {}}
                                />
                            </Dialog>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}