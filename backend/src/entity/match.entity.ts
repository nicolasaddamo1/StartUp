import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Team } from './team.entity'; // Equipos reales
import { League } from './league.entity'; // Si querés que el partido pertenezca a una liga
import { Matchday } from './match-day.entity';

@Entity('matches')
export class Match {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Team)
    homeTeam: Team;

    @ManyToOne(() => Team)
    awayTeam: Team;

    @Column({ type: 'timestamp' })
    matchDate: Date;

    @Column({ nullable: true })
    homeScore: number;

    @Column({ nullable: true })
    awayScore: number;

    @ManyToOne(() => League, { nullable: true }) // Opcional
    league: League;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Matchday, { nullable: true })
    matchday: Matchday;
}
