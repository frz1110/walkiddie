import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Dropdown } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { ChevronLeft } from 'react-feather';
import './RingkasanSales.css';
import '../PengadaanMainan/PengadaanMainan.css';
import '../ListOwnedPengadaan/ListOwnedPengadaan.css';
import emptyIcon from '../ListOwnedPengadaan/empty.svg';
import NumberFormat from 'react-number-format';

const RingkasanSales = ({ isAuthenticated, user }) => {
    const [empty, setEmpty] = useState(false);
    const [data, setData] = useState();
    const [deskripsi, setDeskripsi] = useState(null);
    const [filter, setFilter] = useState('Semua');
    const [allPengadaan, setAllPengadaan]= useState([]);
    const [nullPengadaan, setNullPengadaan] = useState([]);
    var somePengadaan = [];
    const handleSelect = (e) => {
        setFilter(e)
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    useEffect(() => {
        const fetchRingkasanSales = async () => {
            try {
                var res;
                if (user.role === 'Mitra') {
                    if (filter === 'Semua') {
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-mitra/`, config);
                        console.log("ringkasan-mitra")
                        console.log(res)
                    } else if (filter === 'Harian') {
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-mitra/day`, config);
                        console.log("ringkasan-mitra harian")
                        console.log(res)
                    } else if (filter === 'Mingguan') {
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-mitra/week`, config);
                        console.log("ringkasan-mitra mingguan")
                        console.log(res)
                    } else if (filter === 'Bulanan') {
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-mitra/month`, config);
                        console.log("ringkasan-mitra bulanan")
                        console.log(res)
                    } else {
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-mitra/year`, config);
                        console.log("ringkasan-mitra tahunan")
                        console.log(res)
                    }
                } else {
                    if (filter === 'Semua') {
                        setAllPengadaan([]);
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-investor/`, config);
                        console.log("ringkasan-investor")
                        console.log(res)
                    } else if (filter === 'Harian') {
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-investor/day`, config);
                        console.log("ringkasan-investor harian")
                        console.log(res)
                    } else if (filter === 'Mingguan') {
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-investor/week`, config);
                        console.log("ringkasan-investor mingguan")
                        console.log(res)
                    } else if (filter === 'Bulanan') {
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-investor/month`, config);
                        console.log("ringkasan-investor bulanan")
                        console.log(res)
                    } else {
                        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-investor/year`, config);
                        console.log("ringkasan-investor tahunan")
                        console.log(res)
                    }
                }

                if (res.data.length === 0) {
                    setEmpty(true);
                } else {
                    setEmpty(false);
                }

                let keuntungan = [['Cabang', 'Investasi']];
                for (let j = 0; j < res.data.length; j++) {
                    if (filter === 'Semua'){
                        setAllPengadaan(oldArray => [res.data[j].namaToko + ' - ' + res.data[j].namaCabang,...oldArray] );
                    }
                    keuntungan.push([res.data[j].namaToko + ',' + res.data[j].namaCabang, res.data[j].pendapatan]);
                    somePengadaan.push(res.data[j].namaToko + ' - ' + res.data[j].namaCabang);
                }
                setData(keuntungan);
                setDeskripsi(res.data);
                setNullPengadaan(
                    allPengadaan.filter(n => !somePengadaan.includes(n))
                )
            } catch (e) {
                console.log(e);
                alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
            }
        }
        fetchRingkasanSales();
    }, [filter]);

    if (!isAuthenticated) {
        alert("Masuk sebagai Investor untuk melanjutkan");
        return <Redirect to="/masuk" />
    }

    if (deskripsi === null) {
        return 'Loading...';
    }
    return (
        <div className='container ringkasan-sales-height'>
            <h2
                style={{
                    textAlign: 'left'
                }}>
                <h3 className="back-button" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left" />Ringkasan Sales Investasi</h3>
            </h2>

            {empty &&
                <div className='align-items-center'>
                    <br />
                    <div className='ringkasan-sales-rectangle '>
                        <div className="dropdown-ringkasan-sales">
                            <Dropdown
                                onSelect={handleSelect}
                            >
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {filter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Semua">Semua</Dropdown.Item>
                                    <Dropdown.Item eventKey="Harian">Harian</Dropdown.Item>
                                    <Dropdown.Item eventKey="Mingguan">Mingguan</Dropdown.Item>
                                    <Dropdown.Item eventKey="Bulanan">Bulanan</Dropdown.Item>
                                    <Dropdown.Item eventKey="Tahunan">Tahunan</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="list-pengadaan-null-wrapper">
                            <img src={emptyIcon} alt="empty data"></img>
                            <h5 className="owned-pengadaan-null"> Anda belum mendapatkan keuntungan.</h5>
                        </div>
                    </div>
                </div>
            }

            {
                !empty &&
                <div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h3>Ringkasan Sales Investasi</h3>
                    <div className='ringkasan-sales-rectangle dropdown-ringkasan-sales'>
                         <Row>
                            <Dropdown
                                onSelect={handleSelect}
                            >
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {filter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Semua">Semua</Dropdown.Item>
                                    <Dropdown.Item eventKey="Harian">Harian</Dropdown.Item>
                                    <Dropdown.Item eventKey="Mingguan">Mingguan</Dropdown.Item>
                                    <Dropdown.Item eventKey="Bulanan">Bulanan</Dropdown.Item>
                                    <Dropdown.Item eventKey="Tahunan">Tahunan</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Row>
                        <Row>
                            <Col sm={6} 
                                style={{                              
                                     margin:'auto',marginLeft: '-100px'
                                }}>
                                <Chart
                                    width={'600px'}
                                    height={'400px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={data}
                                    rootProps={{ 'data-testid': '1' }}
                                />
                            </Col>
                            <Col sm={6}
                                style={{                              
                                    margin:'auto',marginLeft: '100px'
                                }}>

                                {deskripsi.map(desk => (
                                        <div className="profile-details-wrapper flex-wrapper">
                                            <div className="profile-details" id="desc">
                                                <small>{desk.namaToko} - {desk.namaCabang} : <NumberFormat value={desk.pendapatan} displayType={'text'} thousandSeparator={true} prefix={'Rp '}/></small>
                                                <small  className='float-right' ></small>
                                                <hr style={{width:'350px'}}></hr>
                                            </div>
                                            <div className="profile-details text-left" id="desc">
                                            </div>
                                            <hr/>
                                        </div>
                                ))}

                                {nullPengadaan.map(n => (
                                        <div className="profile-details-wrapper flex-wrapper">
                                        <div className="profile-details" id="desc">
                                            <small> {n} : <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'Rp '}/></small>
                                            <small  className='float-right' ></small>
                                            <hr style={{width:'350px'}}></hr>
                                        </div>
                                        <div className="profile-details text-left" id="desc">
                                        </div>
                                        <hr/>
                                    </div>
                                ))}
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(RingkasanSales);
