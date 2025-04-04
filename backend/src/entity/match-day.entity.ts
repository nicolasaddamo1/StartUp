import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('matchdays')
export class Matchday {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    number: number;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;
}
