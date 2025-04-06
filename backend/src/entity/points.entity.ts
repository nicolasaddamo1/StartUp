// src/modules/points/entities/point.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Player } from './player.entity';
import { Match } from './match.entity';

@Entity('points')
export class Point {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Player)
    @JoinColumn({ name: 'player_id' })
    player: Player;

    @ManyToOne(() => Match)
    @JoinColumn({ name: 'match_id' })
    match: Match;

    @Column()
    score: number;

    @Column({ name: 'is_player_of_the_match', default: false })
    isPlayerOfTheMatch: boolean;

    @Column({ name: 'is_player_of_the_week', default: false })
    isPlayerOfTheWeek: boolean;
}
