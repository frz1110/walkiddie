import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Link, Redirect } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import 'react-calendar/dist/Calendar.css';
import 'react-dates/lib/css/_datepicker.css';
import AlurPendaftaran from './pengadaan-mainan.svg';
import Minus from './minus.svg'
import Plus from './plus.svg'
import TempatSampah from './tempat-sampah.svg'
import axios from 'axios';
import WalkiddieOnboarding from '../../components/OnBoarding/WalkiddieOnboarding';

const PengadaanMainanSecondPage = ({ daftarMainan, daftarToko, formData, setFormData, totalBiayaMainan, setTotalBiayaMainan, navigation }) => {
    const onBoardingSteps = [
        {
            content: <h5>Petunjuk pengadaan mainan (2)</h5>,
            locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
            placement: 'center',
            target: 'body',
        },
        {
            content: 'Ringkasan mainan dapat dilihat di sini. Jumlah mainan dapat ditambah atau dikurangi.',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#p-m-2-ringkasan',
            title: 'Pengadaan Mainan (2)',
        },
        {
            content: 'Isi semua data yang diperlukan.',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#p-m-2-form',
            title: 'Pengadaan Mainan (2)',
        },
        {
            content: 'Jika sudah, tekan tombol "Simpan"',
            placement: 'right',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#p-m-2-simpan',
            title: 'Pengadaan Mainan (2)',
        },
        {
            content: <h4>Selesai</h4>,
            placement: 'center',
            target: 'body',
        },
    ];

    const { previous } = navigation;
    const [requestSent, setRequestSent] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [countPaket, setCountPaket] = useState(new Array(25).fill({ value: 1 }));

    console.log(formData.paketMainan);

    const updatePaketMainan = () => {
        let semuaMainan = [];
        for (let i = 0; i < daftarMainan.length; i++) {
            if (formData['selectedCheckboxes'][i] === true && countPaket[i].value > 0) {
                semuaMainan.push({ 'mainan': daftarMainan[i].id, 'kuantitas': countPaket[i].value })
            }
        }
        console.log(semuaMainan);
        setFormData({ ...formData, paketMainan: semuaMainan });
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        console.log(startDate);
        console.log(endDate);
        if (startDate !== null && endDate !== null) {
            setFormData({
                ...formData,
                periodePengadaanMulai: startDate.format("YYYY-MM-DD"),
                periodePengadaanAkhir: endDate.format("YYYY-MM-DD")
            })
        } else {
            console.log("Tanggal Yang Anda masukan error")
        }
    };

    const handleChangeFile = (event) => {
        setFormData({ ...formData, mediaTokoList: event.target.files });
    }

    const updateCountMainan = (id, count) => {
        console.log(countPaket);
        setCountPaket([
            ...countPaket.slice(0, id),
            { value: count },
            ...countPaket.slice(id + 1)
        ]);
        console.log(countPaket);
        updatePaketMainan();
    }
    console.log(countPaket);

    const hapus = (id, hargaMainan) => {
        updateCountMainan(id - 1, 0);
        setTotalBiayaMainan(hargaMainan * 0, id - 1);
        let totalSemuaBiaya = 0;
        let response;
        for (let i = 0; i < totalBiayaMainan.length; i++) {
            if (formData['selectedCheckboxes'][i] === true) {
                response = totalBiayaMainan[i];
                totalSemuaBiaya += response.value;
            }
        }
        setFormData({
            ...formData,
            selectedCheckboxes: [
                ...formData['selectedCheckboxes'].slice(0, id - 1),
                false,
                ...formData['selectedCheckboxes'].slice(id)
            ]
            , totalBiaya: totalSemuaBiaya
        });
        console.log(countPaket);
        console.log(totalBiayaMainan);
    }

    const plus = (id, hargaMainan) => {
        updateCountMainan(id - 1, countPaket[id - 1].value + 1);
        setTotalBiayaMainan(hargaMainan * (countPaket[id - 1].value + 1), id - 1);

        let totalSemuaBiaya = 0;
        let response;
        for (let i = 0; i < totalBiayaMainan.length; i++) {
            if (formData['selectedCheckboxes'][i] === true) {
                response = totalBiayaMainan[i];
                totalSemuaBiaya += response.value;
            }
        }
        setFormData({ ...formData, totalBiaya: totalSemuaBiaya });
        console.log(totalSemuaBiaya);
        console.log(countPaket);
        console.log(totalBiayaMainan);
    }

    const minus = (id, hargaMainan) => {
        updateCountMainan(id - 1, countPaket[id - 1].value - 1);
        setTotalBiayaMainan(hargaMainan * (countPaket[id - 1].value - 1), id - 1);

        let totalSemuaBiaya = 0;
        let response;
        for (let i = 0; i < totalBiayaMainan.length; i++) {
            if (formData['selectedCheckboxes'][i] === true) {
                response = totalBiayaMainan[i];
                totalSemuaBiaya += response.value;
            }
        }
        setFormData({ ...formData, totalBiaya: totalSemuaBiaya });
        console.log(totalSemuaBiaya);
        console.log(countPaket);
        console.log(totalBiayaMainan);
    }

    const handleChange = async (e) => {
        setFormData({ ...formData, pkToko: e.value });

        console.log(formData);
        console.log(e.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        postPengadaanMainan();
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    useEffect(() => {
        updatePaketMainan();
    }, [countPaket]);

    

    useEffect(() => {
        if(!formData['paketMainan']) {
            updatePaketMainan();
        }

        if(!formData['totalBiaya']) {
            let totalSemuaBiaya = 0;
            let response;
            for (let i = 0; i < totalBiayaMainan.length; i++) {
                if (formData['selectedCheckboxes'][i] === true){
                    response = totalBiayaMainan[i];
                    totalSemuaBiaya += response.value;
                }
            }
            setFormData({ ...formData, totalBiaya: totalSemuaBiaya })
        }
    }, [requestSent]);

    const postPengadaanMainan = () => {
        let semuaMainan = [];
        for (let i = 0; i < daftarMainan.length; i++) {
            if (formData['selectedCheckboxes'][(daftarMainan[i].id) - 1] === true && countPaket[daftarMainan[i].id - 1].value > 0) {
                semuaMainan.push({ 'mainan': daftarMainan[i].id, 'kuantitas': countPaket[daftarMainan[i].id - 1].value })
            }
        }
        setFormData({ ...formData, paketMainan: semuaMainan });

        if (localStorage.getItem('access')) {
            updatePaketMainan();

            var formDataToSend = new FormData();

            formDataToSend.append('toko', formData['pkToko']);
            formDataToSend.append('daftar_mainan', JSON.stringify(formData['paketMainan']));
            console.log(formDataToSend.get('daftar_mainan'))
            for (let i = 0; i < formData['mediaTokoList'].length; i++) {
                formDataToSend.append('media_pengadaan', formData['mediaTokoList'][i], formData['mediaTokoList'][i].name);
            }
            formDataToSend.append('totalBiaya', formData['totalBiaya']);
            formDataToSend.append('periodePengadaanMulai', formData['periodePengadaanMulai']);
            formDataToSend.append('periodePengadaanAkhir', formData['periodePengadaanAkhir']);
            formDataToSend.append('estimasiKeuangan', formData['estimasiKeuangan']);

            for (var pair of formDataToSend.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, formDataToSend, config)
                .then((response) => {
                    console.log(response);
                    console.log('Success post');
                    alert('Anda telah memasukan pengadaan mainan');
                    setRequestSent(true);
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
                    alert("Terdapat kesalahan. Mohon refresh ulang halaman ini dan perbaiki pengadaan Anda.")
                });
        } else {
            console.log('missing token');
            alert('Terdapat kesalahan pada autentikasi akun anda. Anda dapat melakukan refresh pada halaman ini')
        }
    }

    if (requestSent === true) {
        return <Redirect to="/verif-pengadaan" />
    }

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
                        <h2> Pengadaan Mainan </h2>
                        <p>Buat pengadaan dan raih keuntungannya.</p>
                        <br></br>
                        <form className="centered" onSubmit={handleSubmit}>
                            <div className="justify-content-center">
                                <div id="p-m-2-ringkasan">
                                <h3 className="midtext" ><span>Ringkasan Mainan</span></h3>
                                <br></br>

                                {daftarMainan.map(mainan => {
                                    return formData['selectedCheckboxes'][(mainan.id) - 1] === true && countPaket[(mainan.id) - 1].value > 0
                                        ? (<div className="profile-details-wrapper flex-wrapper">
                                            <img src={TempatSampah} onClick={() => hapus(mainan.id, mainan.harga)} alt="Delete Icon"></img>
                                            <div className="vertical-line-pengadaan-mainan"></div>
                                            <img src={mainan.gambar_mainan} className="review-pengadaan-mainan"
                                                style={{
                                                    width: "180px",
                                                    height: "100px"
                                                }}
                                            ></img>
                                            {/* <img src={mainan.gambar_mainan} className="review-pengadaan-mainan"></img> */}
                                            <div className="profile-details" id="desc">
                                                <h4>{mainan.nama_mainan}</h4>
                                                <p>{mainan.harga}</p>
                                            </div>
                                            <div className="profile-details">

                                                <img onClick={() => minus(mainan.id, mainan.harga)} className="icon" src={Minus}></img>
                                                {countPaket[mainan.id - 1].value}
                                                <img onClick={() => plus(mainan.id, mainan.harga)} className="icon" src={Plus}></img>
                                            </div>
                                            <div className="profile-details">
                                                <h3>{totalBiayaMainan[mainan.id - 1].value}</h3>
                                            </div>
                                        </div>) : null;
                                })};
                                </div>
                                
                                <div id="p-m-2-form">
                                <h3 className="midtext" ><span>Informasi Pengadaan</span></h3>
                                <br></br>
                                <div className="form-group row">
                                    <label htmlFor='namaToko' className="col-sm-3 col-form-label"> <span className="required"> * </span> Nama Toko :</label>
                                    <div className="col-sm-9" data-testid="select-nama-toko">
                                        <Select
                                            id="namaToko"
                                            role="namaToko"
                                            class="form-control"
                                            placeholder="Pilih toko"
                                            options={daftarToko}
                                            onChange={e => handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor='mediaToko' className="col-sm-3 col-form-label"> <span className="required"> * </span>Foto/Video Toko (tampak depan/tampak belakang/video singkat):</label>
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
                                    <label htmlFor='totalBiaya' className="col-sm-3 col-form-label"> Total Biaya pengadaan :</label>
                                    <div className="col-sm-9">
                                        <input 
                                            className="form-control" 
                                            id="totalBiaya" 
                                            type="text" 
                                            placeholder={"Rp"+formData['totalBiaya'].toLocaleString()} 
                                            disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor='periodePengadaan' className="col-sm-3 col-form-label"> <span className="required"> * </span> Periode pengadaan :</label>
                                    <div className="col-sm-9">
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
                                            onFocusChange={focusedInputParam => setFocusedInput(focusedInputParam)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor='estimasiKeuangan' className="col-sm-3 col-form-label"> <span className="required"> * </span> Estimasi Keuangan :</label>
                                    <div className="col-sm-9">
                                        <textarea
                                            id='estimasiKeuangan'
                                            type='text'
                                            rows='3'
                                            placeholder='Jelaskan mekanisme ROI, Payback period, BEP, dan lain sebagainya'
                                            name='estimasiKeuangan'
                                            value={formData['estimasiKeuangan']}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                        </div>
                            </div>
                            <div 
                            style={{
                                float:'right'
                            }}
                            >   
                                <button className="wkd-home-button wkd-nav-button wkd-tosca-button daftar-toko-padding-button" onClick={previous}>Sebelumnya</button>
                                <button id="p-m-2-simpan" className="wkd-home-button wkd-nav-button wkd-dark-green-button daftar-toko-padding-button"  type="submit">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PengadaanMainanSecondPage;
