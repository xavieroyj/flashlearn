import { getPublicCollections } from "@/app/actions/collection";
import CollectionCard from "@/components/CollectionCard";

export default async function ExplorePage() {
    const collections = await getPublicCollections();

    return (
        <div className="p-6 space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-16 relative">
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/10 blur-[100px] rounded-full" />
                <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd] text-transparent bg-clip-text mb-4">
                    Explore Collections
                </h2>
                <p className="text-lg text-muted-foreground/80">
                    Browse and clone public quiz collections created by other users
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                        isOwner={false}
                        inDashboard={false}
                    />
                ))}

                {collections.length === 0 && (
                    <div className="col-span-full text-center text-muted-foreground mt-10">
                        <p>No public collections available yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
