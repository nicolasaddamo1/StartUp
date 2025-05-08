import React from 'react';

interface PlayerCardProps {
    player: {
        id: string;
        name: string;
        position: string;
        team: string;
    };
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className="border rounded shadow p-4">
            <h2 className="text-lg font-bold">{player.name}</h2>
            <p className="text-sm text-gray-600">Position: {player.position}</p>
            <p className="text-sm">Team: {player.team}</p>
        </div>
    );
};

