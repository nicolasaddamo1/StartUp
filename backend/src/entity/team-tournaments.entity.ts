import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Equipo } from "./team.entity";
import { Torneo } from "./tournaments.entity";

@Entity('equipos_torneos')
export class EquipoTorneo {
  @PrimaryColumn()
  equipo_id: string;

  @PrimaryColumn()
  torneo_id: string;

  @Column({ default: 0 })
  puntos_acumulados: number;

  @Column({ default: 0 })
  posicion_actual: number;

  @Column({ default: 0 })
  victorias: number;

  @Column({ default: 0 })
  empates: number;

  @Column({ default: 0 })
  derrotas: number;

  @Column({ default: 0 })
  goles_a_favor: number;

  @Column({ default: 0 })
  goles_en_contra: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_inscripcion: Date;

  @ManyToOne(() => Equipo)
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @ManyToOne(() => Torneo)
  @JoinColumn({ name: 'torneo_id' })
  torneo: Torneo;
}