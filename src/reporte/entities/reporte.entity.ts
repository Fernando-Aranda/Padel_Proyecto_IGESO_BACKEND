import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('notificaciones')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;
}
