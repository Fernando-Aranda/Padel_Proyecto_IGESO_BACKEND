import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CanchaModule } from './cancha/cancha.module';
import { ReservaModule } from './reserva/reserva.module';
import { UsuarioReservaModule } from './usuario_reserva/usuario_reserva.module';
import { PagoModule } from './pago/pago.module';
import { NotificacionModule } from './notificacion/notificacion.module';
import { AdminModule } from './admin/admin.module';
import { ReporteModule } from './reporte/reporte.module';

// Entidades
import { Usuario } from './usuario/entities/usuario.entity';
import { Cancha } from './cancha/entities/cancha.entity';
import { Reserva } from './reserva/entities/reserva.entity';
import { UsuarioReserva } from './usuario_reserva/entities/usuario_reserva.entity';
import { Pago } from './pago/entities/pago.entity';
import { Notificacion } from './notificacion/entities/notificacion.entity';
import { Admin } from './admin/entities/admin.entity';
import { CarritoModule } from './carrito/carrito.module';
import { CarritoItemModule } from './carrito-item/carrito-item.module';
import { Carrito } from './carrito/entities/carrito.entity';
import { CarritoItem } from './carrito-item/entities/carrito-item.entity';
import { EmailService } from './email/email.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'padel_db',
      entities: [
        Usuario,
        Cancha,
        Reserva,
        UsuarioReserva,
        Pago,
        Notificacion,
        Admin,
        Carrito,       
        CarritoItem,
      ],
      synchronize: true, // solo en desarrollo
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
    AuthModule,
    CarritoModule,
    CarritoItemModule,
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService]
})
export class AppModule {}
