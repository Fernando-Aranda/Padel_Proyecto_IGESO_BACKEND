import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('admin')
export class Admin extends Usuario {
    
}
