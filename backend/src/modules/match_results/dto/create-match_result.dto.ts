import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateMatchResultDto {

    @IsNumber()
    goalsLocal: number;

    @IsNumber()
    goalsVisit: number;

    @IsString()
    winner: string;

    @IsUUID()
    partidoId: string;

    @IsUUID()
    equipoLocalId: string;

    @IsUUID()
    equipoVisitanteId: string;

}
