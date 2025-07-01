import { useEffect, useState } from 'react';

interface ModalReporteProps {
  open: boolean;
  onClose: () => void;
}

interface Cancha {
  id: number;
  nombre: string;
  estado: string;
}

export default function ModalReporte({ open, onClose }: ModalReporteProps) {
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [canchaId, setCanchaId] = useState('');
  const [reporte, setReporte] = useState<any>(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (open) {
      fetch('http://localhost:3000/cancha')
        .then(res => res.json())
        .then(data => setCanchas(data));
      setReporte(null);
      setCanchaId('');
      setMensaje('');
    }
  }, [open]);

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setReporte(null);
    if (!canchaId) {
      setMensaje('Selecciona una cancha');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/reporte/cancha/${canchaId}`);
      if (!res.ok) throw new Error('No se pudo obtener el reporte');
      const data = await res.json();
      setReporte(data);
    } catch {
      setMensaje('Error al obtener el reporte');
    }
  };

  if (!open) return null;

  return (
    <div className="modal" style={{ display: open ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Reporte por Cancha</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleConsultar}>
          <div className="form-group">
            <label>Selecciona una cancha</label>
            <select value={canchaId} onChange={e => setCanchaId(e.target.value)} required>
              <option value="">-- Selecciona --</option>
              {canchas.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="form-submit" style={{ marginTop: 12 }}>
            Consultar
          </button>
        </form>
        {mensaje && <div style={{ color: 'red', marginTop: 8 }}>{mensaje}</div>}
        {reporte && (
          <div style={{ marginTop: 20, background: '#f7f7f7', padding: 16, borderRadius: 8 }}>
            <h3>Datos de la Cancha</h3>
            <div><b>Nombre:</b> {reporte.nombre}</div>
            <div><b>Estado:</b> {reporte.estado}</div>
            <div><b>Total generado:</b> ${reporte.totalGenerado.toLocaleString()}</div>
            <div><b>Cantidad de veces reservada:</b> {reporte.cantidadReservas}</div>
          </div>
        )}
      </div>
    </div>
  );
}