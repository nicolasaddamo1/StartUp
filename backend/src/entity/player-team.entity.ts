import { Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Jugador } from "./player.entity";
import { Equipo } from "./team.entity";

export enum EstadoJugador {
    TITULAR = 'titular',
    SUPLENTE = 'suplente',
    RESERVA = 'reserva'
  }
  
  export class JugadorEquipo {
    @PrimaryColumn()
    equipo_id: string;
    
    @PrimaryColumn()
    jugador_id: string;
    
    @Column({ type: 'enum', enum: EstadoJugador, default: EstadoJugador.SUPLENTE })
    estado: EstadoJugador;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_adquisicion: Date;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_compra: number;
    
    @ManyToOne(() => Equipo, equipo => equipo.jugadores_equipo)
    @JoinColumn({ name: 'equipo_id' })
    equipo: Equipo;
    
    @ManyToOne(() => Jugador, jugador => jugador.equipos_jugador)
    @JoinColumn({ name: 'jugador_id' })
    jugador: Jugador;
  }