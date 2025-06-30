import { useState } from 'react';

interface ModalAgregarSaldoProps {
  open: boolean;
  onClose: () => void;
  saldoActual: number;
  setSaldoActual: (nuevoSaldo: number) => void;
}

export default function ModalAgregarSaldo({ open, onClose, saldoActual, setSaldoActual }: ModalAgregarSaldoProps) {
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleAgregar = (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      setMensaje('Ingrese un monto válido');
      return;
    }
    setSaldoActual(saldoActual + montoNum);
    setMensaje('Saldo agregado con éxito');
    setMonto('');
    setTimeout(() => {
      setMensaje('');
      onClose();
    }, 1200);
  };

  if (!open) return null;

  return (
    <div className="modal" style={{ display: open ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            Agregar Saldo
          </h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <i className="fa-solid fa-coins" style={{ marginRight: 8, color: '#ffb700', fontSize: 22 }}></i>
          <div style={{ fontWeight: 600, fontSize: 18, color: '#4a6fa5' }}>
            Saldo actual: <span style={{ color: '#ff7e5f' }}>${saldoActual.toLocaleString()}</span>
          </div>
        </div>
        <form onSubmit={handleAgregar}>
          <div className="form-group">
            <label>Monto a agregar</label>
            <input
              type="number"
              min="1"
              value={monto}
              onChange={e => setMonto(e.target.value)}
              placeholder="Ej: 500"
              required
            />
          </div>
          {mensaje && <div style={{ color: mensaje.includes('éxito') ? 'green' : 'red', marginTop: 8 }}>{mensaje}</div>}
          <button type="submit" className="form-submit" style={{ marginTop: 12 }}>
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}