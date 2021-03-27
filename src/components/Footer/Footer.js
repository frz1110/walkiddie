import './Footer.css';
import { Instagram, Facebook, Twitter, Youtube } from 'react-feather';

const Footer = () => {
    const year = new Date().getFullYear();

    return ( 
        <div className="footer-container">
            <footer>
                <div className="copyright">
                    &copy; <span id="year">{ year }</span> Walkiddie. All rights reserved.
                </div>
                <div className="icons">
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" data-testid="ic-instagram">
                        <div className="icons-container">
                            <Instagram />
                        </div>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" data-testid="ic-facebook">
                        <div className="icons-container">
                            <Facebook />
                        </div>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" data-testid="ic-twitter">
                        <div className="icons-container">
                            <Twitter />
                        </div>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" data-testid="ic-youtube">
                        <div className="icons-container">
                            <Youtube />
                        </div>
                    </a>
                </div>
            </footer>
        </div>
    );
}
 
export default Footer;