import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reserva, reserva => reserva.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_reserva' })
  reserva: Reserva;

  @Column('decimal')
  monto: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column()
  medio_pago: string;

  @Column()
  estado: string;
}
