import { useEffect, useState } from 'react';
import '../index.css';
import useSessionStore from '../stores/useSessionStorage';

type ModalLoginProps = {
    stateModalLogin: [ boolean, React.Dispatch<React.SetStateAction<boolean>> ],
    openRegisterModal: () => void
}

export default function ModalLogin({ stateModalLogin, openRegisterModal }: ModalLoginProps) {
    const [loginModal, setLoginModal] = stateModalLogin;
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsLogin, setUsername, setUserId } = useSessionStore();

    //useEffect(() => {}, [])

    const handleClose = () => setLoginModal(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password })
            });
            if (!res.ok) throw new Error('Credenciales incorrectas');
            const data = await res.json();
            console.log(data);
            setUsername(data.nombre);
            setUserId(data.id);
            setIsLogin(true);
            setLoginModal(false);
        } catch (err) {
            setError('Correo o contraseña incorrectos');
        }
    };

    return (
        <div className="modal" id="loginModal" style={{ display: loginModal ? 'flex' : 'none' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Iniciar Sesión</h2>
                    <button className="close-btn" id="closeLoginModal" onClick={handleClose}>&times;</button>
                </div>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="loginEmail">Correo Electrónico</label>
                        <input type="email" id="loginEmail" value={correo} onChange={e => setCorreo(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginPassword">Contraseña</label>
                        <input type="password" id="loginPassword" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit" className="form-submit">Ingresar</button>
                </form>
                <div className="form-footer">
                    ¿No tienes una cuenta? <a href="#" id="showRegisterFromLogin" onClick={e => { e.preventDefault(); openRegisterModal(); }}>Regístrate aquí</a>
                </div>
            </div>
        </div>
    );
}