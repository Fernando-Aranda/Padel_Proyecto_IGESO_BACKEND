import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('canchas')
export class Cancha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  capacidad_maxima: number;

  @Column('decimal')
  precio_por_hora: number;

  @Column()
  estado: string;
}
