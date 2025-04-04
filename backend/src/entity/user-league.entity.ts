import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { League } from './league.entity';

@Entity('user_leagues')
export class UserLeague {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.leagues)
    user: User;

    @ManyToOne(() => League, league => league.participants)
    league: League;

    @CreateDateColumn({ name: 'joined_at' })
    joinedAt: Date;

    @Column({ name: 'is_paid', default: false })
    isPaid: boolean;

    @Column({ name: 'total_points', default: 0 })
    totalPoints: number;
}
