import { useEffect, useState } from 'react';
import ModalLogin from '../../component/ModalLogin';
import Navbar from '../../component/Navbar';
import Sidecar from '../../component/Sidecar';
import ModalRegister from '../../component/ModalRegister';
import ModalReserva from '../../component/ModalReserva'; // 1. Importa el modal

interface Cancha {
  id: number;
  nombre: string;
  capacidad_maxima: number;
  precio_por_hora: string;
  estado: string;
}

// Mapa fijo de imágenes por id
const canchaImages: Record<number, string> = {
  1: "https://www.greenpro.com.ar/paddle/GP%20GYM/2.jpg",
  2: "https://img.freepik.com/foto-gratis/hombre-jugando-padel_657883-621.jpg?semt=ais_hybrid&w=740",
  3: "https://www.greenpro.com.ar/fotos%20GP/historia-del-padel-portada.jpg",
  4: "https://img.freepik.com/foto-gratis/pelota-padel-golpeando-red_23-2149459039.jpg?semt=ais_hybrid&w=740",
  5: "https://www.greenpro.com.ar/fotos%20GP/historia-del-padel-portada.jpg",
  6: "https://www.greenpro.com.ar/paddle/GP%20GYM/2.jpg",
  7: "https://www.muchopadel.mx/cdn/shop/articles/cancha-de-padel-1_600x.jpg?v=1691087988",
};

// Array solo con URLs para imágenes aleatorias
const canchaImagesList = Object.values(canchaImages);

function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * canchaImagesList.length);
  return canchaImagesList[randomIndex];
}

export default function Home() {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [modalReservaOpen, setModalReservaOpen] = useState(false); // 2. Estado para el modal
  const [canchaSeleccionada, setCanchaSeleccionada] = useState<Cancha | null>(null); // Estado para la cancha

  useEffect(() => {
    fetch('http://localhost:3000/cancha')
      .then((res) => res.json())
      .then((data) => setCanchas(data))
      .catch((error) => console.error('Error al cargar canchas:', error));
  }, []);

  return (
    <>
      <Navbar
        stateModalLogin={[loginModal, setLoginModal]}
        stateModalRegister={[registerModal, setRegisterModal]}
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
                    {parseFloat(cancha.precio_por_hora).toLocaleString()} por hora
                  </div>
                  <div className="court-description">Estado: {cancha.estado}</div>
                  <button
                    className="book-btn"
                    onClick={() => {
                      setCanchaSeleccionada(cancha); // 3. Guarda la cancha seleccionada
                      setModalReservaOpen(true);     // 4. Abre el modal
                    }}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 5. Renderiza el modal solo si hay cancha seleccionada */}
      {canchaSeleccionada && (
        <ModalReserva
          open={modalReservaOpen}
          cancha={canchaSeleccionada}
          onClose={() => setModalReservaOpen(false)}
        />
      )}
    </>
  );
}
