import { Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./user.entity";
import { Torneo } from "./tournaments.entity";

export class UsuarioTorneo {
    @PrimaryColumn()
    usuario_id: string;
    
    @PrimaryColumn()
    torneo_id: string;
    
    @Column({ type: 'enum', enum: ['admin', 'participante', 'observador'], default: 'participante' })
    rol: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_inscripcion: Date;
    
    @Column({ default: false })
    pago_confirmado: boolean;
    
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
    
    @ManyToOne(() => Torneo)
    @JoinColumn({ name: 'torneo_id' })
    torneo: Torneo;
  }