import React from 'react';

interface League {
    id: string;
    name: string;
    country: string;
    startDate: string;
    endDate: string;
}

interface LeagueCardProps {
    league: League;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
    return (
        <div className="border rounded shadow p-4">
            <h2 className="text-lg font-bold">{league.name}</h2>
            <p className="text-sm text-gray-600">{league.country}</p>
            <p className="text-sm">Start Date: {league.startDate}</p>
            <p className="text-sm">End Date: {league.endDate}</p>
        </div>
    );
}

