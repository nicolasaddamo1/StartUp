import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Team } from './team.entity';
import { UserTeamPlayer } from './user-team-player.entity';
import { MatchResult } from './match-result.entity';

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Team, team => team.players)
    team: Team;

    @Column()
    position: string;

    @Column()
    value: number;

    @Column({ default: 0 })
    goals: number;

    @Column({ default: 0 })
    assists: number;

    @Column({ name: 'yellow_cards', default: 0 })
    yellowCards: number;

    @Column({ name: 'red_cards', default: 0 })
    redCards: number;

    @Column({ name: 'is_injured', default: false })
    isInjured: boolean;

    @OneToMany(() => UserTeamPlayer, utp => utp.player)
    userTeamPlayers: UserTeamPlayer[];

    @OneToMany(() => MatchResult, result => result.player)
    matchResults: MatchResult[];
}
