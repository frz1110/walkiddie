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
import Map from './Map.js'
import { ChevronLeft } from 'react-feather';
import { load_profile } from '../../actions/auth';

const DetailPengadaan = ({ isAuthenticated, userData, match }) => {
    const [toko, setToko] = useState([]);
    const [pengadaan, setPengadaan] = useState([]);
    const [userPhone, setUserPhone] = useState('');
    const [filesPengadaan, setFilesPengadaan] = useState([]);
    const [disable, setDisable] = useState(false);

    let history = useHistory();

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const fetchData = async () => {
        try {
            const pengadaanObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${match.params.pk}`, config);
            setPengadaan(pengadaanObj.data);
            setFilesPengadaan(pengadaanObj.data.files)
            const tokoObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/${pengadaanObj.data.toko}`, config);
            setToko(tokoObj.data);
            console.log(tokoObj.data);
            localStorage.setItem('lat', tokoObj.data.latitude);
            localStorage.setItem('long', tokoObj.data.longitude);
            console.log(localStorage.getItem('lat'));
            console.log(localStorage.getItem('long'));
        }
        catch (err) {
            alert('Terjadi kesalahan pada database')           
            history.push('/')
        }
    }

    const fetchData2 = async () => {
        try {
            const user = await load_profile()(toko.owner);
            setUserPhone(user.res.data.phone_number);
        }
        catch (err) {
            setUserPhone('-')
        }
    }

    const investCheck = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/`, config)
                .then(response => {
                    if(response.data.filter(b => b.investor === userData.email && b.pengadaan === pengadaan.pk).length !== 0){
                        setDisable(true);
                    }
                });
        }
        catch (err) {
            setDisable(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData2();
        investCheck();
    }, [toko]);

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (userData.role !== "Investor") return <Redirect to="/" />

    return (
        <div className="detail-pengadaan-wrapper">
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
                    <h3 className="detail-pengadaan-modal-text">Kebutuhan Modal</h3>
                    <p className="detail-pengadaan-midtext"></p>
                    <h3 className="detail-pengadaan-modal-target">Rp{pengadaan.totalBiaya},00</h3>
                    <ProgressBar striped now={(pengadaan.danaTerkumpul / pengadaan.totalBiaya * 100) + 10} label={pengadaan.danaTerkumpul / pengadaan.totalBiaya * 100 + "%"} />
                    <p className="detail-pengadaan-modal-desc">Terkumpul dari target: Rp{pengadaan.danaTerkumpul},00</p>
                </div>
                <div className="col-lg-7">
                    <div className="detail-pengadaan-box-wrapper">
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
                                {!disable && <a href={"/investasi/"+match.params.pk}><button className="detail-pengadaan-invest-button" type="button">
                                    Ikut Investasi
                                </button></a>}
                                {disable && <button className="detail-pengadaan-invest-button" type="button" disabled>
                                    Ikut Investasi
                                </button>}
                            </div>
                        </Row>
                    </div>
                    <br></br>
                    <Tabs fill justify defaultActiveKey="toko" id="uncontrolled-tab-example">
                        <Tab eventKey="toko" title="Informasi Toko">
                            <div className="store-information">
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
                                <Map />
                            </div>
                        </Tab>
                        <Tab eventKey="mainan" title="Pilihan Mainan">
                            <Row className="justify-content-center toys-summary">
                                <div className="col-sm-2">
                                    <img src="https://i.stack.imgur.com/y9DpT.jpg" className="mainan-image" alt=""></img>
                                </div>
                                <div className="col-sm-6 mainan-wrapper">
                                    Spongebob Kiddie Ride<br />
                                    <span style={{ fontWeight: "500", fontSize: "15px" }}>Rp 7,200,000.00</span>
                                </div>
                                <div className="col-sm-4" style={{ fontSize: "15px" }}>
                                    <div className="line" />
                                    <span style={{ fontWeight: "500" }}>Jumlah: </span>2 buah
                                </div>
                            </Row>
                            <br></br>
                            <Row className="justify-content-center toys-summary">
                                <div className="col-sm-2">
                                    <img src="https://i.stack.imgur.com/y9DpT.jpg" className="mainan-image" alt=""></img>
                                </div>
                                <div className="col-sm-6 mainan-wrapper">
                                    Spongebob Kiddie Ride<br />
                                    <span style={{ fontWeight: "500", fontSize: "15px" }}>Rp 7,200,000.00</span>
                                </div>
                                <div className="col-sm-4" style={{ fontSize: "15px" }}>
                                    <div className="line" />
                                    <span style={{ fontWeight: "500" }}>Jumlah: </span>2 buah
                                </div>
                            </Row>
                            <br></br>
                            <Row className="justify-content-center toys-summary">
                                <div className="col-sm-2">
                                    <img src="https://i.stack.imgur.com/y9DpT.jpg" className="mainan-image" alt=""></img>
                                </div>
                                <div className="col-sm-6 mainan-wrapper">
                                    Spongebob Kiddie Ride<br />
                                    <span style={{ fontWeight: "500", fontSize: "15px" }}>Rp 7,200,000.00</span>
                                </div>
                                <div className="col-sm-4" style={{ fontSize: "15px" }}>
                                    <span style={{ fontWeight: "normal" }}>Jumlah: </span>2 buah
                                </div>
                            </Row>
                        </Tab>
                        <Tab eventKey="keuangan" title="Estimasi Keuangan">
                            <div className="card mi-card-money">
                                <div className="card-body">
                                    <p className="card-text">
                                        {pengadaan.estimasiKeuangan}
                                    </p>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </Row>
        </div>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.user
});

export default connect(mapStateToProps)(DetailPengadaan);
