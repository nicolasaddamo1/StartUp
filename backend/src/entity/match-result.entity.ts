import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Player } from './player.entity';
import { Match } from './match.entity';

@Entity('match_results')
export class MatchResult {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Match)
    match: Match;

    @ManyToOne(() => Player)
    player: Player;

    @Column({ default: 0 })
    goals: number;

    @Column({ default: 0 })
    assists: number;

    @Column({ default: 0 })
    yellowCards: number;

    @Column({ default: 0 })
    redCards: number;

    @Column({ default: 0 })
    points: number; // Calculado por las reglas de puntaje
}

