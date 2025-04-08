import { Column, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Torneo } from "./tournaments.entity";
import { Puntuacion } from "./points.entity";
import { Partido } from "./match.entity";

export enum EstadoFecha {
    PENDIENTE = 'pendiente',
    EN_CURSO = 'en_curso',
    FINALIZADA = 'finalizada'
  }
  
  export class Fecha {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    numero: number;
    
    @Column({ type: 'enum', enum: EstadoFecha, default: EstadoFecha.PENDIENTE })
    estado: EstadoFecha;
    
    @Column({ type: 'timestamp' })
    fecha_inicio: Date;
    
    @Column({ type: 'timestamp' })
    fecha_fin: Date;
    
    @Column({ nullable: true })
    descripcion: string;
    
    @ManyToOne(() => Torneo, torneo => torneo.fechas)
    @JoinColumn({ name: 'torneo_id' })
    torneo: Torneo;
    
    @Column()
    torneo_id: string;
    
    @OneToMany(() => Puntuacion, puntuacion => puntuacion.fecha)
    puntuaciones: Puntuacion[];
    
    @OneToMany(() => Partido, partido => partido.fecha)
    partidos: Partido[];
  }