import { useState, useEffect } from 'react';

export default function useLeague(id: string) {
    const [league, setLeague] = useState(null);

    useEffect(() => {
        const fetchLeague = async () => {
            const response = await fetch(`/api/leagues/${id}`);
            const data = await response.json();
            setLeague(data);
        };

        fetchLeague();
    }, [id]);

    return league;
}
