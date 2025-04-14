// src/equipo/equipo.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from 'src/entity/team.entity';
import { FormationEnum, FormationMap, FormationStructure, isFormationValid } from 'src/formations/formations.constants';
import { Jugador } from 'src/entity/player.entity';
import { CreateUserTeamDto } from './folder/user-team.dto';
import { Usuario } from 'src/entity/user.entity';
import { EstadoJugador, JugadorEquipo } from 'src/entity/player-team.entity';

@Injectable()
export class  EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
    @InjectRepository(Jugador)
    private jugadorRepository: Repository<Jugador>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(JugadorEquipo)
    private jugadorEquipoRepository: Repository<JugadorEquipo>
  ) {}

  async getAllTeams():Promise<Equipo[]>{
    return await this.equipoRepository.find()
  }

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

  async updateTeam(equipoId: string, jugadorId:string) {
    // 1. Obtener equipo con relaciones
    const equipo = await this.equipoRepository.findOne({
      where: { id: equipoId },
      relations: ['jugadores_equipo', 'jugadores_equipo.jugador'],
    });
    if (!equipo) throw new Error('Equipo no encontrado');
  
    // 2. Obtener jugador
    const jugador = await this.jugadorRepository.findOneBy({ id: jugadorId });
    if (!jugador) throw new Error('Jugador no encontrado');
  
    // 3. Validar presupuesto
    if (Number(equipo.presupuesto_restante) < Number(jugador.precio)) {
      throw new Error('Presupuesto insuficiente');
    }
  
    // 4. Validar jugador único
    const jugadorYaEnEquipo = equipo.jugadores_equipo.some(
      je => je.jugador.id === jugadorId
    );
    if (jugadorYaEnEquipo) {
      throw new Error('Este jugador ya está en el equipo');
    }
  
    // 5. Validar posición según formación
    const formacion = FormationMap[equipo.formacion];
    const conteoPorPosicion = {
      defensores: equipo.jugadores_equipo.filter(j => j.jugador.posicion === 'defensor').length,
      mediocampistas: equipo.jugadores_equipo.filter(j => j.jugador.posicion === 'mediocampista').length,
      delanteros: equipo.jugadores_equipo.filter(j => j.jugador.posicion === 'delantero').length,
      arqueros: equipo.jugadores_equipo.filter(j => j.jugador.posicion === 'arquero').length,
    };
  
    // Validaciones por posición
    switch (jugador.posicion) {
      case 'defensor':
        if (conteoPorPosicion.defensores >= formacion.defenders) {
          throw new Error('Máximo de defensores alcanzado');
        }
        break;
      case 'mediocampista':
        if (conteoPorPosicion.mediocampistas >= formacion.midfielders) {
          throw new Error('Máximo de mediocampistas alcanzado');
        }
        break;
      case 'delantero':
        if (conteoPorPosicion.delanteros >= formacion.forwards) {
          throw new Error('Máximo de delanteros alcanzado');
        }
        break;
      case 'arquero':
        if (conteoPorPosicion.arqueros >= 1) {
          throw new Error('Solo puedes tener un arquero');
        }
        break;
    }
  
    // 6. Crear y guardar la nueva relación
    const nuevaRelacion = this.jugadorEquipoRepository.create({
      equipo: { id: equipo.id }, // Referencia por ID para evitar cargar toda la entidad
      jugador: { id: jugador.id },
      precio_compra: jugador.precio,
      estado: EstadoJugador.TITULAR
    });
  
    // 7. Actualizar presupuesto
    equipo.presupuesto_restante = Number(equipo.presupuesto_restante) - Number(jugador.precio);
  
    // 8. Guardar todo en una transacción
    await this.equipoRepository.manager.transaction(async manager => {
      await manager.save(JugadorEquipo, nuevaRelacion);
      await manager.update(
        Equipo, 
        { id: equipoId },
        { presupuesto_restante: equipo.presupuesto_restante }
      );
    });
  
    return { success: true, nuevoPresupuesto: equipo.presupuesto_restante };
  }

  async agregarSuplente(equipoId: string, jugadorId: string) {
    const equipo = await this.equipoRepository.findOne({
      where: { id: equipoId },
      relations: ['jugadores_equipo', 'jugadores_equipo.jugador'],
    });
    if (!equipo) throw new Error('Equipo no encontrado');
  
    const jugador = await this.jugadorRepository.findOneBy({ id: jugadorId });
    if (!jugador) throw new Error('Jugador no encontrado');
  
    if (Number(equipo.presupuesto_restante) < Number(jugador.precio)) {
      throw new Error('Presupuesto insuficiente');
    }
  
    const jugadorYaEnEquipo = equipo.jugadores_equipo.some(
      je => je.jugador.id === jugadorId
    );
    if (jugadorYaEnEquipo) {
      throw new Error('Este jugador ya está en el equipo');
    }
  
    const suplentesActuales = equipo.jugadores_equipo.filter(
      je => je.estado === EstadoJugador.SUPLENTE
    );
  
    if (suplentesActuales.length >= 3) {
      throw new Error('Máximo de suplentes alcanzado (3)');
    }
  
    const suplenteExistenteEnPosicion = suplentesActuales.some(
      s => s.jugador.posicion === jugador.posicion
    );
    if (suplenteExistenteEnPosicion) {
      throw new Error(`Ya tienes un suplente en la posición ${jugador.posicion}`);
    }
  
    const nuevaRelacion = this.jugadorEquipoRepository.create({
      equipo: { id: equipo.id },
      jugador: { id: jugador.id },
      precio_compra: jugador.precio,
      estado: EstadoJugador.SUPLENTE 
    });
  
    equipo.presupuesto_restante = Number(equipo.presupuesto_restante) - Number(jugador.precio);
  
    await this.equipoRepository.manager.transaction(async manager => {
      await manager.save(JugadorEquipo, nuevaRelacion);
      await manager.update(
        Equipo, 
        { id: equipoId },
        { presupuesto_restante: equipo.presupuesto_restante }
      );
    });
  
    return { 
      success: true, 
      nuevoPresupuesto: equipo.presupuesto_restante,
      estado: EstadoJugador.SUPLENTE
    };
  }
} 