import 'react-dates/initialize';
import './DaftarToko.css'
import { InputMap } from '../../components/Map/Map'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-dates/lib/css/_datepicker.css';
import AlurPendaftaran from './daftar-toko.svg';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import WalkiddieOnboarding from '../../components/OnBoarding/WalkiddieOnboarding';

const DaftarToko = ({ isAuthenticated, user }) => {
    const onBoardingSteps = [
        {
            content: <h5>Petunjuk pendaftaran toko</h5>,
            locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
            placement: 'center',
            target: 'body',
        },
        {
            content: 'Halaman ini adalah alur pertama yang harus ditempuh sebelum kamu dapat mengumpulkan modal pengadaan investasi.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#d-t-alur',
            title: 'Pendaftaran Toko',
        },
        {
            content: 'Kamu harus mendaftarkan toko yang kamu miliki terlebih dahulu.',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#d-t-title',
            title: 'Pendaftaran Toko',
        },
        {
            content: 'Isi semua data yang ada pada formulir.',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#d-t-form',
            title: 'Pendaftaran Toko',
        },
        {
            content: 'Jika sudah, tekan tombol "Simpan"',
            placement: 'right',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#d-t-simpan',
            title: 'Pendaftaran Toko',
        },
        {
            content: <h4>Selesai</h4>,
            placement: 'center',
            target: 'body',
        },
    ];

    const [formData, setFormData] = useState({
        namaToko: '',
        namaCabang: '',
        tipeUsaha: '',
        nomorTelepon: '',
        deskripsiToko: '',
        lokasiToko: '',
        daerah: '',
        latitude: -6.364520803098946,
        longitude: 106.82922538589406,
        mediaTokoList: []
    });

    const [mapData, setMapData] = useState({
        lat: 0,
        lng: 0,
        zoom: 15
    })

    const handleMapViewChange = e => setMapData({ ...mapData, lat: e.lat, long: e.lng });

    const {
        namaToko,
        namaCabang,
        tipeUsaha,
        nomorTelepon,
        deskripsiToko,
        lokasiToko,
        daerah,
        latitude,
        longitude,
        mediaTokoList
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleChangeFile = (event) => {
        setFormData({ ...formData, mediaTokoList: event.target.files });
    }

    const handleSubmit = e => {
        e.preventDefault();
        postDaftarToko();
    }

    const postDaftarToko = async () => {
        if (localStorage.getItem('access')) {
            console.log("inside if");
            var formDataToSend = new FormData();

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };

            formDataToSend.append('namaToko', namaToko);
            formDataToSend.append('namaCabang', namaCabang);
            formDataToSend.append('tipeUsaha', tipeUsaha);
            formDataToSend.append('nomorTelepon', nomorTelepon);
            formDataToSend.append('deskripsiToko', deskripsiToko);
            formDataToSend.append('daerah', daerah);
            formDataToSend.append('lokasiToko', lokasiToko);
            formDataToSend.append('longitude', longitude);
            formDataToSend.append('latitude', latitude);
            for (let i = 0; i < mediaTokoList.length; i++) {
                formDataToSend.append('fotoProfilToko', mediaTokoList[i], mediaTokoList[i].name);
            }
            await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, formDataToSend, config)
                .then((response) => {
                    console.log(response);
                    alert('Toko Anda telah ditambahkan');
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
                    alert("Terdapat kesalahan. Mohon refresh ulang halaman ini")
                });
        } else {
            console.log('missing token');
            alert('Terdapat kesalahan pada autentikasi akun anda. Anda dapat melakukan refresh pada halaman ini')
        }
    }

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Mitra") return <Redirect to="/" />

    return (
        <div>
            <WalkiddieOnboarding steps={onBoardingSteps} />

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
                    <img id="d-t-alur" src={AlurPendaftaran} alt="Walkiddie Icon"></img>
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
                        <h2 id="d-t-title"> Pendaftaran Toko </h2>
                        <p>Daftarkan toko anda dan raih keuntungannya</p>
                        <br></br>
                        <h3 className="midtext" ><span>Informasi Toko</span></h3>
                        <br></br>
                        <form id="d-t-form" className="centered" onSubmit={handleSubmit}>
                            <div className="justify-content-center">
                                <div className="form-group row">
                                    <label htmlFor='namaToko' className="col-sm-3 col-form-label"> <span className="required"> * </span> Nama Toko </label>
                                    <div className="col-sm-9">
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
                                    <label htmlFor='namaCabang' className="col-sm-3 col-form-label"> Nama Cabang (pilihan) :</label>
                                    <div className="col-sm-9">
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
                                    <label htmlFor='tipeUsaha' className="col-sm-3 col-form-label"> <span className="required"> * </span> Tipe Usaha :</label>
                                    <div className="col-sm-9">
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
                                    <label htmlFor='nomorTelepon' className="col-sm-3 col-form-label"> <span className="required"> * </span> Nomor Telepon :</label>
                                    <div className="col-sm-9">
                                        <input
                                            id='nomorTelepon'
                                            className='form-control'
                                            type="number" pattern="[0-9]*" inputMode="numeric"
                                            placeholder='Tuliskan nomor telepon toko'
                                            name='nomorTelepon'
                                            value={nomorTelepon}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor='deskripsiToko' className="col-sm-3 col-form-label"> <span className="required"> * </span> Deskripsi Toko :</label>
                                    <div className="col-sm-9">
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
                                    <label htmlFor='mediaToko' className="col-sm-3 col-form-label"> <span className="required"> * </span>Foto Profil Toko (unggah foto profil / logo toko):</label>
                                    <div className="col-sm-9">
                                        <input
                                            role="mediatoko"
                                            type="file"
                                            name="file"
                                            accept="video/*,image/*"
                                            onChange={e => handleChangeFile(e)}
                                            multiple />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor='daerah' className="col-sm-3 col-form-label"> <span className="required"> * </span> Daerah :</label>
                                    <div className="col-sm-9">
                                        <input
                                            id='daerah'
                                            className='form-control'
                                            type='text'
                                            placeholder='Tuliskan nama daerah (Contoh: Beji, Depok)  '
                                            name='daerah'
                                            value={daerah}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <InputMap
                                        // lat={mapData.lat}
                                        // lng={mapData.lng}
                                        onMapViewChange={e => handleMapViewChange(e)}
                                        // zoom={mapData.zoom}
                                        setLatitude={lat => setFormData(data => ({ ...data, latitude: lat }))}
                                        setLongitude={lng => setFormData(data => ({ ...data, longitude: lng }))}
                                        formData={mapData}
                                        setFormData={setMapData}
                                    />
                                </div>
                                <br />
                                <div className="form-group row">
                                    <label htmlFor='lokasiToko' className="col-sm-3 col-form-label"> <span className="required"> * </span> Lokasi Toko :</label>
                                    <div className="col-sm-9">
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
                            </div>
                            <div className="pull-right" style={{ marginTop: '100px' }}>
                                <button className="wkd-nav-button wkd-light-tosca-button daftar-toko-padding-button"><Link to="/masuk">Batal</Link></button>
                                <button id="d-t-simpan" className="wkd-nav-button wkd-dark-green-button daftar-toko-padding-button" type="submit">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(DaftarToko);
