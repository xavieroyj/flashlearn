import { getUserCollections } from "../actions/collection";
import { format } from "date-fns";
import CollectionCard from "./components/CollectionCard";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import CreateCollectionDialog from "./components/CreateCollectionDialog";

export default async function Dashboard() {
    const collections = await getUserCollections();
    const pinnedCollections = collections.filter(c => c.isPinned);

    async function revalidate() {
        'use server';
        revalidatePath('/dashboard');
    }

    return (
        <div className="w-full h-full p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Your Collections</h1>
                <CreateCollectionDialog />
            </div>

            {pinnedCollections.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-4">Pinned 📌</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pinnedCollections.map((collection) => (
                            <CollectionCard 
                                key={collection.id} 
                                collection={collection} 
                                onPinToggle={revalidate}
                            />
                        ))}
                    </div>
                </section>
            )}
            
            <section>
                <h2 className="text-xl font-semibold mb-4">All Collections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collections.map((collection) => (
                        <CollectionCard 
                            key={collection.id} 
                            collection={collection} 
                            onPinToggle={revalidate}
                        />
                    ))}
                </div>
                {collections.length === 0 && (
                    <div className="text-center text-muted-foreground mt-10">
                        <p>You don&apos;t have any collections yet. Create one to get started!</p>
                    </div>
                )}
            </section>
        </div>
    );
}