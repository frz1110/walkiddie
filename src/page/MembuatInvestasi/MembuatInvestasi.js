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

const MembuatInvestasi = ({ isAuthenticated, match, user }) => {

    const [pengadaan, setPengadaan] = useState({'totalBiaya':0, 'estimasiKeuangan':'', 'pk':-1, 'danaTerkumpul':0})
    const [toko, setToko] = useState({})
    
    useEffect(() => {
        utils.getPengadaanData(match.params.pk, setPengadaanState)
        utils.getTokoData(pengadaan.toko, setToko)
    }, [match.params.pk, pengadaan]);

    const setPengadaanState = (newPengadaan) => {
        if (pengadaan.pk !== newPengadaan.pk) {
            setPengadaan(newPengadaan)
        }
    }

    const handleSubmit = e => {
        <Redirect to="/" />
        var nominal = utils.getCardValue()
        if (nominalIsValid(nominal, pengadaan)) {
            utils.postInvestasiData(match.params.pk, nominal);
        } else {
            alert("Nominal investasi melebihi nominal dana yang dibutuhkan.\nMohon sesuaikan nominal investasi Anda dan coba kembali.")
        }
    }

    const getAmount = (percent) => {
        return pengadaan.totalBiaya*percent/100
    }

    const amountDisabled = (percent) => {
        return getAmount(percent) > pengadaan.totalBiaya-pengadaan.danaTerkumpul
    }

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Investor") return <Redirect to="/" />

    return ( 
        <div className="container mt-5 overflow-hidden mi-ctn">
            <h4 className="mi-title">{toko.namaToko}</h4>
            <h6 className="mi-subtitle">{toko.namaCabang}</h6>
            
            <hr className="mi-title-divider"/>

            <div className="row row-cols-1 row-cols-lg-2 mi-text-start mt-5">
                <div className="col px-4">
                    <div className="row row-cols-1 row-cols-sm-2 gx-2">
                        <OptionCard ratio={5} amount={getAmount(5)} isDisabled={amountDisabled(5)}/>
                        <OptionCard ratio={10} amount={getAmount(10)} isDisabled={amountDisabled(10)}/>
                        <OptionCard ratio={20} amount={getAmount(20)} isDisabled={amountDisabled(20)}/>
                        <OptionCard ratio={50} amount={getAmount(50)} isDisabled={amountDisabled(50)}/>
                        <OptionCard ratio={70} amount={getAmount(70)} isDisabled={amountDisabled(70)}/>
                        <OptionCard ratio={100} amount={pengadaan.totalBiaya} isDisabled={pengadaan.danaTerkumpul > 0}/>
                    </div>
                    <div className="row">
                        <CustomOptionCard maxx={pengadaan.totalBiaya} />
                    </div>
                </div>

                <div className="col px-5">
                    <h5>Status Pendanaan</h5>
                    <table>
                        <tr>
                            <td>Total dana yang dibutuhkan</td>
                            <td>: Rp {pengadaan.totalBiaya.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Total dana yang telah terkumpul</td>
                            <td>: Rp {pengadaan.danaTerkumpul.toLocaleString()} ({Math.floor(pengadaan.danaTerkumpul/pengadaan.totalBiaya*100)}%)</td>
                        </tr>
                        <hr/>
                        <tr>
                            <td>Sisa dana yang dibutuhkan</td>
                            <td>: Rp {(pengadaan.totalBiaya-pengadaan.danaTerkumpul).toLocaleString()} ({Math.floor((pengadaan.totalBiaya-pengadaan.danaTerkumpul)/pengadaan.totalBiaya*100)}%)</td>
                        </tr>
                    </table>

                    <h5 className="mt-4">Tata Cara Pembayaran</h5>
                    <ol>
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
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(MembuatInvestasi);

function nominalIsValid(nominal, pengadaan) {
    return nominal <= pengadaan.totalBiaya-pengadaan.danaTerkumpul
}

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
            alert('Investasi berhasil dibuat.');
        } catch (err) {
            alert('Investasi gagal dibuat. Mohon coba kembali.');
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
            console.log('Error get pengadaan', err.message);
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
            console.log('Error get toko', err.message);
            return null;
        }
    } else {
        console.log('missing token');
        return null;
    }
}
