import { IsBoolean, IsDecimal, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Posicion } from "src/entity/player.entity";

export class UpdatePlayerDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsEnum(Posicion)
    @IsOptional()
    posicion?: Posicion;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    precio?: number;

    @IsOptional()
    @IsBoolean()
    lesionado?: boolean;

    @IsOptional()
    @IsString()
    imagen_url?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    goles?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    asistencias?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    tarjetas_amarillas?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    tarjetas_rojas?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    arcos_en_cero?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    minutos_jugados?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    puntos_totales?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    penales_atajados?: number;

    @IsOptional()
    @IsNumber({ allowInfinity: false, allowNaN: false })
    partidos_jugados?: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '2' })
    promedio_puntos?: number;

}
