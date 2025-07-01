import { useState } from 'react';

interface ModalReporteProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalReporte({ open, onClose }: ModalReporteProps) {
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleGenerar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    if (!descripcion) {
      setMensaje('La descripción es obligatoria');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/reporte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descrip: descripcion, fecha: new Date() }),
      });
      if (!res.ok) throw new Error('No se pudo generar el reporte');
      setMensaje('Reporte generado con éxito');
      setDescripcion('');
      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1200);
    } catch (err) {
      setMensaje('Error al generar el reporte');
    }
  };

  if (!open) return null;

  return (
    <div className="modal" style={{ display: open ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Generar Reporte</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleGenerar}>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              required
              rows={4}
              style={{ width: '100%' }}
            />
          </div>
          {mensaje && <div style={{ color: mensaje.includes('éxito') ? 'green' : 'red', marginTop: 8 }}>{mensaje}</div>}
          <button type="submit" className="form-submit" style={{ marginTop: 12 }}>
            Generar Reporte
          </button>
        </form>
      </div>
    </div>
  );
}