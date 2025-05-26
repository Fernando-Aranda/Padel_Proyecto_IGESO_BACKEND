import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nombre: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ nullable: true })
  direccion?: string;

  @Column({ type: 'decimal', default: 0 })
  monto: number;
}
