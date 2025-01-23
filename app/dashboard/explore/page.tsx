import { getPublicCollections } from "@/app/actions/collection";
import { Card } from "@/components/ui/card";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ExplorePage() {
    const collections = await getPublicCollections();

    return (
        <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-16 relative">
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/10 blur-[100px] rounded-full" />
                <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd] text-transparent bg-clip-text mb-4">
                    Explore Collections
                </h2>
                <p className="text-lg text-muted-foreground/80">
                    Browse and clone public quiz collections created by other users
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections.map((collection) => (
                    <Card key={collection.id} className="rounded-[20px] bg-gradient-to-b from-card to-card/50 p-8 border border-white/[0.05] relative overflow-hidden group">
                        <div className="absolute -z-10 opacity-0 group-hover:opacity-100 transition-opacity inset-0 bg-primary/5 blur-xl" />
                        
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-medium text-foreground">{collection.name}</h3>
                                {collection.description && (
                                    <p className="text-muted-foreground/70 mt-1">{collection.description}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground/60">
                                {collection.Quiz.length} quizzes
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground/70">
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
                                <span>{collection.user.name}</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Link 
                                href={`/dashboard/explore/${collection.id}`}
                                className="bg-white/5 backdrop-blur-lg border border-white/10 text-foreground hover:bg-white/10 rounded-full h-10 px-6 inline-flex items-center"
                            >
                                View Collection
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}