import { getUserCollections } from "@/app/actions/collection";
import CollectionSelect from "./collection-select";

interface CollectionSelectWrapperProps {
    onCollectionSelect: (collectionId: number) => void;
    onCancel: () => void;
}

export default async function CollectionSelectWrapper({
    onCollectionSelect,
    onCancel,
}: CollectionSelectWrapperProps) {
    const collections = await getUserCollections();
    
    return (
        <CollectionSelect
            collections={collections}
            onCollectionSelect={onCollectionSelect}
            onCancel={onCancel}
        />
    );
}