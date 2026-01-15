import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollReveal } from './ScrollReveal';

interface DuolingoData {
    username: string;
    totalXp: number;
    streak: number;
    courses: Array<{
        title: string;
        xp: number;
        level?: number;
    }>;
    lingots: number;
}

interface DuolingoStatsProps {
    username?: string;
    userId?: string;
}

export const DuolingoStats = ({ username, userId }: DuolingoStatsProps) => {
    const [data, setData] = useState<DuolingoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDuolingoData = async () => {
            try {
                setLoading(true);
                // Using the unofficial Duolingo API endpoint
                const identifier = username || userId;
                const response = await fetch(
                    `https://www.duolingo.com/2017-06-30/users?username=${identifier}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch Duolingo data');
                }

                const result = await response.json();
                const user = result.users[0];

                // Process the data
                const processedData: DuolingoData = {
                    username: user.username,
                    totalXp: user.totalXp || 0,
                    streak: user.streak || 0,
                    lingots: user.lingots || 0,
                    courses: user.courses?.map((course: any) => ({
                        title: course.title,
                        xp: course.xp,
                        level: calculateLevel(course.xp),
                    })) || [],
                };

                setData(processedData);
                setError(null);
            } catch (err) {
                console.error('Error fetching Duolingo data:', err);
                setError('Unable to load Duolingo stats');
            } finally {
                setLoading(false);
            }
        };

        if (username || userId) {
            fetchDuolingoData();
        }
    }, [username, userId]);

    // Calculate level based on XP (Duolingo's formula)
    const calculateLevel = (xp: number): number => {
        return Math.floor(Math.pow(xp / 60, 0.5));
    };

    if (loading) {
        return (
            <ScrollReveal direction="up" delay={0.2}>
                <Card className="bg-muted/80">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/vendor/0cecd302cf0bcd0f73d51768feff75fe.svg"
                                alt="Duolingo"
                                className="w-8 h-8"
                            />
                            Duolingo Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Loading...</p>
                    </CardContent>
                </Card>
            </ScrollReveal>
        );
    }

    if (error || !data) {
        return (
            <ScrollReveal direction="up" delay={0.2}>
                <Card className="bg-muted/80">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/vendor/0cecd302cf0bcd0f73d51768feff75fe.svg"
                                alt="Duolingo"
                                className="w-8 h-8"
                            />
                            Duolingo Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{error || 'No data available'}</p>
                    </CardContent>
                </Card>
            </ScrollReveal>
        );
    }

    return (
        <ScrollReveal direction="up" delay={0.2}>
            <Card className="bg-muted/80">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <img
                            src="https://d35aaqx5ub95lt.cloudfront.net/vendor/0cecd302cf0bcd0f73d51768feff75fe.svg"
                            alt="Duolingo"
                            className="w-8 h-8"
                        />
                        Duolingo Progress
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-background/50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-500">{data.streak}</div>
                            <div className="text-sm text-muted-foreground">Day Streak 🔥</div>
                        </div>
                        <div className="text-center p-3 bg-background/50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">{data.totalXp.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Total XP</div>
                        </div>
                    </div>

                    {data.courses.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Languages</h4>
                            {data.courses.map((course, index) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-background/30 rounded">
                                    <span className="font-medium">{course.title}</span>
                                    <div className="text-right">
                                        <div className="text-sm font-bold">Level {course.level}</div>
                                        <div className="text-xs text-muted-foreground">{course.xp.toLocaleString()} XP</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-xs text-muted-foreground text-center pt-2">
                        <a
                            href={`https://www.duolingo.com/profile/${data.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                        >
                            View Full Profile →
                        </a>
                    </div>
                </CardContent>
            </Card>
        </ScrollReveal>
    );
};
