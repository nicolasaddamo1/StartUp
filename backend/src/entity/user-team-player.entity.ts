import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserTeam } from './user-team.entity';
import { Player } from './player.entity';

@Entity('user_team_players')
export class UserTeamPlayer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserTeam, userTeam => userTeam.players)
    userTeam: UserTeam;

    @ManyToOne(() => Player, player => player.userTeamPlayers)
    player: Player;

    @Column({ name: 'is_starter', default: true })
    isStarter: boolean;

    @Column({ name: 'is_captain', default: false })
    isCaptain: boolean;
}
