import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  rut: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column()
  rol: string;

  @Column({ type: 'decimal', default: 0 })
  monto: number;
}