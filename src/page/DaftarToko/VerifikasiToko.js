import 'react-dates/initialize';
import './DaftarToko.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-dates/lib/css/_datepicker.css';
import AlurPendaftaran from './verifikasi-toko.svg';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const VerifikasiToko = ({ isAuthenticated, user }) => {
    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Mitra") return <Redirect to="/" />

    return (
        <div>
            <div className="wkd-home-sect-2-bg"
                style={{
                    height: '400px',
                    maxWidth: '1500px'
                }}
            >
                <div className="wkd-home-sect-2-container"
                    style={{
                        marginBottom: '100px'
                    }}
                >
                    <img id="d-t-alur" src={AlurPendaftaran} alt="Walkiddie Icon"></img>
                </div>
            </div>

            <div className="wkd-home-sect-3-container">
                <div className="wkd-home-banner-card"
                    style={{
                        borderRadius: '7px'
                    }}
                >
                    <div
                        style={{
                            textAlign: 'left'
                        }}>
                        <h2 id="d-t-title"> Menunggu Verifikasi </h2>
                        <p>Pendaftaran toko Anda sedang diproses oleh admin kami</p>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(VerifikasiToko);