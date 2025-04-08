import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ length: 100 })
    nombre: string;
    
    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string; // Almacenado como hash
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_registro: Date;
    
    @Column({ type: 'enum', enum: ['free', 'premium'], default: 'free' })
    suscripcion: string;
    
    @Column({ nullable: true })
    avatar_url: string;
    
    @Column({ default: false })
    email_verificado: boolean;
    
    @Column({ nullable: true })
    ultimo_login: Date;
    
    @OneToMany(() => Equipo, equipo => equipo.usuario)
    equipos: Equipo[];
    
    @OneToMany(() => Transaccion, transaccion => transaccion.usuario)
    transacciones: Transaccion[];
    
    @ManyToMany(() => Torneo)
    @JoinTable({
      name: 'usuarios_torneos',
      joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'torneo_id', referencedColumnName: 'id' },
    })
    torneos: Torneo[];
  }