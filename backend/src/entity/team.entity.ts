import { Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user.entity";

export class Equipo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: 100 })
    nombre: string;
    
    @Column({ type: 'varchar', length: 50 })
    formacion: string; // Ej: "4-3-3", "4-4-2"
    
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 100.00 })
    presupuesto_restante: number;
    
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 100.00 })
    presupuesto_total: number;
    
    @Column({ nullable: true })
    logo_url: string;
    
    @ManyToOne(() => Usuario, usuario => usuario.equipos)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
    
    @Column()
    usuario_id: string;
    
    @ManyToOne(() => Jugador)
    @JoinColumn({ name: 'capitan_id' })
    capitan: Jugador;
    
    @Column({ nullable: true })
    capitan_id: string;
    
    @OneToMany(() => JugadorEquipo, jugadorEquipo => jugadorEquipo.equipo)
    jugadores_equipo: JugadorEquipo[];
    
    @ManyToMany(() => Torneo)
    @JoinTable({
      name: 'equipos_torneos',
      joinColumn: { name: 'equipo_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'torneo_id', referencedColumnName: 'id' },
    })
    torneos: Torneo[];
  }