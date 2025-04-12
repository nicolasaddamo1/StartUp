import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user.entity";
import { Torneo } from "./tournaments.entity";
import { JugadorEquipo } from "./player-team.entity";
import { Jugador } from "./player.entity";
import { FormationEnum } from "src/formations/formations.constants";

@Entity('equipo')
export class Equipo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({
    type: 'enum',
    enum: FormationEnum,
    default:FormationEnum.FOUR_FOUR_TWO,
  })
  formacion: FormationEnum;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 100.00 })
  presupuesto_restante: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 100.00 })
  presupuesto_total: number;

  @Column({ nullable: true })
  logo_url: string;

  @ManyToOne(() => Usuario, usuario => usuario.equipos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column()
  usuario_id: string;

  @ManyToOne(() => Jugador)
  @JoinColumn({ name: 'capitan_id' })
  capitan: Jugador;

  @Column({ nullable: true })
  capitan_id: string;

  @OneToMany(() => JugadorEquipo, jugadorEquipo => jugadorEquipo.equipo)
  jugadores_equipo: JugadorEquipo[];

  @ManyToMany(() => Torneo)
  @JoinTable({
    name: 'equipo_torneo',
    joinColumn: { name: 'equipo_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'torneo_id', referencedColumnName: 'id' },
  })
  torneos: Torneo[];
}