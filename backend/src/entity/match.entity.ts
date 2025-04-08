import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fecha } from "./fecha.entity";

export enum EstadoPartido {
    PROGRAMADO = 'programado',
    EN_JUEGO = 'en_juego',
    FINALIZADO = 'finalizado',
    CANCELADO = 'cancelado',
    SUSPENDIDO = 'suspendido'
  }
  
  export class Partido {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: 100 })
    equipo_local: string;
    
    @Column({ length: 100 })
    equipo_visitante: string;
    
    @Column({ nullable: true })
    goles_local: number;
    
    @Column({ nullable: true })
    goles_visitante: number;
    
    @Column({ type: 'timestamp' })
    fecha_hora: Date;
    
    @Column({ length: 100, nullable: true })
    estadio: string;
    
    @Column({ type: 'enum', enum: EstadoPartido, default: EstadoPartido.PROGRAMADO })
    estado: EstadoPartido;
    
    @ManyToOne(() => Fecha, fecha => fecha.partidos)
    @JoinColumn({ name: 'fecha_id' })
    fecha: Fecha;
    
    @Column()
    fecha_id: string;
  }