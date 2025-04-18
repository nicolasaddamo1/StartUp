import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JugadorEquipo } from "./player-team.entity";
import { Puntuacion } from "./points.entity";
import { Club } from "./club.entity";

export enum Posicion {
  ARQUERO = 'arquero',
  DEFENSOR = 'defensor',
  MEDIOCAMPISTA = 'mediocampista',
  DELANTERO = 'delantero'
}

@Entity('jugador')
export class Jugador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'enum', enum: Posicion })
  posicion: Posicion;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ default: false })
  lesionado: boolean;

  @Column({ nullable: true })
  imagen_url: string;

  @Column({ default: 0 })
  goles: number;

  @Column({ default: 0 })
  asistencias: number;

  @Column({ default: 0 })
  tarjetas_amarillas: number;

  @Column({ default: 0 })
  tarjetas_rojas: number;

  @Column({ default: 0 })
  arcos_en_cero: number;

  @Column({ default: 0 })
  minutos_jugados: number;

  @Column({ default: 0 })
  puntos_totales: number;

  @Column({ default: 0 })
  penales_atajados: number;

  @Column({ default: 0 })
  partidos_jugados: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  promedio_puntos: number;

  @OneToMany(() => JugadorEquipo, jugadorEquipo => jugadorEquipo.jugador)
  equipos_jugador: JugadorEquipo[];

  @OneToMany(() => Puntuacion, puntuacion => puntuacion.jugador)
  puntuaciones: Puntuacion[];

  @ManyToOne(() => Club)
  @JoinColumn({ name: 'club_real_id' })
  club_real: Club;

  @Column()
  club_real_id: string;
}
