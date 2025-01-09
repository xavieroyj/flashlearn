import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserHistory } from "@/app/actions/history";
import { Card, CardContent } from "@/components/ui/card";
import HistoryItemCard from "./components/HistoryItemCard";

export default async function HistoryPage() {
    const history = await getUserHistory();

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Activity History</h1>
                <p className="text-muted-foreground">Track your learning journey and past activities</p>
            </div>

            <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-4">
                    {history.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center text-muted-foreground">
                                No activity history yet. Start by creating some flashcards!
                            </CardContent>
                        </Card>
                    ) : (
                        history.map((item, index) => (
                            <HistoryItemCard key={index} item={item} />
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
