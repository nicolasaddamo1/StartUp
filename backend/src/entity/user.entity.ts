import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserTeam } from './user-team.entity';
import { UserLeague } from './user-league.entity';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({ default: 100000 })
    balance: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => UserTeam, team => team.user)
    teams: UserTeam[];

    @OneToMany(() => UserLeague, ul => ul.user)
    leagues: UserLeague[];
}
