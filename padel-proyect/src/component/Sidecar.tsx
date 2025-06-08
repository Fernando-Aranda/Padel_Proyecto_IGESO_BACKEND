import '../index.css'

type SidecarProps = {
    stateToggleSidecar: [ boolean, React.Dispatch<React.SetStateAction<boolean>> ]
}

export default function Sidecar( {stateToggleSidecar}: SidecarProps ) {
    const [toggleSidecar, setToggleSidecar] = stateToggleSidecar;

    const handleCloseCart = () => {
        setToggleSidecar(false);
    }

  return (
    <div className="cart-sidebar" id="cartSidebar" style={{ right: toggleSidecar ? '0' : '-400px' }}>
        <div className="cart-header">
            <h3>Tu Carrito de Reservas</h3>
            <button className="close-cart-btn" id="closeCartBtn" onClick={handleCloseCart}>&times;</button>
        </div>
        
        <div className="cart-items" id="cartItems">
            {/* Los items del carrito se generarán con JavaScript */}
            <div className="empty-cart-message" id="emptyCartMessage">No hay reservas en tu carrito.</div>
        </div>
        
        <div className="cart-summary">
            <div className="cart-total">
                <span>Total:</span>
                <span id="cartTotal">$0</span>
            </div>
            <button className="checkout-btn" id="checkoutBtn">Proceder al Pago</button>
        </div>
    </div>
    );
}