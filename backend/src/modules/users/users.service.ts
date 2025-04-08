// usuarios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/entity/user.entity';
import { UpdateUsuarioDto } from './dto/update-user-team.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
    ) { }

    async findAll(): Promise<Usuario[]> {
        return this.usuariosRepository.find();
    }

    async findOne(id: string): Promise<Usuario> {
        const usuario = await this.usuariosRepository.findOne({
            where: { id },
            relations: ['equipos']
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        return usuario;
    }

    async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        const usuario = await this.findOne(id);

        // Si se proporciona una contraseña, hashearla
        if (updateUsuarioDto.password) {
            updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, 10);
        }

        const updatedUsuario = {
            ...usuario,
            ...updateUsuarioDto,
        };

        await this.usuariosRepository.save(updatedUsuario);
        return this.findOne(id);
    }

    async updateSuscripcion(id: string, tipoSuscripcion: 'free' | 'premium'): Promise<Usuario> {
        const usuario = await this.findOne(id);
        usuario.suscripcion = tipoSuscripcion;

        await this.usuariosRepository.save(usuario);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const usuario = await this.findOne(id);
        await this.usuariosRepository.remove(usuario);
    }
}