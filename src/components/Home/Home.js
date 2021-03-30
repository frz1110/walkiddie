import './Home.css'
import InvestorIcon from './investor-icon.svg';
import MitraIcon from './mitra-icon.svg';
import Sect1 from './sect-1.svg';
import Sect2Icon from './sect-2-icon.svg';
import { Link } from 'react-router-dom';

const Home = () => {
    return ( 
        <div>
            <div className="wkd-home-sect-1-container">
                <div className="wkd-home-sect-1">
                    <h1 className="wkd-home-headings">Platform Crowdfunding Pertama dalam Industri Mainan</h1>
                    <p className="wkd-home-p">Ayo gabung dan raih keuntunganmu!</p>
                    <button className="wkd-home-button wkd-nav-button wkd-dark-green-button">
                        <Link to="/daftar-mitra">
                            Gabung Mitra
                        </Link>
                    </button>
                    <button className="wkd-home-button wkd-nav-button wkd-tosca-button">
                        <Link to="/daftar-investor">
                            Mulai Investasi
                        </Link>
                    </button>
                </div>
                <div className="wkd-home-sect-1-icon">
                    <img id="wkd-home-ic-arcade" src={Sect1} alt="Walkiddie Icon"></img>
                    <div id="wkd-home-ic-circle"></div>
                </div>
            </div>
            <div className="wkd-home-sect-2-bg">
                <div className="wkd-home-sect-2-container">
                    <div className="wkd-home-sect-2-icon">
                        <img src={Sect2Icon} alt="Walkiddie Icon"></img>
                    </div>
                    <div className="wkd-home-sect-2-text">
                        <h1 className="wkd-home-headings">Apa itu <span className="wkd-green-text">Walkiddie</span>?</h1>
                        <p className="wkd-home-p">Aplikasi berbasis web yang menyediakan pelayanan pengadaan mainan arkade menggunakan sistem <b>crowdfunding</b>.</p>
                        <button className="wkd-home-button wkd-nav-button wkd-dark-green-button">
                            <a href="mailto:pplnarai2021@gmail.com">
                                Tentang Kami
                            </a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="wkd-home-sect-3-container">
                <div className="wkd-home-banner-card">
                    <h2 className="wkd-home-headings wkd-home-h2">Bagaimana mendapat keuntungan di <span className="wkd-green-text">Walkiddie</span>?</h2>
                    <p className="wkd-home-p">Dua role utama pada <b>Walkiddie</b>.</p>
                    <div className="wkd-home-roles-container">
                        <div className="wkd-home-roles">
                            <div className="wkd-home-roles-icon">
                                <img src={InvestorIcon} alt="Investor Icon"></img>
                            </div>
                            <h3 className="wkd-home-headings wkd-home-h3">Investor Modal</h3>
                            <p className="wkd-home-p">Pengguna dapat melakukan join modal untuk mengadakan mainan.</p>
                            <button className="wkd-home-button wkd-nav-button wkd-tosca-button">
                                <Link to="/daftar-investor">
                                    Mulai Investasi
                                </Link>
                            </button>

                        </div>
                        <div className="wkd-home-roles">
                            <div className="wkd-home-roles-icon">
                                <img src={MitraIcon} alt="Mitra Icon"></img>
                            </div>
                            <h3 className="wkd-home-headings wkd-home-h3">Toko Mitra</h3>
                            <p className="wkd-home-p">Toko yang sudah menjadi mitra dapat mengajukan pengadaan mainan.</p>
                            <button className="wkd-home-button wkd-nav-button wkd-dark-green-button">
                                <Link to="/daftar-mitra">
                                    Gabung Mitra
                                </Link>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Home;