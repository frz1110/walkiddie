import './Home.css'
import InvestorIcon from './investor-icon.svg';
import MitraIcon from './mitra-icon.svg';
import Sect2Icon from './sect-2-icon.svg';
import MainIcon from './main-icon.svg';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Typical from 'react-typical';
import WalkiddieOnboarding from '../OnBoarding/WalkiddieOnboarding';

const Home = ({ user }) => {
    const onBoardingSteps = [
        {
            content: <h4>Selamat datang di Walkiddie</h4>,
            locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
            placement: 'center',
            target: 'body',
        },
        {
            content: 'Platform Crowdfunding Pertama dalam Industri Mainan!',
            placement: 'left',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '.wkd-home-sect-2-text p',
            title: 'Walkiddie? Apa itu?',
        },
        {
            content: 'Kamu bisa menjadi investor atau mitra. Semua pilihan ada di tangan mu!',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '.wkd-home-roles-container',
            title: 'Pengguna Walkiddie',
        },
        {
            content: <p>Daftar sebagai <b>mitra</b>.</p>,
            placement: 'right',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '.wkd-home-sect-1 [title~=Mitra]',
            title: 'Ayo raih keuntungan di Walkiddie.',
        },
        {
            content: <p>Daftar sebagai <b>investor</b>.</p>,
            placement: 'right',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '.wkd-home-sect-1 [title~=Investor]',
            title: 'Ayo raih keuntungan di Walkiddie.',
        },
        {
            content: <h4>Selesai</h4>,
            placement: 'center',
            target: 'body',
        },
    ];

    if (user !== null) {
        if (user.role === "Mitra") {
            return <Redirect to="/pemilik-toko" />
        } else if (user.role === "Investor") {
            return <Redirect to="/investor" />
        }
    }

    return (
        <div>
            <WalkiddieOnboarding steps={onBoardingSteps}/>

            <div className="wkd-home-sect-1-container">
                <div className="wkd-home-sect-1">
                    <h1 className="wkd-home-headings">Platform Crowdfunding Pertama dalam Industri Mainan</h1>
                    <Typical
                        steps={['', 500, 'Ayo gabung dan raih keuntunganmu!', 2000]}
                        loop={Infinity}
                        wrapper="p"
                        className="wkd-home-p"
                    />
                    <button className="wkd-home-button wkd-nav-button wkd-dark-green-button" title="Mitra">
                        <Link to="/daftar-mitra">
                            Gabung Mitra
                        </Link>
                    </button>
                    <button className="wkd-home-button wkd-nav-button wkd-tosca-button" title="Investor">
                        <Link to="/daftar-investor">
                            Mulai Investasi
                        </Link>
                    </button>
                </div>
                <img id="wkd-home-ic-arcade" src={MainIcon} alt="Walkiddie Icon"></img>
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
                                Hubungi Kami
                            </a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="wkd-home-sect-3-container">
                <div className="wkd-home-banner-card">
                    <h2 className="wkd-home-headings">Bagaimana mendapat keuntungan di <span className="wkd-green-text">Walkiddie</span>?</h2>
                    <p className="wkd-home-p" style={{ fontSize: "19px" }}>Dua role utama pada <b>Walkiddie</b>.</p>
                    <div className="wkd-home-roles-container">
                        <div className="wkd-home-roles">
                            <div className="wkd-home-roles-icon">
                                <img className="wkd-home-roles-icon-investor" src={InvestorIcon} alt="Investor Icon"></img>
                            </div>
                            <h3 className="wkd-home-h3">Investor Modal</h3>
                            <p className="wkd-home-p">Pengguna dapat melakukan join modal untuk mengadakan mainan.</p>
                            <button className="wkd-home-button wkd-nav-button wkd-tosca-button">
                                <Link to="/daftar-investor">
                                    Mulai Investasi
                                </Link>
                            </button>

                        </div>
                        <div className="wkd-home-roles">
                            <div className="wkd-home-roles-icon">
                                <img className="wkd-home-roles-icon-mitra" src={MitraIcon} alt="Mitra Icon"></img>
                            </div>
                            <h3 className="wkd-home-h3">Toko Mitra</h3>
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

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Home);