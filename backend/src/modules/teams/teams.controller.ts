// src/equipo/equipo.controller.ts
import { Controller, Put, Param, Body, Post, Get } from '@nestjs/common';
import { FormationEnum } from 'src/formations/formations.constants';
import { EquipoService } from './team.service';
import { CreateUserTeamDto } from './folder/user-team.dto';
import { Equipo } from 'src/entity/team.entity';

@Controller('equipos')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}
  @Get()
  async getAllTeams():Promise<Equipo[]>{
    return this.equipoService.getAllTeams()
  }

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

  @Put(':equipoId/team')
  async updateTeam(
    @Param('equipoId')equipoId:string,
    @Body('jugadorId') jugadorId:string
  ):Promise<any>
  {
    if(!jugadorId || !equipoId)throw new Error('Campos Obligatorios.')
    
      console.log('Tipo de jugadorId:', typeof jugadorId, 'Valor:', jugadorId);

      return this.equipoService.updateTeam(equipoId, jugadorId)
  }
  @Put(':equipoId/banchwarmers')
  async banchwarmers(
    @Param('equipoId')equipoId:string,
    @Body('jugadorId') jugadorId:string
  ):Promise<any>
  {
    if(!jugadorId || !equipoId)throw new Error('Campos Obligatorios.')
    
      console.log('Tipo de jugadorId:', typeof jugadorId, 'Valor:', jugadorId);

      return this.equipoService.agregarSuplente(equipoId, jugadorId)
  }

    
}