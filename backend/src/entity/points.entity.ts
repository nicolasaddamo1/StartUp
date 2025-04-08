import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Jugador } from "./player.entity";
import { Fecha } from "./fecha.entity";

@Entity('puntuacion')
export class Puntuacion {
  @PrimaryColumn()
  jugador_id: string;

  @PrimaryColumn()
  fecha_id: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  puntos_base: number;

  @Column({ default: 0 })
  goles: number;

  @Column({ default: 0 })
  asistencias: number;

  @Column({ default: 0 })
  tarjetas_amarillas: number;

  @Column({ default: 0 })
  tarjetas_rojas: number;

  @Column({ default: 0 })
  penales_atajados: number;

  @Column({ default: 0 })
  penales_errados: number;

  @Column({ default: 0 })
  arcos_en_cero: number;

  @Column({ default: 0 })
  goles_en_contra: number;

  @Column({ default: false })
  mvp: boolean;

  @Column({ default: false })
  jugador_fecha: boolean;

  @Column({ default: 0 })
  minutos_jugados: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  puntos_totales: number;

  @ManyToOne(() => Jugador, jugador => jugador.puntuaciones)
  @JoinColumn({ name: 'jugador_id' })
  jugador: Jugador;

  @ManyToOne(() => Fecha, fecha => fecha.puntuaciones)
  @JoinColumn({ name: 'fecha_id' })
  fecha: Fecha;
}