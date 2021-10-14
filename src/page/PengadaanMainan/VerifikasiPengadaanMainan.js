import React from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-dates/lib/css/_datepicker.css';
import AlurPendaftaran from './verifikasi-alur.svg';
import VerifikasiMenunggu from './verifikasi-menunggu.svg';

const VerifikasiPendaftaranMainan = () => {

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
                        marginBottom: '10px'
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
                    <div className="wkd-home-sect-1-container">
                    <img id="d-t-alur" src={VerifikasiMenunggu} alt="Walkiddie Icon"></img>
                </div>
                </div>
            </div>
        </div>
    );
}

export default VerifikasiPendaftaranMainan;