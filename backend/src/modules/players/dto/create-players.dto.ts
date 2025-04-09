import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Posicion } from "src/entity/player.entity";

export class CreatePlayerDto {

    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombre: string;

    @IsEnum(Posicion)
    @IsNotEmpty({ message: 'La posicion es obligatoria' })
    posicion: Posicion;

    @IsNotEmpty({ message: 'El precio es obligatorio' })
    @IsNumber({ allowInfinity: false, allowNaN: false })
    precio: number;

}
