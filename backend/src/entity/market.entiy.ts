import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Torneo } from "./tournaments.entity";

@Entity('mercados')
export class Mercado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  fecha_apertura: Date;

  @Column({ type: 'timestamp' })
  fecha_cierre: Date;

  @Column({ default: true })
  activo: boolean;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'enum', enum: ['inicial', 'regular', 'final'], default: 'regular' })
  tipo: string;

  @ManyToOne(() => Torneo)
  @JoinColumn({ name: 'torneo_id' })
  torneo: Torneo;

  @Column({ nullable: true })
  torneo_id: string;
}