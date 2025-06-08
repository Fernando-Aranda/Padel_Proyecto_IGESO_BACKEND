import { useState } from 'react';
import '../index.css';
import useSessionStore from '../stores/useSessionStorage';
import Sidecar from './Sidecar';

type NavbarProps = {
    stateModalLogin: [ boolean, React.Dispatch<React.SetStateAction<boolean>> ]
    stateModalRegister: [ boolean, React.Dispatch<React.SetStateAction<boolean>> ]
}

//soy conciente que loginModal y registerModal no son necesarios, pero los dejo por si en un futuro se necesitan
//si no se usan, se pueden eliminar y usar directamente stateModalLogin y stateModalRegister

export default function Navbar({ stateModalLogin, stateModalRegister }: NavbarProps) {
    const [loginModal, setLoginModal] = stateModalLogin;
    const [registerModal, setRegisterModal] = stateModalRegister;
    const [toggleSidecar, setToggleSidecar] = useState(false);
    const { setIsLogin , isLogin , username} = useSessionStore();

    const handleLoginClick = () => {
        setLoginModal(true);
    }
    const handleRegisterClick = () => {
        setRegisterModal(true);
    }
  return (
    <header>
        <div className="container header-content">
            <div className="logo">
                <i className="fas fa-tennis-ball"></i>
                <span>Pádel Reservas</span>
            </div>
            
            <div className="user-section" id="userSection" style={{ display: isLogin ? 'flex' : 'none' }}>
                <div className="user-avatar" id="userAvatar">U</div>
                <span className="user-name" id="userName">{username}</span>
                <button className="logout-btn" id="logoutBtn" onClick={() => {setIsLogin(false);} }>
                    <i className="fas fa-sign-out-alt"></i>
                    Salir
                </button>
                <div className="cart-icon" id="cartIcon" onClick={() => {setToggleSidecar(!toggleSidecar);}}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-count" id="cartCount">0</span>
                </div>
            </div>
            {isLogin ? null : 
            <div className="auth-buttons" id="authButtons">
                <button className="login-btn" id="loginBtn" onClick={handleLoginClick}>Iniciar Sesión</button>
                <button className="register-btn" id="registerBtn" onClick={handleRegisterClick}>Registrarse</button>
            </div> }
        </div>
        <Sidecar stateToggleSidecar={[toggleSidecar,setToggleSidecar]}/>
    </header>
  );
}