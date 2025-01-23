import { getCollection, getUserCollections } from "@/app/actions/collection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import CollectionView from "./collection-view";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const parameters = await params;
    const parsedId = parseInt(parameters.id);
    if (isNaN(parsedId)) {
        notFound();
    }
// Fetch both collection and user collections in parallel
const [collection, userCollections] = await Promise.all([
    getCollection(parsedId),
    getUserCollections()
]);

if (!collection) {
    notFound();
}

const isOwnCollection = collection.userId === session?.user?.id;

// Only pass userCollections if not viewing own collection
return (
    <CollectionView
        collection={collection}
        isOwnCollection={isOwnCollection}
        userCollections={isOwnCollection ? [] : userCollections}
    />
);
}