import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CarritoItem } from '../../carrito-item/entities/carrito-item.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('carritos')
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.id, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @OneToMany(() => CarritoItem, item => item.carrito, { cascade: true })
  items: CarritoItem[];

  @CreateDateColumn({ type: 'timestamp' })
  creado_en: Date;

  @Column({ default: false })
  comprado: boolean;
}
