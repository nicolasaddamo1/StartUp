import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user.entity";

export enum TipoTransaccion {
  COMPRA_SUSCRIPCION = 'compra_suscripcion',
  RENOVACION_SUSCRIPCION = 'renovacion_suscripcion',
  PREMIO_TORNEO = 'premio_torneo',
  INSCRIPCION_TORNEO = 'inscripcion_torneo',
  TRANSFERENCIA_JUGADOR = 'transferencia_jugador',
  BONO = 'bono',
  OTRO = 'otro'
}

@Entity('transaccion')
export class Transaccion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TipoTransaccion })
  tipo: TipoTransaccion;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ nullable: true })
  referencia_externa: string;

  @Column({ default: true })
  exitosa: boolean;

  @ManyToOne(() => Usuario, usuario => usuario.transacciones)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column()
  usuario_id: string;

  @Column({ nullable: true })
  entidad_relacionada_id: string;

  @Column({ nullable: true })
  tipo_entidad_relacionada: string;
}