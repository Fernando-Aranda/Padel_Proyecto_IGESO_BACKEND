import { useState } from 'react';

type Cancha = {
  id: number;
  nombre: string;
  capacidad_maxima: number;
  precio_por_hora: number;
  estado: string;
};

interface ModalEditarCanchaProps {
  cancha: Cancha;
  onClose: () => void;
  onCanchaEditada: (canchaEditada: Cancha) => void;
}

export default function ModalEditarCancha({ cancha, onClose, onCanchaEditada }: ModalEditarCanchaProps) {
  const [nombre, setNombre] = useState(cancha.nombre);
  const [capacidad_maxima, setCapacidadMaxima] = useState(cancha.capacidad_maxima);
  const [precio_por_hora, setPrecioPorHora] = useState(cancha.precio_por_hora);
  const [estado, setEstado] = useState(cancha.estado);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMensaje('');
    try {
      const res = await fetch(`http://localhost:3000/cancha/${cancha.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          capacidad_maxima: Number(capacidad_maxima),
          precio_por_hora: Number(precio_por_hora),
          estado
        }),
      });
      if (!res.ok) throw new Error('No se pudo actualizar la cancha');
      const data = await res.json();
      setMensaje('Cancha actualizada con éxito');
      onCanchaEditada(data);
    } catch {
      setMensaje('Error al actualizar la cancha');
    }
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Cancha</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Capacidad Máxima</label>
            <input type="number" min="1" value={capacidad_maxima} onChange={e => setCapacidadMaxima(Number(e.target.value))} required />
          </div>
          <div className="form-group">
            <label>Precio por Hora</label>
            <input type="number" min="0" value={precio_por_hora} onChange={e => setPrecioPorHora(Number(e.target.value))} required />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input value={estado} onChange={e => setEstado(e.target.value)} required />
          </div>
          {mensaje && <div style={{ color: mensaje.includes('éxito') ? 'green' : 'red', marginTop: 8 }}>{mensaje}</div>}
          <button type="submit" className="form-submit" style={{ marginTop: 12 }}>
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}