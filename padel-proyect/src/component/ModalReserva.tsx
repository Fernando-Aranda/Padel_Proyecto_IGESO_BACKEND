import { useState } from 'react';
import useSessionStore from '../stores/useSessionStorage';

interface ModalReservaProps {
  open: boolean;
  cancha: {
    id: number;
    nombre: string;
    capacidad_maxima: number;
    precio_por_hora: string;
    estado: string;
  };
  onClose: () => void;
  agregarAlCarrito: (reserva: any) => void;
}

export default function ModalReserva({ open, cancha, onClose, agregarAlCarrito }: ModalReservaProps) {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');

    const id_usuario = Number(useSessionStore.getState().userId);
    if (!id_usuario) {
      setMensaje('Usuario no autenticado');
      return;
    }

    const fecha_inicio = `${fecha}T${hora}:00`;
    const fecha_fin = new Date(fecha_inicio);
    fecha_fin.setHours(fecha_fin.getHours() + 1);

    const reserva = {
      id_usuario,
      id_cancha: cancha.id,
      fecha_inicio,
      fecha_fin: fecha_fin.toISOString(),
      estado: 'pendiente',
      monto_total: parseFloat(cancha.precio_por_hora),
      cancha_nombre: cancha.nombre,
    };

    agregarAlCarrito(reserva);
    setMensaje('Reserva agregada al carrito');
    setFecha('');
    setHora('');
  };

  if (!open) return null;

  return (
    <div className="modal" style={{ display: open ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Reservar {cancha.nombre}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Hora</label>
            <input type="time" value={hora} onChange={e => setHora(e.target.value)} required />
          </div>
          {mensaje && <div style={{ color: mensaje.includes('carrito') ? 'green' : 'red' }}>{mensaje}</div>}
          <button type="submit" className="form-submit">Agregar al Carrito</button>
        </form>
      </div>
    </div>
  );
}