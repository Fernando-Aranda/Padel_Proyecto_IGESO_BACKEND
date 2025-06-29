import { useState } from 'react';
import '../index.css';

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
}

export default function ModalReserva({ open, cancha, onClose }: ModalReservaProps) {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    try {
      const res = await fetch('http://localhost:3000/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          canchaId: cancha.id,
          fecha,
          hora,
          // Puedes agregar aquí el usuario si tienes sesión
        }),
      });
      if (!res.ok) throw new Error('Error al reservar');
      setMensaje('Reserva realizada con éxito');
      setTimeout(() => {
        onClose();
        setMensaje('');
      }, 1500);
    } catch (err) {
      setMensaje('No se pudo realizar la reserva');
    }
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
          {mensaje && <div style={{ color: mensaje.includes('éxito') ? 'green' : 'red' }}>{mensaje}</div>}
          <button type="submit" className="form-submit">Confirmar Reserva</button>
        </form>
      </div>
    </div>
  );
}