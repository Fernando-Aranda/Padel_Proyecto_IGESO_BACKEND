import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';

@Entity('usuario_reservas')
export class UsuarioReserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reserva, reserva => reserva.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_reserva' })
  reserva: Reserva;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  rut: string;

  @Column()
  edad: number;
}
