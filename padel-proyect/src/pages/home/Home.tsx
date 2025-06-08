import { useState } from 'react';
import ModalLogin from '../../component/ModalLogin';
import Navbar from '../../component/Navbar';
import Sidecar from '../../component/Sidecar';
import ModalRegister from '../../component/ModalRegister';

export default function Home() {
  const[loginModal, setLoginModal] = useState(false);
  const[registerModal, setRegisterModal] = useState(false);

  return (
    <>
      <Navbar stateModalLogin={[loginModal, setLoginModal]} stateModalRegister={[registerModal, setRegisterModal]} />
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
            {/* Cancha 1 */}
            <div className="court-card" data-court-id="1">
                <div className="court-image" style={{backgroundImage: "url('https://www.greenpro.com.ar/paddle/GP%20GYM/2.jpg')"}}></div>
                <div className="court-info">
                    <div className="court-name">Cancha Premium</div>
                    <div className="court-location"><i className="fas fa-map-marker-alt"></i> Club Deportivo, Santiago</div>
                    <div className="court-price"><i className="fas fa-tag"></i> $15,000 por hora</div>
                    <div className="court-description">Cancha de pádel premium con superficie de césped artificial e iluminación LED.</div>
                    <button className="book-btn">Reservar</button>
                </div>
            </div>
            
            {/* Cancha 2 */}
            <div className="court-card" data-court-id="2">
                <div className="court-image" style={{backgroundImage: "url('https://img.freepik.com/foto-gratis/hombre-jugando-padel_657883-621.jpg?semt=ais_hybrid&w=740')"}}></div>
                <div className="court-info">
                    <div className="court-name">Cancha Estándar</div>
                    <div className="court-location"><i className="fas fa-map-marker-alt"></i> Parque Deportivo, Providencia</div>
                    <div className="court-price"><i className="fas fa-tag"></i> $12,000 por hora</div>
                    <div className="court-description">Cancha estándar con superficie de hormigón poroso y buena iluminación.</div>
                    <button className="book-btn">Reservar</button>
                </div>
            </div>
            
            {/* Cancha 3 */}
            <div className="court-card" data-court-id="3">
                <div className="court-image" style={{backgroundImage: "url('https://www.greenpro.com.ar/fotos%20GP/historia-del-padel-portada.jpg')"}}></div>
                <div className="court-info">
                    <div className="court-name">Cancha VIP</div>
                    <div className="court-location"><i className="fas fa-map-marker-alt"></i> Country Club, Las Condes</div>
                    <div className="court-price"><i className="fas fa-tag"></i> $20,000 por hora</div>
                    <div className="court-description">Cancha VIP con superficie de vidrio y sistema de sonido integrado.</div>
                    <button className="book-btn">Reservar</button>
                </div>
            </div>
            
            {/* Cancha 4 */}
            <div className="court-card" data-court-id="4">
                <div className="court-image" style={{backgroundImage: "url('https://img.freepik.com/foto-gratis/pelota-padel-golpeando-red_23-2149459039.jpg?semt=ais_hybrid&w=740')"}}></div>
                <div className="court-info">
                    <div className="court-name">Cancha Básica</div>
                    <div className="court-location"><i className="fas fa-map-marker-alt"></i> Centro Deportivo, Ñuñoa</div>
                    <div className="court-price"><i className="fas fa-tag"></i> $10,000 por hora</div>
                    <div className="court-description">Cancha básica ideal para principiantes y práctica casual.</div>
                    <button className="book-btn">Reservar</button>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}