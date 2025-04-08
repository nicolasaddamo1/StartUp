import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Equipo } from "./team.entity";
import { Fecha } from "./fecha.entity";

export enum TipoTorneo {
  FREE = 'free',
  PREMIUM = 'premium'
}

export enum FormatoTorneo {
  FECHA_UNICA = 'fecha_unica',
  LARGO = 'largo',
  ELIMINACION_DIRECTA = 'eliminacion_directa',
  GRUPOS = 'grupos'
}

export enum EstadoTorneo {
  INSCRIPCION = 'inscripcion',
  EN_CURSO = 'en_curso',
  FINALIZADO = 'finalizado'
}

@Entity('torneo')
export class Torneo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'enum', enum: TipoTorneo, default: TipoTorneo.FREE })
  tipo: TipoTorneo;

  @Column({ type: 'enum', enum: FormatoTorneo, default: FormatoTorneo.LARGO })
  formato: FormatoTorneo;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  premio: number;

  @Column({ type: 'timestamp' })
  fecha_inicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_fin: Date;

  @Column({ type: 'enum', enum: EstadoTorneo, default: EstadoTorneo.INSCRIPCION })
  estado: EstadoTorneo;

  @Column({ default: 0 })
  max_participantes: number;

  @Column({ default: 0 })
  participantes_actuales: number;

  @Column({ nullable: true })
  reglas: string;

  @OneToMany(() => Fecha, fecha => fecha.torneo)
  fechas: Fecha[];

  @ManyToMany(() => Equipo)
  @JoinTable({
    name: 'equipos_torneos',
    joinColumn: { name: 'torneo_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'equipo_id', referencedColumnName: 'id' },
  })
  equipos: Equipo[];
}