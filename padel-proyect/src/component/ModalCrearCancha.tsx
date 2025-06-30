import { useState } from 'react';

interface ModalCrearCanchaProps {
  open: boolean;
  onClose: () => void;
  onCanchaCreada: () => void;
}

export default function ModalCrearCancha({ open, onClose, onCanchaCreada }: ModalCrearCanchaProps) {
  const [nombre, setNombre] = useState('');
  const [capacidad_maxima, setCapacidadMaxima] = useState('');
  const [precio_por_hora, setPrecioPorHora] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    if (!nombre || !capacidad_maxima || !precio_por_hora) {
      setMensaje('Completa todos los campos');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/cancha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          capacidad_maxima: Number(capacidad_maxima),
          precio_por_hora: precio_por_hora,
          estado: 'disponible'
        }),
      });
      if (!res.ok) throw new Error('No se pudo crear la cancha');
      setMensaje('Cancha creada con éxito');
      setNombre('');
      setCapacidadMaxima('');
      setPrecioPorHora('');
      setTimeout(() => {
        setMensaje('');
        onCanchaCreada();
      }, 1000);
    } catch (err) {
      setMensaje('Error al crear la cancha');
    }
  };

  if (!open) return null;

  return (
    <div className="modal" style={{ display: open ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Crear Nueva Cancha</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Capacidad Máxima</label>
            <input type="number" min="1" value={capacidad_maxima} onChange={e => setCapacidadMaxima(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Precio por Hora</label>
            <input type="number" min="0" value={precio_por_hora} onChange={e => setPrecioPorHora(e.target.value)} required />
          </div>
          {mensaje && <div style={{ color: mensaje.includes('éxito') ? 'green' : 'red', marginTop: 8 }}>{mensaje}</div>}
          <button type="submit" className="form-submit" style={{ marginTop: 12 }}>
            Crear Cancha
          </button>
        </form>
      </div>
    </div>
  );
}