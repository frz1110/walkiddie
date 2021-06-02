import './ListOwnedPengadaan.css';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row } from "react-bootstrap";
import pengadaanCard from './pengadaan-icon.svg';
import investasiCard from './investasi-icon.svg';
import profil1 from '../DetailPengadaan/profil-bebek.jpg';
import storeImage1 from '../DetailPengadaan/resto-bebek-2.jpg';
import profil2 from './kfc-logo.png';
import storeImage2 from './kfc-toko.jpg';

const ListOwnedPengadaan = ({ isAuthenticated, user }) => {
    // const [pengadaan, setPengadaan] = useState([]);
    // const results = []
    
    // const config = {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //         'Authorization': `JWT ${localStorage.getItem('access')}`,
    //     }
    // };

    // const fetchData = async () => {
    //     try {
    //         const investasiObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/`, config);
    //         for (let i = 0; i < investasiObj.data.length; i++) {
    //             if (investasiObj.data[i].investor === user.email) {
    //                 const pengadaanObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${investasiObj.data[i].pengadaan}`, config);
    //                 results.push(pengadaanObj.data);
    //             }
    //         }
    //         setPengadaan([...pengadaan, ...results])
    //     }
    //     catch (err) {
    //         console.log(err)
    //         alert('Terjadi kesalahan pada database')
    //     }
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // console.log(pengadaan)
    
    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Investor") return <Redirect to="/" />

    return (
        <div className="owned-pengadaan-wrapper">
            <div className="owned-pengadaan-sect-1">
                <div className="owned-pengadaan-sect-1-content">
                    <h3 className="investor-h2 text-align-left"
                        style={{ padding: '0', margin: '0' }}
                    >Halo, <span className="investor-text">{user.first_name} {user.last_name} !</span></h3>
                    <h6 className="greeting-msg text-align-left"
                        style={{ padding: '0', margin: '0' }}
                    >Selamat datang kembali di <span style={{ fontWeight: "700", fontSize: "25px", color: "#146A5F" }}>Walkiddie.</span></h6>
                </div>
            </div>
            <div className="owned-pengadaan-sect-2">
                <div className="investor-card-container">
                    <Link to="/list-pengadaan">
                        <img src={pengadaanCard} alt="" className="investor-card-menu" />
                    </Link>
                    <Link to="/">
                        <img src={investasiCard} alt="" className="investor-card-menu" />
                    </Link>
                </div>
                <div className="list-owned-pengadaan">
                    <h3 className="text-align-left list-owned-h3" >Investasi yang dimiliki</h3>
                    <div className="owned-pengadaan-object">
                        <div className="owned-pengadaan-profil">
                            <div className="owned-pengadaan-profil-left">
                                <img src={profil1} className="owned-pengadaan-profil-img" alt=""></img>
                                <div className="owned-pengadaan-store-name">
                                    Resto Bebek H.Slamet<br />
                                    <span style={{ fontWeight: "500", fontSize: "12px" }}>WKD-02ID2021 - Cabang Maros 05</span>
                                </div>
                            </div>
                            <div className="owned-pengadaan-profil-right">
                                <h3 className="owned-pengadaan-status">Menunggu Modal Terpenuhi</h3>
                            </div>
                        </div>
                        <Row>
                            <div className="col-4">
                                <img src={storeImage1} className="owned-pengadaan-store-img" alt=""></img>
                            </div>
                            <div className="col-8 owned-pengadaan-store-desc-saham-wrapper">
                                <p className="owned-pengadaan-store-desc">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to </p>
                                <p><span style={{ fontWeight: "500", fontSize: "17px" }}>Total saham dimiliki:</span> <br />20%</p>
                            </div>
                        </Row>
                    </div>
                    <br />
                    <div className="owned-pengadaan-object">
                        <div className="owned-pengadaan-profil">
                            <div className="owned-pengadaan-profil-left">
                                <img src={profil2} className="owned-pengadaan-profil-img" alt=""></img>
                                <div className="owned-pengadaan-store-name">
                                    KFC<br />
                                    <span style={{ fontWeight: "500", fontSize: "12px" }}>WKD-02ID2021 - A. Yani Banjarmasin</span>
                                </div>
                            </div>
                            <div className="owned-pengadaan-profil-right">
                                <h3 className="owned-pengadaan-status">Menunggu Modal Terpenuhi</h3>
                            </div>
                        </div>
                        <Row>
                            <div className="col-4">
                                <img src={storeImage2} className="owned-pengadaan-store-img" alt=""></img>
                            </div>
                            <div className="col-8 owned-pengadaan-store-desc-saham-wrapper">
                                <p className="owned-pengadaan-store-desc">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to </p>
                                <p><span style={{ fontWeight: "500", fontSize: "17px" }}>Total saham dimiliki:</span> <br />35%</p>
                            </div>
                        </Row>
                    </div>
                    </div>
                </div>
            </div>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps)(ListOwnedPengadaan);