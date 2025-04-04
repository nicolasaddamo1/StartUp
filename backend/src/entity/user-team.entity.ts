import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { UserTeamPlayer } from './user-team-player.entity';

@Entity('user_teams')
export class UserTeam {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.teams)
    user: User;

    @Column({ name: 'team_name' })
    teamName: string;

    @Column({ default: 100000 })
    budget: number;

    @OneToMany(() => UserTeamPlayer, utp => utp.userTeam)
    players: UserTeamPlayer[];
}
