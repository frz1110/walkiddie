import './ListOwnedPengadaan.css';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row } from "react-bootstrap";
import _ from 'lodash';
import { ChevronRight } from 'react-feather';
import pengadaanCard from './pengadaan-icon.svg';
import investasiCard from './investasi-icon.svg';
import emptyIcon from './empty.svg';

const ListOwnedPengadaan = ({ isAuthenticated, user }) => {
    const [pengadaan, setPengadaan] = useState([]);
    const [toko, setToko] = useState([]);
    const [investasi, setInvestasi] = useState([]);
    const [merged, setMerged] = useState([]);
    const [empty, setEmpty] = useState(false);
    const results1 = [];
    const results2 = [];
    const results3 = [];

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const fetchPengadaanData = async () => {
        try {
            const investasiObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/`, config);
            if (investasiObj.data.length === 0) {
                setEmpty(true);
            } else {
                setEmpty(false);
                for (let i = 0; i < investasiObj.data.length; i++) {
                    if (investasiObj.data[i].investor === user.email) {
                        results3.push(investasiObj.data[i]);
                        const pengadaanObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${investasiObj.data[i].pengadaan}`, config);
                        results1.push(pengadaanObj.data);
                    }
                }
                setPengadaan([...pengadaan, ...results1]);
                setInvestasi([...investasi, ...results3]);
            }
        }
        catch (err) {
            console.log(err)
            alert('Terjadi kesalahan pada database')
        }
    }

    const fetchTokoData = async () => {
        try {
            for (let i = 0; i < pengadaan.length; i++) {
                const tokoObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/${pengadaan[i].toko}`, config);
                results2.push(tokoObj.data);
            }
            setToko([...toko, ...results2]);
        }
        catch (err) {
            console.log(err)
            alert('Terjadi kesalahan pada database')
        }
    }

    function statusChanger(status) {
        if (status === "MPA") {
            return (<h3 className="owned-pengadaan-status">Menunggu Persetujuan Admin</h3>)
        }
        else if (status === "TRM") {
            return (<h3 className="owned-pengadaan-status" style={{ color: "#146A5F" }}>Diterima</h3>)
        }
        else if (status === "TLK") {
            return (<h3 className="owned-pengadaan-status">Ditolak</h3>)
        }
        else {
            return "";
        }
    }

    useEffect(() => {
        fetchPengadaanData();
    }, []);

    useEffect(() => {
        fetchTokoData();
    }, [pengadaan]);

    useEffect(() => {
        var result = _.values(_.merge(_.keyBy(toko, 'pk'), _.keyBy(pengadaan, 'toko')));
        var result2 = _.values(_.merge(_.keyBy(investasi, 'pengadaan'), _.keyBy(pengadaan, 'pk')));
        var resultAll = _.values(_.merge(_.keyBy(result, 'pk'), _.keyBy(result2, 'pk')));
        setMerged(resultAll)
        // console.log(resultAll)
    }, [toko]);

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
                    <h3 className="text-align-left list-owned-h3">Investasi yang dimiliki</h3>
                    {merged.map(item => (
                        <div>
                            <div className="owned-pengadaan-object">
                                <div className="owned-pengadaan-profil">
                                    <div className="owned-pengadaan-profil-left">
                                        <img src={item.fotoProfilToko} className="owned-pengadaan-profil-img" alt=""></img>
                                        <div className="owned-pengadaan-store-name">
                                            {item.namaToko}<br />
                                            <span style={{ fontWeight: "500", fontSize: "14px" }}>WKD-02ID2021 - {item.namaCabang}</span>
                                        </div>
                                    </div>
                                    <div className="owned-pengadaan-profil-right">
                                        {statusChanger(item.status)}
                                    </div>
                                </div>
                                <Row>
                                    <div className="col-4">
                                        <img src={item.files[0]} className="owned-pengadaan-store-img" alt=""></img>
                                    </div>
                                    <div className="col-8 owned-pengadaan-store-desc-saham-wrapper">
                                        <p className="owned-pengadaan-store-desc">{item.deskripsiToko}</p>
                                        <div className="owned-pengadaan-store-saham">
                                            <p><span style={{ fontWeight: "500" }}>Total saham dimiliki:</span> <br />{(item.nominal / item.totalBiaya) * 100}%</p>
                                            <a href={"/detail-pengadaan/"+item.pengadaan} style={{color: "#146A5F"}}><p className="detail-pengadaan-text">Lihat Detail Pengadaan<ChevronRight style={{paddingBottom: '3px'}}/></p></a>
                                        </div>
                                        
                                    </div>
                                </Row>
                            </div>
                            <br />
                        </div>
                    ))}
                    {empty && <div className="owned-pengadaan-null-wrapper">
                        <img src={emptyIcon} alt="empty data"></img>
                        <h5 className="owned-pengadaan-null">Belum memiliki investasi</h5>
                    </div>}
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