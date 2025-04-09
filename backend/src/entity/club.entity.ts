import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Jugador } from "./player.entity";

@Entity('club')
export class Club {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    nombre: string;

    @Column({ nullable: true })
    escudo_url: string;

    @OneToMany(() => Jugador, jugador => jugador.club_real)
    jugadores: Jugador[];
}