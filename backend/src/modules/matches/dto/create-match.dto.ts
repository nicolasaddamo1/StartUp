// src/match/dto/create-match.dto.ts
import { IsUUID, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateMatchDto {
    @IsUUID()
    homeTeamId: string;

    @IsUUID()
    awayTeamId: string;

    @IsDateString()
    matchDate: Date;

    @IsOptional()
    @IsNumber()
    homeScore?: number;

    @IsOptional()
    @IsNumber()
    awayScore?: number;

    @IsOptional()
    @IsUUID()
    leagueId?: string;
}
