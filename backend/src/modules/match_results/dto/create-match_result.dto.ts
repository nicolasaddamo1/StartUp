// src/modules/match_results/dto/create-match_result.dto.ts
import { IsUUID, IsInt, Min, IsOptional } from 'class-validator';

export class CreateMatchResultDto {
    @IsUUID()
    matchId: string;

    @IsUUID()
    playerId: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    goals?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    assists?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    yellowCards?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    redCards?: number;

    @IsOptional()
    @IsInt()
    points?: number;
}

