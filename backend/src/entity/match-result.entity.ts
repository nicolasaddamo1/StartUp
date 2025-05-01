import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Partido } from "./match.entity";
import { Equipo } from "./team.entity";

@Entity()
export class MatchResult {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    goalsLocal: number;

    @Column()
    goalsVisit: number;

    @Column()
    winner: string;

    @ManyToOne(() => Partido, partido => partido.id)
    @JoinColumn({ name: "partido_id" })
    partido: Partido;

    @ManyToOne(() => Equipo, equipo => equipo.id)
    @JoinColumn({ name: "equipo_local_id" })
    equipoLocal: Equipo;

    @ManyToOne(() => Equipo, equipo => equipo.id)
    @JoinColumn({ name: "equipo_visitante_id" })
    equipoVisitante: Equipo;
}
