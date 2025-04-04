import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserLeague } from './user-league.entity';

export enum LeagueType {
    FREE = 'free',
    PAID = 'paid'
}

@Entity('leagues')
export class League {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: LeagueType
    })
    type: LeagueType;

    @Column({ name: 'entry_fee', default: 0 })
    entryFee: number;

    @Column({ name: 'prize_pool', default: 0 })
    prizePool: number;

    @OneToMany(() => UserLeague, ul => ul.league)
    participants: UserLeague[];
}
