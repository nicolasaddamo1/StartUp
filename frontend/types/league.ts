export type League = {
    id: string;
    name: string;
    country: string;
    startDate: string;
    endDate: string;
    ownerId: string;
    players: {
        id: string;
        name: string;
        email: string;
    }[];
};
