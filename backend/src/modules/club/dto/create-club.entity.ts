import { IsNotEmpty, IsString } from "class-validator";

export class CreateClubDto {

    @IsNotEmpty({ message: 'El nombre del club es obligatorio' })
    @IsString()
    nombre: string;

    @IsNotEmpty({ message: 'El escudo del club es obligatorio' })
    @IsString()
    escudo_url: string;

}