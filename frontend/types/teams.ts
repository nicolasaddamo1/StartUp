export type Team = {
    id: string;
    name: string;
    ownerId: string;
    players: {
        id: string;
        name: string;
        email: string;
    }[];
    leagueId: string;
    leagueName: string;
    leagueCountry: string;
    leagueStartDate: string;
    leagueEndDate: string;
    leagueOwnerId: string;

};