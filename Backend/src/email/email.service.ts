import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'padelreservas5@gmail.com',
      pass: 'fwal ahxn pkee qwlu'
    }
  });

  async sendReservaConfirmation(email: string, reserva: any) {
    const mailOptions = {
      from: 'padelreservas5@gmail.com',
      to: email,
      subject: 'Confirmación de Reserva de Cancha',
      html: `
        <h2>¡Reserva Confirmada!</h2>
        <p>Hola, tu reserva ha sido confirmada:</p>
        <ul>
          <li><b>Cancha:</b> ${reserva.cancha_nombre || reserva.id_cancha}</li>
          <li><b>Fecha:</b> ${new Date(reserva.fecha_inicio).toLocaleString()}</li>
          <li><b>Hora Fin:</b> ${new Date(reserva.fecha_fin).toLocaleTimeString()}</li>
          <li><b>Monto:</b> $${reserva.monto_total}</li>
        </ul>
        <p>¡Gracias por reservar con nosotros!</p>
      `
    };

    return this.transporter.sendMail(mailOptions);
  }
}