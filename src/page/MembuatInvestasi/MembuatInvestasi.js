import './MembuatInvestasi.css'
import OptionCard from '../../components/InvestasiOptionCard/OptionCard'
import CustomOptionCard from '../../components/InvestasiOptionCard/CustomOptionCard'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export let utils = {
    getPengadaanData: getPengadaan,
    getTokoData: getToko,
    getCardValue: getCheckedValue,
    getCustomCardValue: getCustomValue,
    postInvestasiData: postInvestasi
}

const MembuatInvestasi = ({ isAuthenticated, match }) => {

    const [pengadaan, setPengadaan] = useState({'totalBiaya':0, 'estimasiKeuangan':''})
    const [toko, setToko] = useState({})
    
    useEffect(() => {
        utils.getPengadaanData(match.params.pk, setPengadaan)
        utils.getTokoData(pengadaan.toko, setToko)
    }, [match.params.pk, pengadaan]);

    const handleSubmit = e => {
        <Redirect to="/" />
        utils.postInvestasiData(match.params.pk, utils.getCardValue());
    }

    if (!isAuthenticated) return <Redirect to="/masuk" />

    return ( 
        <div className="container mt-5 overflow-hidden mi-ctn">
            <h4 className="mi-title">{toko.namaCabang}</h4>
            <h6 className="mi-subtitle">{toko.namaToko}</h6>
            
            <hr className="mi-title-divider"/>

            <div className="row row-cols-1 row-cols-lg-2 mi-text-start mt-5">
                <div className="col px-4">
                    <div className="row row-cols-1 row-cols-sm-2 gx-2">
                        <OptionCard ratio={5} amount={pengadaan.totalBiaya*5/100} />
                        <OptionCard ratio={10} amount={pengadaan.totalBiaya*10/100} />
                        <OptionCard ratio={20} amount={pengadaan.totalBiaya*20/100} />
                        <OptionCard ratio={50} amount={pengadaan.totalBiaya*50/100} />
                        <OptionCard ratio={70} amount={pengadaan.totalBiaya*70/100} />
                        <OptionCard ratio={100} amount={pengadaan.totalBiaya} />
                    </div>
                    <div className="row">
                        <CustomOptionCard maxx={pengadaan.totalBiaya} />
                    </div>
                </div>

                <div className="col px-5">
                    <h5>Tata Cara Pembayaran</h5>
                    <ol className="text-start">
                        <li>Lakukan pembayaran dengan nominal yang sesuai ke rekening XXXX-XXXX-XXXX-XXXX (a.n. Walkiddie Toys).</li>
                        <li>Konfirmasi pembayaran melalui XXXXXXXXXXX</li>
                    </ol>

                    <h5 className="mt-4">Estimasi Keuangan</h5>
                    <div className="card mi-card mi-card-estimasi-keuangan">
                        <div className="card-body">
                            <p className="card-text">{pengadaan.estimasiKeuangan}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-5">
                <div className="col">
                    <button className="wkd-nav-button wkd-light-tosca-button" onClick={() => window.history.back()}>Kembali</button>
                    <button className="wkd-nav-button wkd-dark-green-button" onClick={() => handleSubmit()}>Buat Investasi</button>
                </div>
            </div>
        </div>
     );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(MembuatInvestasi);

function getCheckedValue() {
    var val;
    var radios = document.getElementsByName("mi-amount")
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) {
            val = radios[i].value;
            break;
        }
    }
    return val === "custom" ? utils.getCustomCardValue() : val;
}

function getCustomValue() {
    return document.getElementById("mi-custom-amount").value
}

function postInvestasi(pk, nominal) {
    if (localStorage.getItem('access')) {
        var investasiFormData = new FormData();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };
        
        investasiFormData.append('nominal', nominal);
        investasiFormData.append('pengadaan', pk);


        try {
            axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/`, investasiFormData, config)
            alert('Success post');
        } catch (err) {
            alert('Error post');
        }
    } else {
        alert('missing token');
    }
}

function getPengadaan(pk, callback) {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try {
            axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${pk}`, config)
                .then((response) => {
                    callback(response.data);
                }) 
        } catch (err) {
            console.log('Error get pengadaan');
            return null;
        }
    } else {
        console.log('missing token');
        return null;
    }
}

function getToko(pk, callback) {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try {
            axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/${pk}`, config)
                .then((response) => {
                    callback(response.data);
                }) 
        } catch (err) {
            console.log('Error get toko');
            return null;
        }
    } else {
        console.log('missing token');
        return null;
    }
}
