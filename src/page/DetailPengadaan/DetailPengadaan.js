import './DetailPengadaan.css';
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory  } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from 'react-redux';
import { Row } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Map } from '../../components/Map/Map'
import { ChevronLeft } from 'react-feather';
import NumberFormat from 'react-number-format';
import { load_profile } from '../../actions/auth';
import {Doughnut} from 'react-chartjs-2';
import WalkiddieOnboarding from '../../components/OnBoarding/WalkiddieOnboarding';


const DetailPengadaan = ({ isAuthenticated, userData, match}) => {
    const [toko, setToko] = useState({latitude: 0, longitude: 0});
    const [pengadaan, setPengadaan] = useState([]);
    const [userPhone, setUserPhone] = useState('');
    const [filesPengadaan, setFilesPengadaan] = useState([]);
    const [disable, setDisable] = useState(false);
    const [totalInvested, setTotal] = useState(0);
    const [role, setRole] = useState('');
    const onBoardingSteps = [
        {
            content: <h5>Petunjuk detail pengadaan</h5>,
            locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
            placement: 'center',
            target: 'body',
        },
        {
            content: 'Halaman ini menunjukkan detail dari pengadaan yang telah dibuat.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#wrapper',
            title: 'Detail Pengadaan',
        },
        {
            content: 'Bagian ini menunjukkan progres pengumpulan modal pengadaan.',
            placement: 'right',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#modal',
            title: 'Detail Pengadaan',
        },
        {
            content: 'Bagian ini menunjukkan persentase jumlah investasi pada pengadaan bagi pengguna investor.',
            placement: 'right',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#investasi',
            title: 'Detail Pengadaan',
        },
        {
            content: 'Bagian ini menunjukkan detail pengadaan. Disediakan tombol bagi investor agar dapat ikut berinvestasi.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#pengadaan',
            title: 'Detail Pengadaan',
        },
        {
            content: 'Pengguna dapat memilih tab berbeda untuk melihat detail berbeda',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#tabs',
            title: 'Detail Pengadaan',
        },
        {
            content: '"Informasi Toko" menunjukkan detail toko yang lebih lengkap.',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#tabs',
            title: 'Detail Pengadaan',
        },
        {
            content: '"Pilihan Mainan" menunjukkan mainan-mainan dalam pengadaan. Mitra dapat melapor kerusakan pada mainan di sini.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#tabs',
            title: 'Detail Pengadaan',
        },
        {
            content: '"Estimasi Keuangan" menunjukkan perkiraan keuangan yang didapatkan dari pengadaan.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#tabs',
            title: 'Detail Pengadaan',
        },
        {
            content: <h4>Selesai</h4>,
            placement: 'center',
            target: 'body',
        },
    ];

    let history = useHistory();
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const fetchPengadaanInfo = async () => {
        try {
            var pengadaanObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${match.params.pk}`, config);
            setPengadaan(pengadaanObj.data);
            setFilesPengadaan(pengadaanObj.data.files)
        }
        catch (err) {           
            history.push('/')
            alert('Terjadi kesalahan saat fetching data pengadaan')
        }
        try{
            const tokoObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/${pengadaanObj.data.toko.pk}`, config);
            setToko(tokoObj.data);
            localStorage.setItem('lat', tokoObj.data.latitude);
            localStorage.setItem('long', tokoObj.data.longitude);

        }catch{
            history.push('/')
            alert('Terjadi kesalahan saat fetching data toko')           
        }
    }
  

    const fetchNomorMitra= async () => {
        try {
            const user = await load_profile()(toko.owner);
            setUserPhone(user.res.data.phone_number);
            setRole(userData.role);
        }
        catch (err) {
            setUserPhone('-')
        }
    }

    const setDisableButton = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/`, config)
                .then(response => {
                    if(response.data.filter(b => b.investor === userData.email && b.pengadaan === pengadaan.pk && b.status ==="MPA" ).length !== 0){
                        setDisable(true);
                    } else if(pengadaan.danaTerkumpul>=pengadaan.totalBiaya){
                        setDisable(true);
                    }
                    const investasi = response.data.filter(data => data.pengadaan === parseInt(match.params.pk) && data.status === "TRM");
                    const total = investasi.map(data => data.nominal).reduce((total,data)=>data+total)
                    setTotal(total);
                });
        }
        catch (err) {
            setDisable(false);
        }
    }
  

    useEffect(() => {
        fetchPengadaanInfo();
    }, []);

    useEffect(() => {
        fetchNomorMitra();
        setDisableButton();
    }, [toko]);

    const dataDoughnutChart = {
        datasets: [
            {
                label: 'Kepemilikan Saham',
                data: [ totalInvested , 100-totalInvested ],
                backgroundColor: [
                    '#146A5F',
                    '#D3F1EE',
                ],
                hoverOffset: 4
            },
        ],
    };

  if (!isAuthenticated) {
    return (<Redirect to="/masuk" />)
  } else if (userData.role == 'Investor' || userData.role == 'Mitra')  {
    return (
        <>
        <WalkiddieOnboarding steps={onBoardingSteps} />

        <div id="wrapper" className="detail-pengadaan-wrapper">
            <h3 className="back-button" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left"/>Kembali</h3>
            <div className="detail-pengadaan-store-header">
                <img src={toko.fotoProfilToko} className="detail-pengadaan-profile-image" alt=""></img>
                <div className="detail-pengadaan-store-name">
                    {toko.namaToko}<br />
                    <span style={{ fontWeight: "500", fontSize: "15px" }}>WKD-02ID2021 - {toko.namaCabang}</span>
                </div>
            </div>
            <Row className="justify-content-center detail-pengadaan-content">
                <div className="col-lg-5">
                    <div className="detail-pengadaan-carousel-wrapper">
                        <Carousel autoPlay infiniteLoop showThumbs={false}>
                            {filesPengadaan.map(item => (
                                <div >
                                    <img alt="" src={item} />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    <div id="modal">
                    <h3 className="detail-pengadaan-modal-text">Kebutuhan Modal</h3>
                    <p className="detail-pengadaan-midtext"></p>
                    <h3 className="detail-pengadaan-modal-target"><NumberFormat value={pengadaan.totalBiaya} displayType={'text'} thousandSeparator={true} prefix={'Rp '}/></h3>
                    <ProgressBar striped now={(pengadaan.danaTerkumpul/pengadaan.totalBiaya*100)+10} label={(pengadaan.danaTerkumpul/pengadaan.totalBiaya*100)+ "%"} />
                    <p className="detail-pengadaan-modal-desc">Terkumpul dari target: <NumberFormat value={pengadaan.totalBiaya} displayType={'text'} thousandSeparator={true} prefix={'Rp '}/></p>
                    </div>

                    <div id="investasi">
                    <h3 className="detail-pengadaan-modal-text">Jumlah Investasimu</h3>
                    <p className="detail-pengadaan-midtext"></p>
                    
                    <Row className="align-items-center">
                            <div className="col-sm-3">
                                <Doughnut data={dataDoughnutChart} width={120}
                                height={120}
                                options={{ maintainAspectRatio: false, responsive: false }}/>
                            </div>
                            <div className="col-sm-1">
                                <h3 className="detail-pengadaan-modal-target">{totalInvested}%</h3>
                            </div>
                    </Row>
                    </div>
                    <br></br>
                    <br></br>
                </div>
                <div className="col-lg-7">
                    <div id="pengadaan" className="detail-pengadaan-box-wrapper">
                        <Row className="detail-pengadaan-distance-row">
                            <div className="col-sm">
                                <h3>Periode Pengadaan</h3>
                                <p>{pengadaan.periodePengadaanMulai} s.d {pengadaan.periodePengadaanAkhir}</p>
                            </div>
                            <div className="col-sm">
                                <h3>Email Penggalang</h3>
                                <p>{toko.owner}</p>
                            </div>
                        </Row>
                        <Row style={{paddingBottom: '10px'}}>
                            <div className="col-sm">
                                <h3>Tipe Usaha</h3>
                                <p>{toko.tipeUsaha}</p>
                            </div>
                            <div className="col-sm">
                                <h3>Nomor Telepon Penggalang</h3>
                                <p>{userPhone}</p>
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <div className="col-sm">
                                {!disable && (userData.role === 'Investor') && <a href={"/investasi/"+match.params.pk}><button className="detail-pengadaan-invest-button" type="button">
                                    Ikut Investasi
                                </button></a>}
                                {disable && (userData.role === 'Investor') && <button className="detail-pengadaan-invest-button" type="button" disabled>
                                    Ikut Investasi
                                </button>}
                            </div>
                        </Row>
                    </div>
                    <br></br>
                    <div id="tabs">
                    <Tabs fill justify defaultActiveKey="toko" id="uncontrolled-tab-example">
                        <Tab eventKey="toko" title="Informasi Toko">
                            <div id="informasi-toko" className="store-information">
                                Nama Toko:
                                <span className="store-information-span">  {toko.namaToko}</span><br />
                                Nama Cabang:
                                <span className="store-information-span">  {toko.namaCabang}</span><br />
                                Tipe Usaha:
                                <span className="store-information-span">  {toko.tipeUsaha}</span><br />
                                Nomor Telepon Toko:
                                <span className="store-information-span">  {toko.nomorTelepon}</span><br />
                                Deskripsi Toko:<br />
                                <span className="store-information-span">  {toko.deskripsiToko}</span><br />
                                Lokasi Toko: 
                                <span className="store-information-span">  {toko.lokasiToko}</span><br />
                                <Map latitude={toko.latitude} longitude={toko.longitude} />
                            </div>
                        </Tab>
                        <Tab eventKey="mainan" title="Pilihan Mainan">
                            <div id="mainan">
                            { pengadaan.length !== 0 && pengadaan.daftarMainan.map(item => (
                                <Row className="justify-content-center toys-summary">
                                <div className="col-sm-2">
                                    <img src={item.mainan.gambarMainan} className="mainan-image" alt=""></img>
                                </div>
                                <div className="col-sm-6 mainan-wrapper">
                                    {item.mainan.namaMainan}<br />
                                    <span style={{ fontWeight: "500", fontSize: "15px" }}>Rp. {item.mainan.harga}</span>
                                </div>
                                <div className="col-sm-4" style={{ fontSize: "15px" }}>
                                    <div className="line" />
                                    {role==="Mitra" && <a href={"/laporan-kerusakan/"+item.id} className="custom-card-walkiddie">
                                    <button className="wkd-home-button wkd-nav-button wkd-tosca-button">
                                        Lapor Kerusakan
                                    </button>
                                    </a>}
                                </div>
                            </Row>
                            )) }
                            </div>
                        </Tab>
                        <Tab eventKey="keuangan" title="Estimasi Keuangan">
                            <div id="keuangan" className="card mi-card-money">
                                <div className="card-body">
                                    <p className="card-text">
                                        {pengadaan.estimasiKeuangan}
                                    </p>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                    </div>
                </div>
            </Row>
            <br />
        </div>
    </>
    );
}else{
    return (<Redirect to="/" />)
  } 
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.user
});

export default connect(mapStateToProps)(DetailPengadaan);
