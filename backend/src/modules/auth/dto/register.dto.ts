// dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'usuario@ejemplo.com' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;

    @ApiProperty({ example: 'Usuario Ejemplo' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @ApiProperty({ example: 'Contraseña123!' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}