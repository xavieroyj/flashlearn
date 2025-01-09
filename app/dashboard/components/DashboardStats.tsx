import { Book, Target, Trophy, Flame } from "lucide-react";
import StatsCard from "./StatsCard";

interface DashboardStatsProps {
    stats: {
        collectionsCount: number;
        quizzesTaken: number;
        averageScore: number;
        currentStreak: number;
    }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
    return (
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
    );
} 