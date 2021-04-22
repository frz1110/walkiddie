import './DaftarToko.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-google-flight-datepicker/dist/main.css';
import AlurPendaftaran from './daftar-toko.svg';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DaftarToko = () => {
    const [formData, setFormData] = useState({
        namaToko: '',
        namaCabang: '',
        tipeUsaha: '',
        nomorTelepon: '',
        deskripsiToko: '',
        lokasiToko: '',
        mediaToko: '',
        paketMainan: '',
        totalBiaya: '',
        periodePengadaan: '',
        estimasiKeuangan: ''
    });

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }

    const { 
        namaToko, 
        namaCabang, 
        tipeUsaha, 
        nomorTelepon, 
        deskripsiToko, 
        lokasiToko, 
        mediaToko, 
        paketMainan, 
        totalBiaya, 
        periodePengadaan,
        estimasiKeuangan 
    } = formData;

    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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
                    borderRadius:'7px'
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
                        <form className="centered">
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
                                                type='text'
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
                                <br></br>
                                <h3 className="midtext" ><span>Informasi Pengadaan</span></h3>
                                <br></br>
                                <div className="form-group row">
                                    <label for='paketMainan' class="col-sm-3 col-form-label"> <span class="required"> * </span> Paket Mainan :</label>
                                    <div class="col-sm-9">
                                        <select class="custom-select paketMainan" id="paketMainan">
                                            <option selected>Paket A (2 kiddie ride + 1 claw machine)</option>
                                            <option value="1">Paket B (2 kiddie ride )</option>
                                            <option value="2">Paket C ( kiddie ride + 1 claw machine)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='totalBiaya' class="col-sm-3 col-form-label"> Total Biaya pengadaan :</label>
                                    <div class="col-sm-9">
                                    <input class="form-control" id="totalBiaya" type="text" placeholder="Rp 1.000.000" disabled/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='periodePengadaan' class="col-sm-3 col-form-label"> <span class="required"> * </span> Periode pengadaan :</label>
                                    <div class="col-sm-9">
                                        {/* <RangeDatePicker
                                            startDate={new Date()}
                                            endDate={new Date()}
                                            // onChange={(startDate, endDate) => onDateChange(startDate, endDate)}
                                            minDate={new Date(1900, 1, 1)}
                                            maxDate={new Date(2100, 1, 1)}
                                            dateFormat="D MMM YYYY"
                                            startDatePlaceholder="Start Date"
                                            endDatePlaceholder="End Date"
                                            disabled={false}
                                            className="my-own-class-name"
                                            startWeekDay="monday"
                                        /> */}
                                        {/* <DatePicker selected={tanggalMulai} onChange={date => setStartDate(date)} />    
                                    </div>
                                    <div class="col-sm-2"> 
                                        <DatePicker selected={tanggalSelesai} onChange={date => setCurrentDate(date)} /> */}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for='estimasiKeuangan' class="col-sm-3 col-form-label"> <span class="required"> * </span> Estimasi Keuangan: :</label>
                                    <div class="col-sm-9">
                                            <textarea
                                                id='estimasiKeuangan'
                                                className='form-control'
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
 
export default DaftarToko;