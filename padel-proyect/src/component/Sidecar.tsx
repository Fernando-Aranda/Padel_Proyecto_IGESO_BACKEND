import '../index.css'
import { useEffect, useState } from 'react';

interface Reserva {
  id_usuario: number;
  id_cancha: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  monto_total: number;
  cancha_nombre?: string;
}

interface SidecarProps {
  stateToggleSidecar: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  carrito: Reserva[];
  setCarrito: React.Dispatch<React.SetStateAction<Reserva[]>>;
  saldoActual: number;
  setSaldoActual: (nuevoSaldo: number) => void;
}

export default function Sidecar( {stateToggleSidecar, carrito, setCarrito, saldoActual, setSaldoActual}: SidecarProps ) {
    const [toggleSidecar, setToggleSidecar] = stateToggleSidecar;

    const handlePagarCarrito = async () => {
        let total = carrito.reduce((sum, r) => sum + r.monto_total, 0);
        if (saldoActual < total) {
            alert('Saldo insuficiente');
            return;
        }
        try {
            for (const reserva of carrito) {
                await fetch('http://localhost:3000/reserva', {
                    method: 'POST',
                    headers: { 'Content-Type':  'application/json' },
                    body: JSON.stringify({...reserva, estado: 'ocupada' }),
                });
            }
            setSaldoActual(saldoActual - total)
            setCarrito([]);
            alert('Pago realizado y reservas confirmadas');
        } catch (e) {
            alert('Error al procesar el pago');
        }
    };

    const handleCloseCart = () => {
        setToggleSidecar(false);
    }

    const handleAgregarSaldo = () => {
        // @ts-ignore
        window.setModalSaldoOpen && window.setModalSaldoOpen(true);
    };

    const total = Array.isArray(carrito)
    ? carrito.reduce((sum, reserva) => sum + (Number(reserva.monto_total) || 0), 0)
    : 0;

  return (
    <div className="cart-sidebar" id="cartSidebar" style={{ right: toggleSidecar ? '0' : '-400px' }}>
        <div className="cart-header">
            <h3>Tu Carrito de Reservas</h3>
            <button className="close-cart-btn" id="closeCartBtn" onClick={handleCloseCart}>&times;</button>
        </div>
      <div className="cart-items" id="cartItems">
      {(Array.isArray(carrito) && carrito.length === 0) ? (
        <div className="empty-cart-message" id="emptyCartMessage">No hay reservas en tu carrito.</div>
      ) : (
        Array.isArray(carrito) && carrito.map((reserva, idx) => {
          let fechaInicio = reserva.fecha_inicio ? new Date(reserva.fecha_inicio) : null;
          let fechaFin = reserva.fecha_fin ? new Date(reserva.fecha_fin) : null;
          return (
            <div key={idx} className="cart-item">
              <div>
                <b>{reserva.cancha_nombre || `Cancha ${reserva.id_cancha}`}</b>
                <div>
                  {fechaInicio && fechaFin
                    ? `${fechaInicio.toLocaleString()} - ${fechaFin.toLocaleTimeString()}`
                    : 'Fecha no disponible'}
                </div>
                <div>Estado: {reserva.estado}</div>
              </div>
              <div>
                <b>${reserva.monto_total?.toLocaleString?.() ?? reserva.monto_total}</b>
              </div>
            </div>
          );
        })
      )}
    </div>
        {/* Botón Agregar Saldo */}
            <button
                style={{
                    width: '100%',
                    background: 'white',
                    border: '2px solid #ffb700',
                    borderRadius: 30,
                    padding: '8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    color: '#ffb700',
                    cursor: 'pointer',
                    gap: 8,
                    marginBottom: 16
                }}
                onClick={handleAgregarSaldo}
            >
                <i className="fa-solid fa-coins" style={{ marginRight: 8, color: '#ffb700', fontSize: 22 }}></i>
                Agregar Saldo
            </button>
        
        <div className="cart-summary">
            <div className="cart-total">
                <span>Total:</span>
                <span id="cartTotal">${total.toLocaleString()}</span>
            </div>
            <button className="checkout-btn" id="checkoutBtn" onClick={handlePagarCarrito} disabled={carrito.length === 0}>Proceder al Pago</button>
        </div>
    </div>
    );
}