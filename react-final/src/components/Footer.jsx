import '../style/Footer.css'; 
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation()
    return (
        <footer className="footer">
            <div className="footer-content">
                <ul className="footer-links">
                    <li><a href="/about">{t("About Us")}</a></li>
                    <li><a href="/contacto">{t("contact")}</a></li>
                    <li><a href="/ayuda">{t('help')}</a></li>
                </ul>
                <img className='logofooter' src="src/img/logonav.png" alt="" />
                <p className='derechos'>&copy; {new Date().getFullYear()} {t('RestaurApp All rights reserved.')}</p>
            </div>
        </footer>
    );
};

export default Footer;