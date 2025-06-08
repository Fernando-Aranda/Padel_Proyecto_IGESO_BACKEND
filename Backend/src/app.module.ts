import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { CanchaModule } from './cancha/cancha.module';
import { ReservaModule } from './reserva/reserva.module';
import { UsuarioReservaModule } from './usuario_reserva/usuario_reserva.module';
import { PagoModule } from './pago/pago.module';
import { NotificacionModule } from './notificacion/notificacion.module';
import { AdminModule } from './admin/admin.module';
import { ReporteModule } from './reporte/reporte.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // el user
      password: 'postgres', // la contraseña de la base de datos
      database: 'padel_db', // el nombre de la base de datos
      entities: [Usuario],
      synchronize: true, // sólo para desarrollo, no en producción
    }),
    TasksModule,
    UsuarioModule,
    CanchaModule,
    ReservaModule,
    UsuarioReservaModule,
    PagoModule,
    NotificacionModule,
    AdminModule,
    ReporteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
