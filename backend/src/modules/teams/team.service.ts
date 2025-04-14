// src/equipo/equipo.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from 'src/entity/team.entity';
import { FormationEnum, FormationMap, FormationStructure, isFormationValid } from 'src/formations/formations.constants';
import { Jugador } from 'src/entity/player.entity';
import { CreateUserTeamDto } from './folder/user-team.dto';
import { Usuario } from 'src/entity/user.entity';
import { identity } from 'rxjs';
import { JugadorEquipo } from 'src/entity/player-team.entity';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
    @InjectRepository(Jugador)
    private jugadorRepository: Repository<Jugador>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(JugadorEquipo)
    private jugadoreEquipoRepository: Repository<JugadorEquipo>
  ) {}
  async createSquad(team:CreateUserTeamDto):Promise<Equipo>{
    const validateUser= await this. usuarioRepository.findOne({where:{id:team.usuario_id}})
    if (!validateUser)throw new Error('Usuario no encontrado.')

    const savedSquad = await this.equipoRepository.save(
  {    nombre: team.nombre,
      usuario_id: team.usuario_id}
    )
    return savedSquad
  }
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
  // src/equipo/equipo.service.ts
async validateTeamPlayers(equipoId: string): Promise<boolean> {
    const equipo = await this.equipoRepository.findOne({
      where: { id: equipoId },
      relations: ['jugadores_equipo', 'jugadores_equipo.jugador'],
    });
    if (!equipo)throw new Error('Equipo no encontrado')
    const formationStructure = await this.getFormationStructure(equipo.formacion);
    const playersByPosition = {
      defenders: equipo.jugadores_equipo.filter(j => j.jugador.posicion === 'defensor').length,
      midfielders: equipo.jugadores_equipo.filter(j => j.jugador.posicion === 'mediocampista').length,
      forwards: equipo.jugadores_equipo.filter(j => j.jugador.posicion === 'delantero').length,
    };
  
    return (
      playersByPosition.defenders === formationStructure.defenders &&
      playersByPosition.midfielders === formationStructure.midfielders &&
      playersByPosition.forwards === formationStructure.forwards
    );
  }
  async updateTeam(jugadorId:string, equipoId:string){
    const equipo = await this.equipoRepository.findOne({
      where:{id:equipoId},
      relations: ['jugadores_equipo', 'jugadores_equipo.jugador'],
    });
    if (!equipo)throw new Error('Equipo no encontrado.')

    const jugador = await this.jugadorRepository.findOneBy({id:jugadorId})
    if(!jugador) throw new Error('Jugador no encontrado')
    
    if (equipo?.presupuesto_restante < jugador.precio)throw new Error('Presupuesto insuficiente')

    const formacion = FormationMap[equipo.formacion]
    const jugadoresActuales = equipo.jugadores_equipo

    const conteoPorPosicion = {
      defensores:jugadoresActuales.filter(j=>j.jugador.posicion === 'defensor').length,
      mediocampistas:jugadoresActuales.filter(j=>j.jugador.posicion === 'mediocampista').length,
      delanteros:jugadoresActuales.filter(j=>j.jugador.posicion === 'delantero').length,
      arquero:jugadoresActuales.filter(j=>j.jugador.posicion === 'arquero').length,
    }

    if (jugador.posicion === 'defensor' && conteoPorPosicion.defensores>=formacion.defenders){
      throw new Error('Maximo de defensores alcanzado')
    }
    if (jugador.posicion === 'delantero' && conteoPorPosicion.delanteros>=formacion.forwards){
      throw new Error('Maximo de delanteros alcanzado')
    }
    if (jugador.posicion === 'mediocampista' && conteoPorPosicion.mediocampistas>=formacion.midfielders){
      throw new Error('Maximo de mediocampistas alcanzado')
    }
    if (jugador.posicion === 'arquero' && conteoPorPosicion.arquero>= 1){
      throw new Error('Arquero ya seleccionado')
    }

    const nuevaRelacion = this.jugadoreEquipoRepository.create({
      equipo,
      jugador,
      precio_compra:jugador.precio
    })
    equipo.presupuesto_restante -= jugador.precio;
    await this.jugadoreEquipoRepository.save(nuevaRelacion);

    return this.equipoRepository.save(equipo);

  }
} 