import { LeagueCard } from "@/components/league-card"
import useLeague from "@/hooks/useLeague"
import useUser from "@/hooks/useUser"
import { League } from "@/types/league"
import { useEffect, useState } from "react"

// Ligas y torneos 
const LeaguePage = () => {
    const { user } = useUser()
    const leagueResponse: { data: League[]; isLoading: boolean } = useLeague(user?.id || "") || { data: [], isLoading: false }
    const leagues = leagueResponse?.data || []
    const isLoading = leagueResponse?.isLoading || false
    const [leaguesFiltered, setLeaguesFiltered] = useState(leagues)
    useEffect(() => {
        if (user) {
            const leaguesFiltered = leagues.filter(
                (league) => league.ownerId === user.id || league.players.some((player: { id: string }) => player.id === user.id)
            )
            setLeaguesFiltered(leaguesFiltered)
        }
    }, [user, leagues])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
                <div>Loading...</div>
            ) : leaguesFiltered.length > 0 ? (
                leaguesFiltered.map((league) => <LeagueCard key={league.id} league={league} />)
            ) : (
                <div className="col-span-3">No hay ligas</div>
            )}
        </div>
    )
}

export default LeaguePage
