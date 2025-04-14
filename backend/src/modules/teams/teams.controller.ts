// src/equipo/equipo.controller.ts
import { Controller, Put, Param, Body, Post } from '@nestjs/common';
import { FormationEnum } from 'src/formations/formations.constants';
import { EquipoService } from './team.service';
import { CreateUserTeamDto } from './folder/user-team.dto';

@Controller('equipos')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post('team')
  async createTeam( @Body('team')
    team:CreateUserTeamDto
  ){
    if(!team.teamName || !team.userId)throw new Error('Campos Obligatorios.')
    return this.equipoService.createSquad(team);
  }
  @Put(':id/formation')
  async updateFormation(
    @Param('id') id: string,
    @Body('formation') formation: FormationEnum,
  ) {
    return this.equipoService.updateFormation(id, formation);
  }

    
}