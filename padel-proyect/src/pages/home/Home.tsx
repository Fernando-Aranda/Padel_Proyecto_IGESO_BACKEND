import { useEffect, useState } from 'react';
import ModalLogin from '../../component/ModalLogin';
import Navbar from '../../component/Navbar';
import Sidecar from '../../component/Sidecar';
import ModalRegister from '../../component/ModalRegister';
import ModalReserva from '../../component/ModalReserva';
import ModalAgregarSaldo from '../../component/ModalAgregarSaldo';
import useSessionStore from '../../stores/useSessionStorage';
import ModalCrearCancha from '../../component/ModalCrearCancha';
import ModalReporte from '../../component/ModalReporte';
import ModalEditarCancha from '../../component/ModalEditarCancha';

interface Cancha {
  id: number;
  nombre: string;
  capacidad_maxima: number;
  precio_por_hora: number;
  estado: string;
}

const canchaImages: Record<number, string> = {
  1: "https://www.greenpro.com.ar/paddle/GP%20GYM/2.jpg",
  2: "https://img.freepik.com/foto-gratis/hombre-jugando-padel_657883-621.jpg?semt=ais_hybrid&w=740",
  3: "https://www.greenpro.com.ar/fotos%20GP/historia-del-padel-portada.jpg",
  4: "https://img.freepik.com/foto-gratis/pelota-padel-golpeando-red_23-2149459039.jpg?semt=ais_hybrid&w=740",
  5: "https://www.greenpro.com.ar/fotos%20GP/historia-del-padel-portada.jpg",
  6: "https://www.greenpro.com.ar/paddle/GP%20GYM/2.jpg",
  7: "https://www.muchopadel.mx/cdn/shop/articles/cancha-de-padel-1_600x.jpg?v=1691087988",
};

const canchaImagesList = Object.values(canchaImages);

function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * canchaImagesList.length);
  return canchaImagesList[randomIndex];
}

export default function Home() {
  const [carrito, setCarrito] = useState<any[]>([]);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [modalReservaOpen, setModalReservaOpen] = useState(false);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState<Cancha | null>(null);
  const [modalSaldoOpen, setModalSaldoOpen] = useState(false);
  const [saldoActual, setSaldoActual] = useState(0);
  const [toggleSidecar, setToggleSidecar] = useState(false);
  const [modalCrearCancha, setModalCrearCancha] = useState(false);
  const [modalReporteOpen, setModalReporteOpen] = useState(false);
  const [canchaEditando, setCanchaEditando] = useState<Cancha | null>(null);

  const rol = useSessionStore(state => state.rol);

  (window as any).setModalSaldoOpen = setModalSaldoOpen;

  useEffect(() => {
    fetch('http://localhost:3000/cancha')
      .then((res) => res.json())
      .then((data) => setCanchas(data))
      .catch((error) => console.error('Error al cargar canchas:', error));
  }, []);

   // NUEVO: Cargar el saldo actual del usuario
  useEffect(() => {
    const id_usuario = useSessionStore.getState().userId; // O localStorage.getItem('id_usuario')
    if (id_usuario) {
      fetch(`http://localhost:3000/usuario/${id_usuario}`)
        .then(res => res.json())
        .then(data => {
          if (typeof data.monto === 'number') setSaldoActual(data.monto);
        })
        .catch(() => setSaldoActual(0));
    }
  }, []);

  return (
    <>
      <Navbar
        stateModalLogin={[loginModal, setLoginModal]}
        stateModalRegister={[registerModal, setRegisterModal]}
        stateModalCrearCancha={[modalCrearCancha, setModalCrearCancha]}
        abrirSidecar={() => setToggleSidecar(true)}
        stateModalReporte={[modalReporteOpen, setModalReporteOpen]}
      />
      <ModalReporte
      open={modalReporteOpen}
      onClose={() => setModalReporteOpen(false)}
      />
      <ModalLogin
        stateModalLogin={[loginModal, setLoginModal]}
        openRegisterModal={() => {
          setLoginModal(false);
          setRegisterModal(true);
        }}
      />
      <ModalRegister
        stateModalRegister={[registerModal, setRegisterModal]}
        openLoginModal={() => {
          setRegisterModal(false);
          setLoginModal(true);
        }}
      />
      <div className="container">
        <h1 className="main-title">Reserva tu Cancha de Pádel</h1>
        <div className="courts-grid" id="courtsGrid">
          {canchas.map((cancha) => {
            const imageUrl = canchaImages[cancha.id] || getRandomImage();
            return (
              <div className="court-card" key={cancha.id} data-court-id={cancha.id}>
                <div
                  className="court-image"
                  style={{ backgroundImage: `url('${imageUrl}')` }}
                ></div>
                <div className="court-info">
                  <div className="court-name">{cancha.nombre}</div>
                  <div className="court-location">
                    <i className="fas fa-users"></i> Capacidad: {cancha.capacidad_maxima}
                  </div>
                  <div className="court-price">
                    <i className="fas fa-tag"></i> $
                    {cancha.precio_por_hora.toLocaleString()} por hora
                  </div>
                  <div className="court-description">Estado: {cancha.estado}</div>
                  <button
                    className="book-btn"
                    onClick={() => {
                      setCanchaSeleccionada(cancha);
                      setModalReservaOpen(true);
                    }}
                  >
                    Reservar
                  </button>
                                    {/* SOLO PARA ADMINISTRADOR */}
                  {rol === 'administrador' && (
                    <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                      <button
                        className="edit-btn"
                        style={{ background: '#ffc107', color: '#222', borderRadius: 6, padding: '4px 10px' }}
                        onClick={() => setCanchaEditando(cancha)}
                      >
                        <i className="fas fa-edit"></i> Editar
                      </button>
                      <button
                        className="delete-btn"
                        style={{ background: '#dc3545', color: 'white', borderRadius: 6, padding: '4px 10px' }}
                        onClick={async () => {
                          if (window.confirm('¿Seguro que deseas eliminar esta cancha?')) {
                            await fetch(`http://localhost:3000/cancha/${cancha.id}`, {
                              method: 'DELETE'
                            });
                            setCanchas(canchas.filter(c => c.id !== cancha.id));
                          }
                        }}
                      >
                        <i className="fas fa-trash"></i> Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Modal de reserva */}
      {canchaSeleccionada && (
        <ModalReserva
          open={modalReservaOpen}
          cancha={{
            ...canchaSeleccionada,
            precio_por_hora: canchaSeleccionada.precio_por_hora.toString(),
          }}
          onClose={() => setModalReservaOpen(false)}
          agregarAlCarrito={(reserva) => {
            setCarrito((prev: any) => [...prev, reserva]);
            setModalReservaOpen(false);
          }}
        />
      )}
            {/* MODAL DE EDICIÓN */}
      {canchaEditando && (
        <ModalEditarCancha
          cancha={canchaEditando}
          onClose={() => setCanchaEditando(null)}
          onCanchaEditada={canchaActualizada => {
            setCanchas(canchas.map((c: Cancha) => c.id === canchaActualizada.id ? canchaActualizada : c));
            setCanchaEditando(null);
          }}
        />
      )}
      <ModalCrearCancha
        open={modalCrearCancha}
        onClose={() => setModalCrearCancha(false)}
              onCanchaCreada={() => {
          setModalCrearCancha(false);
          // Opcional: recarga las canchas
          fetch('http://localhost:3000/cancha')
            .then((res) => res.json())
            .then((data) => setCanchas(data));
        }}
      />
      {/* Sidecar (carrito) */}
      <Sidecar
        stateToggleSidecar={[toggleSidecar, setToggleSidecar]}
        carrito={carrito}
        setCarrito={setCarrito}
        saldoActual={saldoActual}
        setSaldoActual={setSaldoActual}
      />
      <ModalReporte
        open={modalReporteOpen}
        onClose={() => setModalReporteOpen(false)}
      />
      {/* Modal agregar saldo */}
      <ModalAgregarSaldo
        open={modalSaldoOpen}
        onClose={() => setModalSaldoOpen(false)}
        saldoActual={saldoActual}
        setSaldoActual={setSaldoActual}
      />
    </>
  );
}