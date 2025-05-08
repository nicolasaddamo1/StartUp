import { LeagueCard } from "@/components/league-card"
import useUser from "@/hooks/useUser"
import { useState } from "react"

// Ligas y torneos 
const { user } = useUser()
const { data: leagues, isLoading } = useLeague()
const [leaguesFiltered, setLeaguesFiltered] = useState(leagues)
useEffect(() => {
    if (user) {
        const leaguesFiltered = leagues.filter(
            (league) => league.ownerId === user.id || league.players.some((player) => player.id === user.id)
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
