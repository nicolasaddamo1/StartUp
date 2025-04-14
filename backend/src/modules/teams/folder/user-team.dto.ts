import { IsNotEmpty, IsUUID, IsString, IsInt, Min } from 'class-validator';

export class CreateUserTeamDto {
    @IsUUID()
    usuario_id: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

}
