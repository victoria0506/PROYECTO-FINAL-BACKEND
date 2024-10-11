
import '../style/Footer.css'; // Opcional, para estilos adicionales

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <ul className="footer-links">
                    <li><a href="/about">Sobre Nosotros</a></li>
                    <li><a href="/contacto">Contacto</a></li>
                    <li><a href="/ayuda">Ayuda</a></li>
                </ul>
                <img className='logofooter' src="src/img/logonav.png" alt="" />
                <p className='derechos'>&copy; {new Date().getFullYear()} RestaurApp. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
