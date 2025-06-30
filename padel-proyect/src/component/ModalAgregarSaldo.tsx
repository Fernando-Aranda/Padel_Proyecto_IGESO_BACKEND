import { useState } from 'react';
import useSessionStore from '../stores/useSessionStorage';

interface ModalAgregarSaldoProps {
  open: boolean;
  onClose: () => void;
  saldoActual: number;
  setSaldoActual: (nuevoSaldo: number) => void;
}

export default function ModalAgregarSaldo({ open, onClose, saldoActual, setSaldoActual }: ModalAgregarSaldoProps) {
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleAgregar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      setMensaje('Ingrese un monto válido');
      return;
    }
    
    const id_usuario = Number(useSessionStore.getState().userId);
    if (!id_usuario) {
      setMensaje('Usuario no autenticado');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/usuario/${id_usuario}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monto: montoNum }),
      });
      if (!res.ok) throw new Error('No se pudo agregar saldo');
      const data = await res.json();
      const nuevoSaldo = data.saldoActual ?? data.saldo ?? saldoActual + montoNum;
      setSaldoActual(nuevoSaldo);
      setMensaje('Saldo agregado con éxito');
      setMonto('');
      setTimeout(() => {
        setMensaje('');
        onClose();
      }, 1200);
    } catch (error) {
      setMensaje('Error al agregar saldo: ' + error);
    }
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