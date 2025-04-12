// src/equipo/equipo.controller.ts
import { Controller, Put, Param, Body } from '@nestjs/common';
import { FormationEnum } from 'src/formations/formations.constants';
import { EquipoService } from './team.service';

@Controller('equipos')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Put(':id/formation')
  async updateFormation(
    @Param('id') id: string,
    @Body('formation') formation: FormationEnum,
  ) {
    return this.equipoService.updateFormation(id, formation);
  }
}