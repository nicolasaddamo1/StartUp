import { IsNotEmpty, IsUUID, IsString, IsInt, Min } from 'class-validator';

export class CreateUserTeamDto {
    @IsString()
    @IsNotEmpty({message:"Usuario obligatorio"})
    usuario_id: string;

    @IsString()
    @IsNotEmpty({message:"Nombre obligatorio"})
    nombre: string;

}
