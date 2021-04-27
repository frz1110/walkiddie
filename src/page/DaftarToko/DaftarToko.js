import 'react-dates/initialize';
import './DaftarToko.css'
import WalkiddieGoogleMaps from './WalkiddieGoogleMaps.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DateRangePicker } from 'react-dates';
import 'react-calendar/dist/Calendar.css';
import 'react-dates/lib/css/_datepicker.css';
import AlurPendaftaran from './daftar-toko.svg';
import React, { useState } from 'react';
import Select from 'react-select';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const DaftarToko = ({ isAuthenticated }) => {

    const [formData, setFormData] = useState({
        namaToko: '',
        namaCabang: '',
        tipeUsaha: '',
        nomorTelepon: '',
        deskripsiToko: '',
        lokasiToko: '',
        latitude: -6.364520803098946,
        longitude: 106.82922538589406,
        mediaTokoList: [],
        paketMainan: '',
        totalBiaya: '',
        periodePengadaanMulai: '',
        periodePengadaanAkhir: '',
        estimasiKeuangan: ''
    });

    const {
        namaToko,
        namaCabang,
        tipeUsaha,
        nomorTelepon,
        deskripsiToko,
        lokasiToko,
        latitude,
        longitude,
        mediaTokoList,
        paketMainan,
        totalBiaya,
        periodePengadaanMulai,
        periodePengadaanAkhir,
        estimasiKeuangan
    } = formData;

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    let file = '';

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        console.log("startDate");
        console.log(startDate);
        setEndDate(endDate);
        console.log("endDate")
        console.log(endDate)
        if (startDate !== null && endDate !== null) {
            setFormData({
                ...formData, 
                periodePengadaanMulai: startDate.format("YYYY-MM-DD"), 
                periodePengadaanAkhir: endDate.format("YYYY-MM-DD")
            })
            console.log("startDate.format(YYYY-MM-DD)");
            console.log(startDate.format("YYYY-MM-DD"));
            console.log(endDate.format("YYYY-MM-DD"))
        }
    };

    const handleChangeFile = (event) => {
        setFormData({ ...formData, mediaTokoList: event.target.files });
    }

    const dataPilihanMainan = [
        {
          value: "PaketA",
          label: "Paket A (2 kiddie ride + 1 claw machine)"
        },
        {
          value: "PaketB",
          label: "Paket B (2 kiddie ride )"
        },
        {
          value: "PaketC",
          label: "Paket C (1 kiddie ride + 1 claw machine)"
        }
      ];
     
      const [selectedValue, setSelectedValue] = useState("PaketA");
     
      const handleChange = e => {
        setSelectedValue(e.value);
        if (e.value === "PaketA"){
            setFormData({...formData, totalBiaya:1000000, paketMainan: e.value})
        }else if (e.value === "PaketB"){
            setFormData({...formData, totalBiaya:900000, paketMainan: e.value})
        }else {
            setFormData({...formData, totalBiaya:800000, paketMainan: e.value})
        }
      }

    const handleSubmit = e => {
        // e.preventDefault();
        <Redirect to="/" />
        postDaftarToko();
    }

    const postDaftarToko = () => {
        if (localStorage.getItem('access')) {
            console.log("inside if");
            var formDataToSend = new FormData();

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };

            console.log("paketMainan " + paketMainan);
            console.log("totalBiaya " + totalBiaya);
            console.log("startDate " + startDate);
            console.log("endDate " + endDate);

            formDataToSend.append('namaToko', namaToko);
            formDataToSend.append('namaCabang', namaCabang);
            formDataToSend.append('tipeUsaha', tipeUsaha);
            formDataToSend.append('nomorTelepon', nomorTelepon);
            formDataToSend.append('deskripsiToko', deskripsiToko);
            formDataToSend.append('lokasiToko', lokasiToko);
            formDataToSend.append('longitude', longitude);
            formDataToSend.append('latitude', latitude);
            formDataToSend.append('paketMainan', paketMainan);
            for (let file of mediaTokoList) {
                console.log(file);
                formDataToSend.append('mediaToko', file);
            }
            formDataToSend.append('totalBiaya', totalBiaya);
            formDataToSend.append('periodePengadaanMulai', periodePengadaanMulai);
            formDataToSend.append('periodePengadaanAkhir', periodePengadaanAkhir);
            formDataToSend.append('estimasiKeuangan', estimasiKeuangan);


            try {
                axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, formDataToSend, config)
                    .then((response) => {
                        console.log(response);
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
                    });
                console.log('Success post');
            } catch (err) {
                console.log('Error post');
            }
        } else {
            console.log('missing token');
        }
    }

    if (!isAuthenticated) return <Redirect to="/masuk" />

    return (
        <div>
            <div className="wkd-home-sect-2-bg"
                style={{
                    height: '400px',
                    maxWidth: '1500px'
                }}
            >
                <div className="wkd-home-sect-2-container"
                    style={{
                        marginBottom: '100px'
                    }}
                >
                    <img src={AlurPendaftaran} alt="Walkiddie Icon"></img>
                </div>
            </div>


            <div className="wkd-home-sect-3-container">
                <div className="wkd-home-banner-card"
                    style={{
                        borderRadius: '7px'
                    }}
                >
                    <div
                        style={{
                            textAlign: 'left'
                        }}>
                        <h2> Pendaftaran Toko </h2>
                        <p>Daftarkan toko anda dan raih keuntungannya</p>
                        <br></br>
                        <h3 className="midtext" ><span>Informasi Toko</span></h3>
                        <br></br>
                        <form className="centered" onSubmit={handleSubmit}>
                            <div className="justify-content-center">
                                <div className="form-group row">
                                    <label for='namaToko' class="col-sm-3 col-form-label"> <span class="required"> * </span> Nama Toko </label>
                                    <div class="col-sm-9">
                                        <input
                                            id='namaToko'
                                            className='form-control'
                                            type='text'
                                            placeholder='Tuliskan Nama Toko'
                                            name='namaToko'
                                            value={namaToko}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='namaCabang' class="col-sm-3 col-form-label"> Nama Cabang (pilihan) :</label>
                                    <div class="col-sm-9">
                                        <input
                                            id='namaCabang'
                                            className='form-control'
                                            type='text'
                                            placeholder='Tuliskan nama cabang (jika memiliki lebih dari satu outlet)'
                                            name='namaCabang'
                                            value={namaCabang}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='tipeUsaha' class="col-sm-3 col-form-label"> <span class="required"> * </span> Tipe Usaha :</label>
                                    <div class="col-sm-9">
                                        <input
                                            id='tipeUsaha'
                                            className='form-control'
                                            type='text'
                                            placeholder='Tuliskan nama usaha (Contoh: Restoran, toko baju, dll.)  '
                                            name='tipeUsaha'
                                            value={tipeUsaha}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='nomorTelepon' class="col-sm-3 col-form-label"> <span class="required"> * </span> Nomor Telepon :</label>
                                    <div class="col-sm-9">
                                            <input
                                                id='nomorTelepon'
                                                className='form-control'
                                                type="number" pattern="[0-9]*" inputmode="numeric"
                                                placeholder='Tuliskan nomor telepon toko'
                                                name='nomorTelepon'
                                                value={nomorTelepon}
                                                onChange={e => onChange(e)}
                                                required
                                            />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='deskripsiToko' class="col-sm-3 col-form-label"> <span class="required"> * </span> Deskripsi Toko :</label>
                                    <div class="col-sm-9">
                                        <textarea
                                            id='deskripsiToko'
                                            className='form-control'
                                            type='text'
                                            rows='4'
                                            placeholder='Tuliskan deskripsi singkat toko'
                                            name='deskripsiToko'
                                            value={deskripsiToko}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='lokasiToko' class="col-sm-3 col-form-label"> <span class="required"> * </span>Foto/Video Toko (tampak depan/tampak belakang/video):</label>
                                    <div class="col-sm-9">
                                        <input  
                                        type="file" 
                                        name="file" 
                                        accept="video/*,image/*" 
                                        onChange={e => handleChangeFile(e)} 
                                        ref={(input) => { file = input; }} multiple />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='lokasiToko' class="col-sm-3 col-form-label"> <span class="required"> * </span> Lokasi Toko :</label>
                                    <div class="col-sm-9">
                                        <textarea
                                            id='lokasiToko'
                                            className='form-control'
                                            type='text'
                                            rows='3'
                                            placeholder='Tuliskan alamat lengkap toko'
                                            name='lokasiToko'
                                            value={lokasiToko}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <WalkiddieGoogleMaps>

                                    </WalkiddieGoogleMaps>
                                </div>
                                <br></br>
                                <h3 className="midtext" ><span>Informasi Pengadaan</span></h3>
                                <br></br>
                                <div className="form-group row">
                                    <label for='paketMainan' class="col-sm-3 col-form-label"> <span class="required"> * </span> Paket Mainan :</label>
                                    <div class="col-sm-9">
                                        <Select 
                                        class="form-control"
                                        placeholder="Pilih paket Mainan"
                                        // value={dataPilihanMainan.find(obj => obj.value === selectedValue)}
                                        options={dataPilihanMainan}
                                        onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='totalBiaya' class="col-sm-3 col-form-label"> Total Biaya pengadaan :</label>
                                    <div class="col-sm-9">
                                    <input class="form-control" id="totalBiaya" type="text" placeholder={totalBiaya} disabled/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='periodePengadaan' class="col-sm-3 col-form-label"> <span class="required"> * </span> Periode pengadaan :</label>
                                    <div class="col-sm-9">
                                        <DateRangePicker
                                            startDate={startDate}
                                            startDateId="tata-start-date"
                                            endDate={endDate}
                                            endDateId="tata-end-date"
                                            startDatePlaceholderText="Tanggal Mulai Pengadaan"
                                            endDatePlaceholderText="Tanggal Akhir Pengadaan"
                                            onDatesChange={handleDatesChange}
                                            focusedInput={focusedInput}
                                            displayFormat={() => "DD/MM/YYYY"}
                                            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='estimasiKeuangan' class="col-sm-3 col-form-label"> <span class="required"> * </span> Estimasi Keuangan: :</label>
                                    <div class="col-sm-9">
                                            <textarea
                                                id='estimasiKeuangan'
                                                type='text'
                                                rows='3'
                                                placeholder='Jelaskan mekanisme ROI, Payback period, BEP, dan lain sebagainya'
                                                name='estimasiKeuangan'
                                                value={estimasiKeuangan}
                                                onChange={e => onChange(e)}
                                                required
                                            />
                                    </div>
                                </div>
                            </div>
                            <div class="pull-right">
                                <button className="wkd-nav-button wkd-light-tosca-button"><Link to="/masuk">Batal</Link></button>
                                <button className="wkd-nav-button wkd-dark-green-button" type="submit">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(DaftarToko);
