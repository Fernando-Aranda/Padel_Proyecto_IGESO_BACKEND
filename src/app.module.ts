import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'padel_db',
      entities: [Usuario],
      synchronize: true, // sólo para desarrollo, no en producción
    }),
    TasksModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
