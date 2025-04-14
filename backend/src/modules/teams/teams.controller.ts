// src/equipo/equipo.controller.ts
import { Controller, Put, Param, Body, Post } from '@nestjs/common';
import { FormationEnum } from 'src/formations/formations.constants';
import { EquipoService } from './team.service';
import { CreateUserTeamDto } from './folder/user-team.dto';
import e from 'express';

@Controller('equipos')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post('team')
  async createTeam( @Body()
    team:CreateUserTeamDto
  ){
    if(!team.nombre || !team.usuario_id)throw new Error('Campos Obligatorios.')
    
    console.log( 'nombre: ', team.nombre)
    console.log( 'usuario_id: ', team.usuario_id)

    return await this.equipoService.createSquad(team);
  }
  @Put(':id/formation')
  async updateFormation(
    @Param('id') id: string,
    @Body('formation') formation: FormationEnum,
  ) {
    return this.equipoService.updateFormation(id, formation);
  }

  @Put(':id/team')
  async updateTeam(
    @Body() jugadorId:string, equipoId:string
  ):Promise<any>
  {
    if(!jugadorId || !equipoId)throw new Error('Campos Obligatorios.')
      return this.equipoService.updateTeam(jugadorId,equipoId)
  }

    
}