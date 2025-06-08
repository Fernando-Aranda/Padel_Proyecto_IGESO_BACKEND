import { useState } from 'react';
import '../index.css';

type ModalRegisterProps = {
    stateModalRegister: [ boolean, React.Dispatch<React.SetStateAction<boolean>> ],
    openLoginModal: () => void
}

export default function ModalRegister({ stateModalRegister, openLoginModal }: ModalRegisterProps) {
    const [registerModal, setRegisterModal] = stateModalRegister;
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        rut: '',
        correo: '',
        password: '',
        telefono: '',
        rol: 'usuario'
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id.replace('register', '').toLowerCase()]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:3000/usuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Error al registrar usuario');
            setRegisterModal(false);
            openLoginModal();
        } catch (err) {
            setError('No se pudo registrar el usuario');
        }
    };

    const handleClose = () => setRegisterModal(false);

    return (
        <div className="modal" id="registerModal" style={{ display: registerModal ? 'flex' : 'none' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Crear Cuenta</h2>
                    <button className="close-btn" id="closeRegisterModal" onClick={handleClose}>&times;</button>
                </div>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="registerName">Nombre Completo</label>
                        <input type="text" id="registerNombre" value={form.nombre} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerApellido">Apellido</label>
                        <input type="text" id="registerApellido" value={form.apellido} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerRut">RUT</label>
                        <input type="text" id="registerRut" value={form.rut} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerEmail">Correo Electrónico</label>
                        <input type="email" id="registerCorreo" value={form.correo} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerPassword">Contraseña</label>
                        <input type="password" id="registerPassword" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerTelefono">Teléfono</label>
                        <input type="text" id="registerTelefono" value={form.telefono} onChange={handleChange} />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit" className="form-submit">Registrarse</button>
                </form>
                <div className="form-footer">
                    ¿Ya tienes una cuenta? <a href="#" id="showLoginFromRegister" onClick={e => { e.preventDefault(); openLoginModal(); }}>
                        Inicia sesión aquí
                    </a>
                </div>
            </div>
        </div>
    );
}