import { IsUUID, IsString, IsInt, IsBoolean } from 'class-validator';

export class CreatePlayerDto {
    @IsString()
    name: string;

    @IsUUID()
    teamId: string;

    @IsString()
    position: string;

    @IsInt()
    value: number;

    @IsInt()
    goals: number;

    @IsInt()
    assists: number;

    @IsInt()
    yellowCards: number;

    @IsInt()
    redCards: number;

    @IsBoolean()
    isInjured: boolean;
}
