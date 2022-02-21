import './DetailLaporanKerusakan.css';
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory  } from 'react-router-dom';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from 'react-redux';
import { Row } from "react-bootstrap";
import { ChevronLeft } from 'react-feather';

const DetailLaporanKerusakan = ({ isAuthenticated, userData, match}) => {
    
    const [laporan, setLaporan] = useState([]);
    const [mainanPengadaan, setMainanPengadaan] = useState([]);
    const [pengadaan, setPengadaan] = useState([]);
    const [mainan, setMainan] = useState([]);
    const [toko, setToko] = useState([]);
    const [status, setStatus] = useState([]);
    
    let history = useHistory();
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const fetchLaporan = async () => {
        try {
            var laporanObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/${match.params.pk}/detail`, config);
            setLaporan(laporanObj.data);
            setMainan(laporanObj.data.mainanPengadaan.mainan);
            setMainanPengadaan(laporanObj.data.mainanPengadaan);
            setPengadaan(laporanObj.data.mainanPengadaan.pengadaan);
            setToko(laporanObj.data.mainanPengadaan.pengadaan.toko);

            if(laporanObj.data.status==='NAS'){
                setStatus("Belum Diperbaiki");
            }else if(laporanObj.data.status==='RSV'){
                setStatus("Sudah Selesai");
            }else{
                setStatus("Sedang Diperbaiki");
            }
        }
        catch (err) {           
            history.push('/')
            alert('Terjadi kesalahan saat fetching data laporan')
        }
    }
  
    useEffect(() => {
        fetchLaporan();
    }, []);

    const deleteLaporan = (pk) => {
        if (localStorage.getItem('access')) {
            
            axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/${pk}/delete/`, config)
                .then((response) => {
                    console.log(response);
                    console.log('Success post');
                    window.history.back();
                    alert('Anda telah menghapus laporan kerusakan');
                }, (error) => {
                    if (error.response) {
                        console.log("error.response")
                        console.log(error.response)
    
                    } else if (error.request) {
    
                        console.log("error.request")
                        console.log(error.request)
    
                    } else if (error.message) {
    
                        console.log("error.message")
                        console.log(error.message)
    
                    }
                    console.log(error);
                    alert("Terdapat kesalahan. Silakan mengecek kembali laporan yang Anda masukan dan refresh ulang halaman ini dan perbaiki pengadaan Anda.")
                });
        } else {
            console.log('missing token');
            alert('Terdapat kesalahan pada autentikasi akun anda. Anda dapat melakukan refresh pada halaman ini')
        }
    };

  if (!isAuthenticated) {
    return (<Redirect to="/masuk" />)
  } else if (userData.role == 'Mitra')  {
    return (
        <div className="detail-pengadaan-wrapper">
            <h3 className="back-button" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left"/>Detail Laporan</h3>
            <Row className="justify-content-center">
                <div className="col-lg-6">
                    <div className="detail-pengadaan-carousel-wrapper">
                        <img src={laporan.fotoKerusakan} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="detail-pengadaan-box-wrapper">
                            <div className="col-sm">
                                <h3>Deskripsi Kerusakan</h3>
                                <p>{laporan.deskripsi}</p>
                            </div>
                    </div>
                    <br></br>
                </div>
            </Row>
            <Row>
                <div className="store-information col-lg-6">
                    Mitra:
                    <span className="store-information-span">  {laporan.mitra}</span><br />
                    Status:
                    <span className="store-information-span">  {status}</span><br />
                    Id Mainan:
                    <span className="store-information-span">  {mainanPengadaan.id}</span><br />
                    Nama Mainan:
                    <span className="store-information-span">  {mainan.namaMainan}</span><br />
                    Id Pengadaan:
                    <span className="store-information-span">  {pengadaan.pk}</span><br />
                    Id Toko:
                    <span className="store-information-span">  {toko.pk}</span><br />
                    Nama Toko:
                    <span className="store-information-span">  {toko.namaToko}</span><br />
                    Cabang Toko:
                    <span className="store-information-span">  {toko.namaCabang}</span><br />
                </div>
                {laporan.status === 'NAS' && <div className="col-lg-1">
                <a href={"/update-laporan-kerusakan/"+laporan.pk} className="custom-card-walkiddie">
                    <button className="wkd-home-button wkd-nav-button wkd-tosca-button">
                        Ubah Deskripsi
                    </button>
                    <p></p>
                    </a>
                    <a onClick={() => deleteLaporan(laporan.pk)} className="custom-card-walkiddie">
                    <button className="wkd-home-button wkd-nav-button wkd-dark-green-button">
                        Hapus
                    </button>
                </a>
                </div>}
                </Row>
            <br />
        </div>
    );
}else{
    return (<Redirect to="/" />)
  } 
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.user
});

export default connect(mapStateToProps)(DetailLaporanKerusakan);
