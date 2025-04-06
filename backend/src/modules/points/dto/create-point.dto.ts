import { IsUUID, IsNumber, IsBoolean } from 'class-validator';

export class CreatePointDto {
    @IsUUID()
    playerId: string;

    @IsUUID()
    matchId: string;

    @IsNumber()
    score: number;

    @IsBoolean()
    isPlayerOfTheMatch: boolean;

    @IsBoolean()
    isPlayerOfTheWeek: boolean;
}
