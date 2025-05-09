import { useState, useEffect } from 'react';

type Team = {
    id: string;
    name: string;
};

export function useTeams(ownerId?: string) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            setIsLoading(true);
            const response = await fetch(`/api/teams${ownerId ? `?ownerId=${ownerId}` : ''}`);
            const data = await response.json();
            setTeams(data);
            setIsLoading(false);
        };

        fetchTeams();
    }, [ownerId]);

    return { teams, isLoading };
}
