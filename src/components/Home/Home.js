import './Home.css'
import InvestorIcon from './investor-icon.svg';
import MitraIcon from './mitra-icon.svg';
import Sect1 from './sect-1.svg';
import Sect2Icon from './sect-2-icon.svg';
import { Link } from 'react-router-dom';

const Home = () => {
    return ( 
        <div>
            <div className="sect-1-container">
                <div className="sect-1">
                    <h1>Platform Crowdfunding Pertama dalam Industri Mainan</h1>
                    <p>Ayo gabung dan raih keuntunganmu!</p>
                    <button className="dark-green-button">
                        <Link to="/daftar-mitra">
                            Gabung Mitra
                        </Link>
                    </button>
                    <button className="tosca-button">
                        <Link to="/daftar-investor">
                            Mulai Investasi
                        </Link>
                    </button>
                </div>
                <div className="sect-1-icon">
                    <img id="ic-arcade" src={Sect1} alt="Walkiddie Icon"></img>
                    <div id="ic-circle"></div>
                </div>
            </div>
            <div className="sect-2-bg">
                <div className="sect-2-container">
                    <div className="sect-2-icon">
                        <img src={Sect2Icon} alt="Walkiddie Icon"></img>
                    </div>
                    <div className="sect-2-text">
                        <h1>Apa itu <span className="green-text">Walkiddie</span>?</h1>
                        <p>Aplikasi berbasis web yang menyediakan pelayanan pengadaan mainan arkade menggunakan sistem <b>crowdfunding</b>.</p>
                        <button className="dark-green-button">
                            <Link to="mailto:pplnarai2021@gmail.com">
                                Tentang Kami
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="sect-3-container">
                <div className="banner-card">
                    <h2>Bagaimana mendapat keuntungan di <span className="green-text">Walkiddie</span>?</h2>
                    <p>Dua role utama pada <b>Walkiddie</b>.</p>
                    <div className="roles-container">
                        <div className="roles">
                            <div className="roles-icon">
                                <img src={InvestorIcon} alt="Investor Icon"></img>
                            </div>
                            <h3>Investor Modal</h3>
                            <p>Pengguna dapat melakukan join modal untuk mengadakan mainan.</p>
                            <button className="tosca-button roles-button">
                                <Link to="/daftar-investor">
                                    Mulai Investasi
                                </Link>
                            </button>

                        </div>
                        <div className="roles">
                            <div className="roles-icon">
                                <img src={MitraIcon} alt="Mitra Icon"></img>
                            </div>
                            <h3>Toko Mitra</h3>
                            <p>Toko yang sudah menjadi mitra dapat mengajukan pengadaan mainan.</p>
                            <button className="dark-green-button roles-button">
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