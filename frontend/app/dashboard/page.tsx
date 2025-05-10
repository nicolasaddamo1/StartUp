import { useState } from "react";

// Tablero con estadísticas 
export default function Dashboard() {
    const [searchPlayer, setSearchPlayer] = useState('');
    const [searchTeam, setSearchTeam] = useState('');
    const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
    const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);

    const handleSearchPlayer = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPlayer(e.target.value);
        if (e.target.value.length > 2) {
            const response = await fetch(`/api/players?search=${e.target.value}`);
            const data = await response.json();
            setPlayers(data);
        } else {
            setPlayers([]);
        }
    }

    const handleSearchTeam = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTeam(e.target.value);
        if (e.target.value.length > 2) {
            const response = await fetch(`/api/teams?search=${e.target.value}`);
            const data = await response.json();
            setTeams(data);
        } else {
            setTeams([]);
        }
    }
    return (

        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight mt-0 mb-2">
                Dashboard
            </h1>
            <p className="text-gray-600 text-md">
                Esta es una vista de ejemplo, reemplaza con tu contenido
            </p>
            <div className="mt-4">
                <h2 className="text-xl font-bold">Buscador de jugadores</h2>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Buscar un jugador"
                    value={searchPlayer}
                    onChange={handleSearchPlayer}
                />
                {players.length > 0 && (
                    <ul className="mt-2">
                        {players.map((player) => (
                            <li key={player.id} className="py-2 border-b">
                                {player.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-bold">Buscador de equipos</h2>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Buscar un equipo"
                    value={searchTeam}
                    onChange={handleSearchTeam}
                />
                {teams.length > 0 && (
                    <ul className="mt-2">
                        {teams.map((team) => (
                            <li key={team.id} className="py-2 border-b">
                                {team.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
