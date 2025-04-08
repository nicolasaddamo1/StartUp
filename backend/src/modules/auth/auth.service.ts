// auth.service.ts
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/entity/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usuariosRepository.findOne({
            where: { email }
        });

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(@Body() email: string, password: string) {
        const user = await this.validateUser(email, password);
        const payload = { email: user.email, sub: user.id };

        // Actualizar último login
        await this.usuariosRepository.update(
            user.id,
            { ultimo_login: new Date() }
        );

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                suscripcion: user.suscripcion
            }
        };
    }

    async register(registerDto: RegisterDto) {
        // Verificar si el usuario ya existe
        const userExists = await this.usuariosRepository.findOne({
            where: { email: registerDto.email }
        });

        if (userExists) {
            throw new UnauthorizedException('El email ya está registrado');
        }

        // Crear nuevo usuario
        const user = new Usuario();
        user.email = registerDto.email;
        user.nombre = registerDto.nombre;
        user.password = await bcrypt.hash(registerDto.password, 10);

        const savedUser = await this.usuariosRepository.save(user);

        // Eliminar password del objeto de respuesta
        const { password, ...result } = savedUser;

        return result;
    }
}