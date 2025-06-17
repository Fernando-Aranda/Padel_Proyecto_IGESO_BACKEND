import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Carrito } from '../../carrito/entities/carrito.entity';
import { Cancha } from '../../cancha/entities/cancha.entity';

@Entity('carrito_items')
export class CarritoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carrito, carrito => carrito.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_carrito' })
  carrito: Carrito;

  @ManyToOne(() => Cancha, cancha => cancha.id, { eager: true })
  @JoinColumn({ name: 'id_cancha' })
  cancha: Cancha;

  @Column({ type: 'timestamp' })
  fecha_inicio: Date;

  @Column({ type: 'timestamp' })
  fecha_fin: Date;

  @Column('decimal')
  monto: number;

}
