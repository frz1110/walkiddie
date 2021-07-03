import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import AlurPendaftaran from './pengadaan-mainan.svg';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import WalkiddieOnboarding from '../../components/OnBoarding/WalkiddieOnboarding';

const PengadaanMainanFirstPage = ({ daftarMainan, setState, formData, navigation }) => {
    const onBoardingSteps = [
        {
            content: <h5>Petunjuk pengadaan mainan</h5>,
            locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
            placement: 'center',
            target: 'body',
        },
        {
            content: 'Halaman ini adalah alur kedua yang harus ditempuh sebelum kamu dapat mengumpulkan modal pengadaan investasi.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#p-m-1-alur',
            title: 'Pengadaan Mainan',
        },
        {
            content: 'Kamu perlu memilih mainan apa yang ingin kamu adakan di toko yang kamu miliki.',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#p-m-1-katalog',
            title: 'Pengadaan Mainan',
        },
        {
            content: 'Jika sudah, tekan tombol "Selanjutnya"',
            placement: 'right',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#p-m-1-selanjutnya',
            title: 'Pengadaan Mainan',
        }
    ];

    const [checkedState, setCheckedState] = useState(
        new Array(100).fill(false)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        setState(updatedCheckedState);
    };

    console.log(checkedState);

    function stateMainan() {
        let state = false;
        for (let i = 0; i < checkedState.length; i++) {
            if (checkedState[i] === true) {
                state = true;
            }
        }

        if (state) {
            navigation.next()
        } else {
            alert("Anda belum memilih mainan")
        }
    }

    function countJumlahMainan() {
        let panjangData = 0;
        for (let i = 0; i < checkedState.length; i++) {
            if (checkedState[i] === true) {
                panjangData = panjangData + 1
            }
        }
        return panjangData;
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
                    <img id="p-m-1-alur" src={AlurPendaftaran} alt="Walkiddie Icon"></img>
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

                        <h3 className="midtext" ><span>Katalog Mainan</span></h3>

                        <div
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            <br></br>
                            <p>Pilih pengadaan mainan yang Anda inginkan!</p>

                            <CardColumns>
                            {daftarMainan.map(mainan => (
                                <Card className="card-flex-item2" 
                                    key={mainan.id}
                                    style={{
                                      height : '470px'
                                    }}
                                >
                                {/* <Card.Img variant="top" src={mainan.gambar_mainan} alt="https://i.stack.imgur.com/y9DpT.jpg" /> */}
                                <Card.Img className="card-pengadaan-img" variant="top" src={mainan.gambar_mainan}/>
                                <Card.Body>
                                    <Card.Title className="card-content-limit card-title">
                                    {mainan.nama_mainan}
                                    </Card.Title>
                                    <Card.Text className="card-content-limit card-text">
                                    <p>{mainan.deskripsi_mainan}</p>
                                    <h3>{mainan.harga}</h3>
                                    </Card.Text>
                                    <Form.Check 
                                        custom
                                        type='checkbox'
                                        id={mainan.id}
                                        // onChange={() => onChange(1)}
                                        // selected={selectedCheckboxes.includes(1)}
                                        checked={checkedState[(mainan.id)-1]}
                                        onChange={() => handleOnChange((mainan.id)-1)}
                                    />
                                </Card.Body>
                                </Card>
                            ))}

                            </CardColumns>
                        </div>
                        <div
                            style={{
                                float: 'right'
                            }}
                        >
                            <p>* Jumlah mainan : <b>{countJumlahMainan()} buah</b></p>
                            <button id="p-m-1-selanjutnya" className="wkd-nav-button wkd-dark-green-button" onClick={stateMainan}>Selanjutnya</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PengadaanMainanFirstPage;