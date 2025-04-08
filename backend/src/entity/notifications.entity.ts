import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user.entity";

export enum TipoNotificacion {
    SISTEMA = 'sistema',
    TORNEO = 'torneo',
    EQUIPO = 'equipo',
    MERCADO = 'mercado',
    JUGADOR = 'jugador'
  }
  
  export class Notificacion {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: 255 })
    titulo: string;
    
    @Column({ type: 'text' })
    mensaje: string;
    
    @Column({ type: 'enum', enum: TipoNotificacion })
    tipo: TipoNotificacion;
    
    @Column({ default: false })
    leida: boolean;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_creacion: Date;
    
    @Column({ nullable: true })
    fecha_lectura: Date;
    
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
    
    @Column()
    usuario_id: string;
    
    @Column({ nullable: true })
    entidad_relacionada_id: string;
    
    @Column({ nullable: true })
    tipo_entidad_relacionada: string;
  }