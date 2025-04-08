// usuarios.controller.ts
import { Controller, Get, Param, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsuariosService } from './users.service';
import { UpdateUsuarioDto } from './dto/update-user-team.dto';

@ApiTags('usuarios')
@Controller('usuarios')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    findAll() {
        return this.usuariosService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    findOne(@Param('id') id: string) {
        return this.usuariosService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.usuariosService.update(id, updateUsuarioDto);
    }

    @Patch(':id/suscripcion')
    @ApiOperation({ summary: 'Actualizar suscripción de usuario' })
    updateSuscripcion(
        @Param('id') id: string,
        @Body('tipo') tipoSuscripcion: 'free' | 'premium'
    ) {
        return this.usuariosService.updateSuscripcion(id, tipoSuscripcion);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario' })
    remove(@Param('id') id: string) {
        return this.usuariosService.remove(id);
    }
}