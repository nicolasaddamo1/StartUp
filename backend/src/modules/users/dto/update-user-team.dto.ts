// dto/update-usuario.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
    @ApiPropertyOptional({ example: 'Nuevo Nombre' })
    @IsOptional()
    nombre?: string;

    @ApiPropertyOptional({ example: 'nuevo@email.com' })
    @IsOptional()
    @IsEmail({}, { message: 'El email debe ser válido' })
    email?: string;

    @ApiPropertyOptional({ example: 'NuevaContraseña123!' })
    @IsOptional()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password?: string;

    @ApiPropertyOptional({ example: 'http://ejemplo.com/avatar.jpg' })
    @IsOptional()
    avatar_url?: string;
}