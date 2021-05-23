import './DetailPengadaan.css';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from 'react-redux';
import { Row } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { ChevronLeft } from 'react-feather';
import image from './resto-bebek.jpg';
import image2 from './resto-bebek-2.jpg';
import image3 from './resto-bebek-3.jpg';
import profil from './profil-bebek.jpg';


const DetailPengadaan = ({ isAuthenticated ,user }) => {
    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Investor") return <Redirect to="/" />

    return ( 
        <div className="wrapper">
            <h3 className="back-button"><Link to="/" style={{ color: 'rgb(0, 0, 0)' }} ><ChevronLeft size="40" className="chevron-left"/></Link>Kembali</h3>
            <div className="store-header">
                <img src={profil} className="profile-image" alt=""></img>
                <div className="store-name">
                    Resto Bebek H.Slamet<br />
                    <span style={{fontWeight: "500", fontSize: "15px"}}>WKD-02ID2021 - Cabang Maros 05</span>
                </div>
            </div>
            <Row className="justify-content-center distance-2">
                <div className="col-lg-5">
                    <div className="carousel-wrapper">
                        <Carousel autoPlay infiniteLoop thumbWidth={150} showThumbs={false}>
                        <div>
                            <img alt="" src={image3}/>
                        </div>
                        <div>
                            <img alt="" src={image2}/>
                        </div>
                        <div>
                            <img alt="" src={image} />
                        </div>
                        </Carousel>
                    </div>
                    <h3 className="modal-text">Kebutuhan Modal</h3>
                    <p className="midtext"></p>
                    <h3 className="modal-target">Rp30,000,000.00</h3>
                    <ProgressBar striped now={55} label={55 + "%"} />
                    <p className="modal-desc">Terkumpul dari target: Rp16,500,000.00</p>
                </div>
                <div className="col-lg-7">
                    <div className="box-wrapper">
                        <Row className="distance">
                            <div className="col-sm">
                                <h3>Periode Pengadaan</h3>
                                <p>05/17/2021 - 07/17/2021</p>
                            </div>
                            <div className="col-sm">
                                <h3>Email Penggalang</h3>
                                <p>charles@gmail.com</p>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-sm">
                                <h3>Tipe Usaha</h3>
                                <p>Restoran</p>
                            </div>
                            <div className="col-sm">
                                <h3>Nomor Telepon Penggalang</h3>
                                <p>081318061867</p>
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <div className="col-sm">
                                <Link to="/investasi"><button className="invest-button" type="button">
                                    Ikut Investasi
                                </button></Link>
                            </div>
                        </Row>
                    </div>
                    <br></br>
                    <Tabs fill justify defaultActiveKey="toko" id="uncontrolled-tab-example">
                        <Tab eventKey="toko" title="Informasi Toko">
                            <div className="store-information">
                                Nama Toko:
                                <span className="store-information-span">  Resto Bebek H.Slamet</span><br />
                                Nama Cabang:
                                <span className="store-information-span">  Maros 05</span><br />
                                Tipe Usaha:
                                <span className="store-information-span">  Restoran</span><br />
                                Nomor Telepon Toko:
                                <span className="store-information-span">  081316086814</span><br />
                                Lokasi Toko:
                                <span className="store-information-span">  Jl Tanah Abang III 15 Graha Astri Aniela Anggun,Petojo Selatan</span><br />
                                Deskripsi Toko:<br />
                                <span className="store-information-span">  
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                                culpa qui officia deserunt mollit anim id est laborum</span><br />
                            </div>
                        </Tab>
                        <Tab eventKey="mainan" title="Pilihan Mainan">
                            <Row className="justify-content-center toys-summary">
                                <div className="col-sm-2">
                                    <img src="https://i.stack.imgur.com/y9DpT.jpg" className="review-pengadaan-mainan"></img>
                                </div>
                                <div className="col-sm-6 profile-details">
                                    Spongebob Kiddie Ride<br />
                                    <span style={{fontWeight: "500", fontSize: "15px"}}>Rp 7,200,000.00</span>
                                </div>
                                <div className="col-sm-4" style={{fontSize: "15px"}}>
                                    <div className="line" />
                                    <span style={{fontWeight: "500"}}>Jumlah: </span>2 buah
                                </div>
                            </Row>
                            <br></br>
                            <Row className="justify-content-center toys-summary">
                                <div className="col-sm-2">
                                    <img src="https://i.stack.imgur.com/y9DpT.jpg" className="review-pengadaan-mainan"></img>
                                </div>
                                <div className="col-sm-6 profile-details">
                                    Spongebob Kiddie Ride<br />
                                    <span style={{fontWeight: "500", fontSize: "15px"}}>Rp 7,200,000.00</span>
                                </div>
                                <div className="col-sm-4" style={{fontSize: "15px"}}>
                                    <div className="line" />
                                    <span style={{fontWeight: "500"}}>Jumlah: </span>2 buah
                                </div>
                            </Row>
                            <br></br>
                            <Row className="justify-content-center toys-summary">
                                <div className="col-sm-2">
                                    <img src="https://i.stack.imgur.com/y9DpT.jpg" className="review-pengadaan-mainan"></img>
                                </div>
                                <div className="col-sm-6 profile-details">
                                    Spongebob Kiddie Ride<br />
                                    <span style={{fontWeight: "500", fontSize: "15px"}}>Rp 7,200,000.00</span>
                                </div>
                                <div className="col-sm-4" style={{fontSize: "15px"}}>
                                    <div className="line" />
                                    <span style={{fontWeight: "500"}}>Jumlah: </span>2 buah
                                </div>
                            </Row>
                        </Tab>
                        <Tab eventKey="keuangan" title="Estimasi Keuangan">
                            <div className="card mi-card">
                                <div className="card-body">
                                    <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
    user: state.auth.user
});

export default connect(mapStateToProps)(DetailPengadaan);
