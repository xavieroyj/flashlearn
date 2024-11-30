"use client";

import { useState, useEffect } from "react";
import { experimental_useObject } from "ai/react";
import { questionsSchema } from "@/lib/schemas";
import { z } from "zod";
import { toast } from "sonner";
import { FileUp, Plus, Loader2, Check, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUserCollections, createCollection, addQuizzesToCollection } from "@/app/actions/collection";

type Collection = {
    id: number;
    name: string;
    description: string | null;
};

export default function CreateQuizDialog() {
    const [files, setFiles] = useState<File[]>([]);
    const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [title, setTitle] = useState<string>();
    const [open, setOpen] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
    const [isCreatingCollection, setIsCreatingCollection] = useState(false);
    const [newCollection, setNewCollection] = useState({ name: "", description: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        submit,
        object: partialQuestions,
        isLoading,
    } = experimental_useObject({
        api: "/api/generate-quiz",
        schema: questionsSchema,
        initialValue: undefined,
        onError: (error) => {
            toast.error("Failed to generate quiz. Please try again.");
            setFiles([]);
        },
        onFinish: ({ object }) => {
            if (object) {
                setQuestions(object);
                setSelectedQuestions(Array.from({ length: object.length }, (_, i) => i));
            }
        },
    });

    useEffect(() => {
        if (open) {
            getUserCollections().then(setCollections).catch(console.error);
        }
    }, [open]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if (isSafari && isDragging) {
            toast.error("Safari does not support drag & drop. Please use the file picker.");
            return;
        }

        const selectedFiles = Array.from(e.target.files || []);
        const validFiles = selectedFiles.filter(
            (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024,
        );

        if (validFiles.length !== selectedFiles.length) {
            toast.error("Only PDF files under 5MB are allowed.");
        }

        setFiles(validFiles);
    };

    const encodeFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const encodedFiles = await Promise.all(
            files.map(async (file) => ({
                name: file.name,
                type: file.type,
                data: await encodeFileAsBase64(file),
            })),
        );
        submit({ files: encodedFiles });
    };

    const clearPDF = () => {
        setFiles([]);
        setQuestions([]);
        setSelectedQuestions([]);
        setOpen(false);
    };

    const toggleQuestionSelection = (index: number) => {
        setSelectedQuestions(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const handleCreateCollection = async () => {
        try {
            const collection = await createCollection(newCollection.name, newCollection.description);
            setCollections(prev => [collection, ...prev]);
            setSelectedCollection(collection.id);
            setIsCreatingCollection(false);
            setNewCollection({ name: "", description: "" });
        } catch (error) {
            toast.error("Failed to create collection");
        }
    };

    const handleAddToCollection = async () => {
        if (!selectedCollection) return;

        setIsSubmitting(true);
        try {
            await addQuizzesToCollection(
                selectedCollection,
                selectedQuestions.map(i => questions[i])
            );
            toast.success("Questions added to collection");
            
            // Reset the dialog state
            clearPDF();
            setSelectedCollection(null);
            setSelectedQuestions([]);
            setIsCreatingCollection(false);
            setNewCollection({ name: "", description: "" });
            
            // Close the dialog
            setOpen(false);
        } catch (error) {
            toast.error("Failed to add questions to collection");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (questions.length > 0) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Create new flash card</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] overflow-hidden flex flex-col h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{title ?? "Generated Questions"}</DialogTitle>
                        <DialogDescription>
                            {questions.length} questions generated from your PDF
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                        <div className="space-y-4 h-full flex flex-col">
                            <ScrollArea className="flex-1 w-full rounded-md border min-h-0">
                                <div className="flex flex-col space-y-4 p-4">
                                    {questions.map((question, index) => (
                                        <Card 
                                            key={index}
                                            className={cn(
                                                "cursor-pointer transition-all hover:border-primary",
                                                selectedQuestions.includes(index) && "border-2 border-primary"
                                            )}
                                            onClick={() => toggleQuestionSelection(index)}
                                        >
                                            <CardContent className="p-4 relative">
                                                {selectedQuestions.includes(index) && (
                                                    <div className="absolute top-2 right-2">
                                                        <Check className="h-4 w-4 text-primary" />
                                                    </div>
                                                )}
                                                <div className="space-y-2">
                                                    <p className="font-medium">Question {index + 1}</p>
                                                    <p className="text-sm text-muted-foreground">{question.question}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>

                            {selectedQuestions.length > 0 && (
                                <div className="space-y-4 flex-shrink-0">
                                    <div className="space-y-2">
                                        <Label>Select Collection</Label>
                                        <ScrollArea className="h-[150px] w-full rounded-md border">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                                                {collections.map(collection => (
                                                    <Card 
                                                        key={collection.id}
                                                        className={cn(
                                                            "cursor-pointer transition-all hover:border-primary",
                                                            selectedCollection === collection.id && "border-2 border-primary"
                                                        )}
                                                        onClick={() => setSelectedCollection(collection.id)}
                                                    >
                                                        <CardContent className="p-4">
                                                            <p className="font-medium truncate">{collection.name}</p>
                                                            {collection.description && (
                                                                <p className="text-sm text-muted-foreground truncate">{collection.description}</p>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                                <Card 
                                                    className="cursor-pointer hover:border-primary border-dashed"
                                                    onClick={() => setIsCreatingCollection(true)}
                                                >
                                                    <CardContent className="p-4 flex items-center justify-center">
                                                        <div className="flex items-center space-x-2 text-muted-foreground">
                                                            <FolderPlus className="h-4 w-4" />
                                                            <span>Create New Collection</span>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </ScrollArea>
                                    </div>

                                    {isCreatingCollection && (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Collection Name</Label>
                                                <Input 
                                                    value={newCollection.name}
                                                    onChange={e => setNewCollection(prev => ({ ...prev, name: e.target.value }))}
                                                    placeholder="Enter collection name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Description (optional)</Label>
                                                <Textarea 
                                                    value={newCollection.description}
                                                    onChange={e => setNewCollection(prev => ({ ...prev, description: e.target.value }))}
                                                    placeholder="Enter collection description"
                                                />
                                            </div>
                                            <div className="flex justify-end space-x-2">
                                                <Button variant="outline" onClick={() => setIsCreatingCollection(false)}>Cancel</Button>
                                                <Button 
                                                    onClick={handleCreateCollection}
                                                    disabled={!newCollection.name}
                                                >
                                                    Create Collection
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex justify-end space-x-2 flex-shrink-0">
                                <Button variant="outline" onClick={clearPDF}>Cancel</Button>
                                <Button 
                                    disabled={selectedQuestions.length === 0 || !selectedCollection || isSubmitting}
                                    onClick={handleAddToCollection}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center space-x-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Adding to Collection...</span>
                                        </span>
                                    ) : (
                                        `Add ${selectedQuestions.length} Questions to Collection`
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Create new flash card</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create New Quiz</DialogTitle>
                </DialogHeader>
                <div
                    className="relative"
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragExit={() => setIsDragging(false)}
                    onDragEnd={() => setIsDragging(false)}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleFileChange({
                            target: { files: e.dataTransfer.files },
                        } as React.ChangeEvent<HTMLInputElement>);
                    }}
                >
                    <AnimatePresence>
                        {isDragging && (
                            <motion.div
                                className="absolute inset-0 pointer-events-none dark:bg-zinc-900/90 z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90 rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div>Drag and drop files here</div>
                                <div className="text-sm dark:text-zinc-400 text-zinc-500">
                                    {"(PDFs only)"}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <form onSubmit={handleSubmitWithFiles} className="space-y-4">
                        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 transition-colors hover:border-muted-foreground/50">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="application/pdf"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <FileUp className="h-8 w-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground text-center">
                                {files.length > 0 ? (
                                    <span className="font-medium text-foreground">
                                        {files[0].name}
                                    </span>
                                ) : (
                                    <span>Drop your PDF here or click to browse.</span>
                                )}
                            </p>
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={files.length === 0}
                        >
                            {isLoading ? (
                                <span className="flex items-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Generating Quiz...</span>
                                </span>
                            ) : (
                                "Generate Quiz"
                            )}
                        </Button>
                    </form>
                    {isLoading && (
                        <div className="mt-4 flex flex-col space-y-4">
                            <div className="w-full space-y-2">
                                <div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
                                    <div className="h-2 w-2 rounded-full bg-yellow-500/50 animate-pulse" />
                                    <span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
                                        {partialQuestions
                                            ? `Generated ${partialQuestions.length} questions so far...`
                                            : "Analyzing PDF content"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}