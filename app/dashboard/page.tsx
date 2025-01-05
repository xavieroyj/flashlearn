import { getUserCollections } from "../actions/collection";
import { getDashboardStats } from "../actions/dashboard";
import CollectionCard from "./collection/components/CollectionCard";
import CreateCollectionDialog from "./collection/components/CreateCollectionDialog";
import StatsCard from "./components/StatsCard";
import RecentActivity from "./components/RecentActivity";
import { Book, Target, Trophy, Flame } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Dashboard() {
    const stats = await getDashboardStats();

    return (
        <div className="p-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Collections"
                    value={stats.collectionsCount}
                    icon={<Book className="h-4 w-4" />}
                />
                <StatsCard
                    title="Quizzes Taken"
                    value={stats.quizzesTaken}
                    icon={<Target className="h-4 w-4" />}
                />
                <StatsCard
                    title="Average Score"
                    value={`${stats.averageScore}%`}
                    icon={<Trophy className="h-4 w-4" />}
                />
                <StatsCard
                    title="Current Streak"
                    value={`${stats.currentStreak} days`}
                    icon={<Flame className="h-4 w-4" />}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">Pinned Collections</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 max-h-80 overflow-y-auto">
                            {stats.pinnedCollections.map((collection) => (
                                <CollectionCard
                                    key={collection.id}
                                    onPinToggle={async () => {
                                        'use server';
                                        revalidatePath('/dashboard');
                                    }}
                                    collection={collection}
                                />
                            ))}
                            {stats.pinnedCollections.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    No pinned collections yet. Pin your favorite collections to access them quickly!
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <RecentActivity activities={stats.recentActivity} />
            </div>
        </div>
    );
}