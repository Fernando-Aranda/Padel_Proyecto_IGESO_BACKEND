import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Cancha } from '../../cancha/entities/cancha.entity';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.id, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Cancha, cancha => cancha.id, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_cancha' })
  cancha: Cancha;

  @Column({ type: 'timestamp' })
  fecha_inicio: Date;

  @Column({ type: 'timestamp' })
  fecha_fin: Date;

  @Column()
  estado: string;

  @Column('decimal')
  monto_total: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;
}
