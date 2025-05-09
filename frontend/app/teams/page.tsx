import { useTeams } from "@/hooks/useTeams";
import useUser from "@/hooks/useUser";
import { Team } from "@/types/teams";
import { useEffect, useState } from "react";
import { TeamCard } from "./teamCard";

// Crear equipos
const TeamsPage = () => {
    const { user } = useUser()
    const teamsResponse: { teams: Team[]; isLoading: boolean } = useTeams(user?.id || "") || { teams: [], isLoading: false }
    const teams = teamsResponse?.teams || []
    const isLoading = teamsResponse?.isLoading || false
    const [teamsFiltered, setTeamsFiltered] = useState(teams)
    useEffect(() => {
        if (user) {
            const teamsFiltered = teams.filter(
                (team) => team.ownerId === user.id || team.players.some((player: { id: string }) => player.id === user.id)
            )
            setTeamsFiltered(teamsFiltered)
        }
    }, [user, teams])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
                <div>Loading...</div>
            ) : teamsFiltered.length > 0 ? (
                teamsFiltered.map((team) => <TeamCard key={team.id} team={team} />)
            ) : (
                <div className="col-span-3">No tienes equipos</div>
            )}
        </div>
    )
}
