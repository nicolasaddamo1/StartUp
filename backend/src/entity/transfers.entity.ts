import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Equipo } from "./team.entity";
import { Mercado } from "./market.entiy";
import { Jugador } from "./player.entity";

@Entity('transferencia')
export class Transferencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Equipo)
  @JoinColumn({ name: 'equipo_origen_id' })
  equipo_origen: Equipo;

  @Column({ nullable: true })
  equipo_origen_id: string;

  @ManyToOne(() => Equipo)
  @JoinColumn({ name: 'equipo_destino_id' })
  equipo_destino: Equipo;

  @Column()
  equipo_destino_id: string;

  @ManyToOne(() => Jugador)
  @JoinColumn({ name: 'jugador_id' })
  jugador: Jugador;

  @Column()
  jugador_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @ManyToOne(() => Mercado)
  @JoinColumn({ name: 'mercado_id' })
  mercado: Mercado;

  @Column({ nullable: true })
  mercado_id: string;
}