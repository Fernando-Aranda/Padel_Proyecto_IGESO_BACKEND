import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany } from 'typeorm';
import { UsuarioReserva } from '../../usuario_reserva/entities/usuario_reserva.entity';

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

   @OneToMany(() => UsuarioReserva, usuarioReserva => usuarioReserva.usuario)
  usuarioReservas: UsuarioReserva[];
}