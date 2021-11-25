import './DetailInvestasi.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Row ,Dropdown} from "react-bootstrap";
import { ChevronLeft } from 'react-feather';
import Table from 'react-bootstrap/Table';
import NumberFormat from 'react-number-format';
import { Line, Bar } from 'react-chartjs-2';
import emptyIcon from '../ListOwnedPengadaan/empty.svg';
import CardMainan from '../../components/CardMainan/CardMainan';

function statusReadable(status) {
    if (status === 'RSK') {
        return 'Rusak';
    } else if (status === 'BFS') {
        return 'Berfungsi Normal';
    } else {
        return 'Normal';
    }
}

const DetailInvestasi = ({ isAuthenticated, user, location }) => {
  const [sales, setSales] = useState([]);
  const [pendapatan, setPendapatan] = useState('');
  const [empty, setEmpty] = useState(false);
  const [pendapatanTahunan, setpendapatanTahunan] = useState([]);
  const [tahun, setTahun] = useState([]);
  const [pendapatanBulanan, setpendapatanBulanan] = useState([]);
  const [bulan, setBulan] = useState([]);
  const data = location.state;
  const email = user.email;
  let totalPendapatan = 0;
  const [filter, setFilter] = useState('Harian');
  const [sellmode, setSellmode] = useState(false);
  const handleSelect = (e) => {
    setFilter(e)
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
  };

  const fetchSales = async () => {
    try {
      console.log(data);
      console.log('---');
      var res;
      if(filter==='Harian'){
        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${data.pengadaan.pk}/sales`, config);
      }
      else if(filter==='Mingguan'){
        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${data.pengadaan.pk}/sales/weekly`, config);
        console.log(res.data[0].dateRange.start);
      }
      else if(filter==='Bulanan'){
        res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${data.pengadaan.pk}/sales/monthly`, config);
      }
      if (res.data.length === 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
        setSales(res.data);
        console.log(res.data);
      }
    }
    catch (err) {
      alert('Terjadi kesalahan pada database~')
    }
  }

  useEffect(() => {
    fetchSales();
  }, [filter]);

  const fetchYearly = async () => {
    try {
      var yearData = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${data.pengadaan.pk}/sales/yearly`, config);
      var yearRes = [];
      var yearPendapatan=[];

      for(let j=0;j<yearData.data.length;j++){
        yearRes.push(yearData.data[j].tanggalPendapatan_Year);
        yearPendapatan.push(yearData.data[j].bagiHasil.investor[email]);
        totalPendapatan = totalPendapatan + yearData.data[j].bagiHasil.investor[email];
      }
      setPendapatan(totalPendapatan);
      setpendapatanTahunan(yearPendapatan);
      setTahun(yearRes);

      var mthData = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${data.pengadaan.pk}/sales/monthly`, config);
      var mthRes = [];
      var mthPendapatan=[];

      for(let j=0;j<mthData.data.length;j++){
        mthRes.push(mthData.data[j].tanggalPendapatan_Month);
        mthPendapatan.push(mthData.data[j].bagiHasil.investor[email]);
      }
      setpendapatanBulanan(mthPendapatan);
      setBulan(mthRes);
    }
    catch (err) {
      alert('Terjadi kesalahan pada database!')
    }
  }

  useEffect(() => {
    fetchYearly();
  }, []);

  const dataLineChart = {
    labels: bulan,
    datasets: [
      {
        label: 'Rincian Pendapatan',
        data: pendapatanBulanan,
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
    labels: tahun,
    datasets: [
      {
        label: 'Rincian Pendapatan',
        data: pendapatanTahunan,
        backgroundColor: '#146A5F',
        borderColor: '#D3F1EE',
        borderWidth: 3,
        maxBarThickness: 90
      },
    ],
  };

    const handleSubmit = async () => {
        const config1 = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        }
        await axios.patch(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/${data.pk}/jual/`, {}, config1);
        console.log(data);
        window.history.back();
    }

    const handleCancel = async () => {
        const config2 = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        }
        await axios.patch(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/${data.pk}/cancel-jual/`, {}, config2);
        console.log(data);
        window.history.back();
  }

  function roundingFloat(number){
    return Number(parseFloat(number).toFixed(2))
  }

  if (!isAuthenticated) return <Redirect to="/masuk" />
  if (user.role !== "Investor") return <Redirect to="/" />

  return (
    <div className="detail-investasi-wrapper">
      <h3 className="back-button" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left" />Kembali</h3>
      <div className="owned-pengadaan-object-invest">
        <div className="owned-pengadaan-profil-invest">
          <div className="owned-pengadaan-profil-left">
            <img src={data.pengadaan.toko.fotoProfilToko} className="owned-pengadaan-profil-img" alt=""></img>
            <div className="owned-pengadaan-store-name">
              {data.pengadaan.toko.namaToko}<br />
              <span style={{ fontWeight: "500", fontSize: "14px" }}>WKD-02ID2021 - {data.pengadaan.toko.namaCabang}</span>
            </div>
          </div>
          <div className="owned-pengadaan-profil-right">
            <h3 className="owned-pengadaan-status" style={{ color: "#146A5F" }}>Beroperasi Normal</h3>
          </div>
        </div>
      </div>
      <br />
      <br />
      {!empty && <>
        <div>
          <Row style={{ margin: "0px" }}>
            <div className="col chart-card">
              <Line data={dataLineChart} height={180} options={optionsLineChart} />
            </div>
            <div className="col chart-card" style={{ marginLeft: "15px" }}>
              <Bar data={dataBarChart} height={180} options={optionsLineChart} />
            </div>
          </Row>
          <br />
          <div className="detail-investasi-table-wrapper">
            <h3 className="table-title-rincian">Tabel Rincian Pendapatan</h3>
            <div className="dropdown-ringkasan-sales">
                <Dropdown
                  onSelect={handleSelect}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {filter}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Harian">Harian</Dropdown.Item>
                    <Dropdown.Item eventKey="Mingguan">Mingguan</Dropdown.Item>
                    <Dropdown.Item eventKey="Bulanan">Bulanan</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
             </div>

            <div className="table-wrapper-invest" style={{ marginTop: "15px" }}>
              <div style={{ width: "100%", height: "100%" }}>
                <Table bordered borderless>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>No</th>
                      <th>{filter==='Harian'?'Tanggal':(filter==='Mingguan'?'Minggu':'Bulan')}</th>
                      <th>Rincian Penjualan</th>
                      <th>Rincian Pendapatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((item, i=0) => (
                      <tr>
                        <td style={{ textAlign: "center" }}>{i + 1}</td>
                        <td>{filter==='Harian' && item.tanggalPendapatan}
                          {filter==='Bulanan' && (item.tanggalPendapatan_Month+"-"+item.tanggalPendapatan_Year)}
                          {filter==='Mingguan' && (item.tanggalPendapatan_Week+"-"+item.tanggalPendapatan_Year)}
                        </td>
                        <td><NumberFormat value={item.pendapatan} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
                        <td style={{ fontWeight: "500" }}><NumberFormat value={String(roundingFloat(item.bagiHasil.investor[email]))} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
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
                <div className="detail-investasi-small-card-value" style={{ fontSize: "25px" }}>
                  {<NumberFormat value={roundingFloat(pendapatan)} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />}
                </div>

                <hr/>

                <div className="detail-investasi-small-card-title">
                  Total Saham Dimiliki<br />
                </div>
                <div className="detail-investasi-small-card-value" style={{ fontSize: "25px" }}>
                  {data.nominal}%
                </div>
              </div>
            </div>
          </div>
      </div></>}

      {empty && <div style={{ paddingTop: "25px" }} className="owned-pengadaan-null-wrapper">
        <img src={emptyIcon} alt="empty data"></img>
        <h5 className="owned-pengadaan-null">Belum memiliki pendapatan</h5>
      </div>}
      <br />
      <div className="card-mainan-wrapper">
        { data.pengadaan && data.pengadaan.daftarMainan.map(mainan => (
            <CardMainan
              foto={mainan.mainan.gambarMainan}
              nama={mainan.stringMainan}
              detail={mainan.mainan.deskripsiMainan}
              rusak={mainan.status === 'RSK' }
              status={statusReadable(mainan.status)}
            />
        ))}
      </div>

      <div className="col-sm">
        {data.statusInvestasi === "DJL" && <>
          <p>Sedang dijual.</p>
          <button className="wkd-nav-button wkd-dark-green-button" onClick={() => handleCancel()}>Cancel Jual</button>
        </>}
        {!sellmode && data.statusInvestasi !== "DJL" && <button className="wkd-nav-button wkd-dark-green-button" onClick={() => setSellmode(true)}>Jual Investasi</button>}
        {sellmode && <>
          <p>Yakin menjual kepemilikan di perusahaan ini?</p>
          <br />
          <button className="wkd-nav-button wkd-light-tosca-button" onClick={() => setSellmode(false)}>Cancel</button>
          <button id="m-i-buat" className="wkd-nav-button wkd-dark-green-button" onClick={() => handleSubmit()}>Jual Saham</button>
        </>}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(DetailInvestasi);
