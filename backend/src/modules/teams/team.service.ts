// src/equipo/equipo.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from 'src/entity/team.entity';
import { FormationEnum, FormationMap, FormationStructure, isFormationValid } from 'src/formations/formations.constants';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
  ) {}

  // Cambiar formación de un equipo (con validación)
  async updateFormation(equipoId: string, newFormation: FormationEnum): Promise<Equipo> {
    if (!isFormationValid(newFormation)) {
      throw new Error('Formación no válida');
    }

    const equipo = await this.equipoRepository.findOneBy({ id: equipoId });
    if (!equipo) throw new Error('Equipo no encontrado')
    equipo.formacion = newFormation;

    return this.equipoRepository.save(equipo);
  }

  // Obtener estructura de la formación (defensas, mediocampistas, etc.)
  getFormationStructure(formation: FormationEnum): FormationStructure {
    return FormationMap[formation];
  }
}