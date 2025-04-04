import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('matchdays')
export class Matchday {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    number: number; // Fecha 1, 2, 3...

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;
}
