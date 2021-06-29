import './DetailInvestasi.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Row } from "react-bootstrap";
import { ChevronLeft } from 'react-feather';
import Table from 'react-bootstrap/Table';
import NumberFormat from 'react-number-format';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import emptyIcon from '../ListOwnedPengadaan/empty.svg';

const DetailInvestasi = ({ isAuthenticated, user, location }) => {
    const [sales, setSales] = useState([]);
    const [tanggalPendapatan, setTanggalPendapatan] = useState([]);
    const [rincianPendapatan, setRincianPendapatan] = useState([]);
    const [pendapatan, setPendapatan] = useState('');
    const [empty, setEmpty] = useState(false);
    const data = location.state;
    const email = user.email;
    const results1 = [];
    const results2 = [];
    let totalPendapatan = 0;

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const fetchSales = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${data.pk}/sales`, config);
            if (res.data.length === 0) {
                setEmpty(true);
            } else {
                setEmpty(false);
                setSales(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    results1.push(res.data[i].tanggalPendapatan);
                    results2.push(res.data[i].bagiHasil.investor[email]);
                    totalPendapatan = totalPendapatan + res.data[i].bagiHasil.investor[email];
                    setPendapatan(totalPendapatan)
                }
                setTanggalPendapatan([...tanggalPendapatan, ...results1]);
                setRincianPendapatan([...rincianPendapatan, ...results2]);
            }
        }
        catch (err) {
            alert('Terjadi kesalahan pada database')
        }
    }

    useEffect(() => {
        fetchSales();
    }, [data]);

    function statusChanger(status) {
        if (status === "MPA") {
            return (<h3 className="owned-pengadaan-status">Menunggu Persetujuan Admin</h3>)
        }
        else if (status === "TRM") {
            return (<h3 className="owned-pengadaan-status" style={{ color: "#146A5F" }}>Beroperasi Normal</h3>)
        }
        else if (status === "TLK") {
            return (<h3 className="owned-pengadaan-status">Pengajuan Ditolak</h3>)
        }
        else {
            return "";
        }
    }

    const dataDoughnutChart = {
        datasets: [
            {
                label: 'Jumlah saham',
                data: [(data.nominal / data.totalBiaya) * 100, 100 - (data.nominal / data.totalBiaya) * 100],
                backgroundColor: [
                    '#146A5F',
                    '#D3F1EE',
                ],
                hoverOffset: 4
            },
        ],
    };

    const dataLineChart = {
        labels: tanggalPendapatan,
        datasets: [
            {
                label: 'Rincian Pendapatan',
                data: rincianPendapatan,
                fill: false,
                backgroundColor: '#146A5F',
                borderColor: '#D3F1EE',
            },
        ],
    };

    const optionsLineChart = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const dataBarChart = {
        labels: tanggalPendapatan,
        datasets: [
            {
                label: 'Rincian Pendapatan',
                data: rincianPendapatan,
                backgroundColor: '#146A5F',
                borderColor: '#D3F1EE',
                borderWidth: 3,
                maxBarThickness: 90
            },
        ],
    };

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Investor") return <Redirect to="/" />
    if (data.status !== "TRM") return <Redirect to="/" />

    return (
        <div className="detail-investasi-wrapper">
            <h3 className="back-button" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left" />Kembali</h3>
            <div className="owned-pengadaan-object-invest">
                <div className="owned-pengadaan-profil-invest">
                    <div className="owned-pengadaan-profil-left">
                        <img src={data.fotoProfilToko} className="owned-pengadaan-profil-img" alt=""></img>
                        <div className="owned-pengadaan-store-name">
                            {data.namaToko}<br />
                            <span style={{ fontWeight: "500", fontSize: "14px" }}>WKD-02ID2021 - {data.namaCabang}</span>
                        </div>
                    </div>
                    <div className="owned-pengadaan-profil-right">
                        {statusChanger(data.status)}
                    </div>
                </div>
            </div>
            <br />

            <Row style={{ margin: "0px" }} className="justify-content-center">
                <div className="col-4 detail-investasi-small-card">
                    <div className="detail-investasi-small-card-left">
                        <div className="detail-investasi-small-card-title">
                            Total Saham Dimiliki<br />
                            {/* <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "40px", fontWeight: "700" }}>70%</span> */}
                        </div>
                        <div className="detail-investasi-small-card-value">
                            {(data.nominal / data.totalBiaya) * 100}%
                            </div>
                    </div>
                    <div>
                        <Doughnut
                            data={dataDoughnutChart}
                            width={120}
                            height={120}
                            options={{ maintainAspectRatio: false, responsive: false }}
                        />
                    </div>
                </div>
                <div className="col-4">

                </div>
                <div className="col-4">

                </div>
            </Row>
            <br />
            {!empty && <div>
                <Row style={{ margin: "0px" }}>
                    <div className="col chart-card">
                        <Line data={dataLineChart} height={200} options={optionsLineChart} />
                    </div>
                    <div className="col chart-card" style={{ marginLeft: "15px" }}>
                        <Bar data={dataBarChart} height={200} options={optionsLineChart} />
                    </div>
                </Row>
                <br />
                <div className="detail-investasi-table-wrapper">
                    <h3 className="table-title-rincian">Tabel Rincian Pendapatan</h3>
                    <div className="table-wrapper-invest" style={{ margin: "0px" }}>
                        <div style={{ width: "100%", height: "100%" }}>
                            <Table bordered borderless>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>Rincian Penjualan</th>
                                        <th>Rincian Pendapatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales.map(item => (
                                        <tr>
                                            <td>1</td>
                                            <td>{item.tanggalPendapatan}</td>
                                            <td><NumberFormat value={item.pendapatan} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                                            <td style={{ fontWeight: "500" }}><NumberFormat value={String(item.bagiHasil.investor[email])} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div style={{
                            marginLeft: "10px",
                            minWidth: "250px",
                            boxShadow: "0px 1px 4px rgb(0 0 0 / 25%)",
                            padding: "10px"
                        }}>
                            <div className="detail-investasi-small-card-title">
                                Total Pendapatan:<br />
                            </div>
                            <div className="detail-investasi-small-card-value" style={{ fontSize: "35px" }}>
                                {<NumberFormat value={pendapatan} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {empty && <div className="owned-pengadaan-null-wrapper">
                <img src={emptyIcon} alt="empty data"></img>
                <h5 className="owned-pengadaan-null">Belum memiliki pendapatan</h5>
            </div>}
        </div>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps)(DetailInvestasi);