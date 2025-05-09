import { Team } from "@/types/teams";

export const TeamCard: React.FC<{ team: Team }> = ({ team }) => {
    return (
        <div className="border rounded shadow p-4">
            <h2 className="text-lg font-bold">{team.name}</h2>
            <p className="text-sm text-gray-600">Dueño: {team.ownerId}</p>
            <p className="text-sm">Jugadores: {team.players.length}</p>
        </div>
    );
};
