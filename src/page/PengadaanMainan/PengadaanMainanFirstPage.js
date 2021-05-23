import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import AlurPendaftaran from './pengadaan-mainan.svg';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'


const PengadaanMainanFirstPage = ({ setFormData, navigation }) => {
    const { next } = navigation;
    const [selectedForm ,setSelected] = useState({
        selectedCheckboxes: []
    });
    
    const { selectedCheckboxes } = selectedForm

    const onChange = id => {
        const { selectedCheckboxes } = selectedForm

        // Find index
        const findIdx = selectedCheckboxes.indexOf(id);
    
        // Index > -1 means that the item exists and that the checkbox is checked
        // and in that case we want to remove it from the array and uncheck it
        if (findIdx > -1) {
            selectedCheckboxes.splice(findIdx, 1);
        } else {
            selectedCheckboxes.push(id);
        }

        setSelected({
            selectedCheckboxes: selectedCheckboxes
        });

        setFormData({
            paketMainan: selectedCheckboxes
        })
    }

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
                            {/* {posts.map(post => ( */}
                                <Card className="card-flex-item2" 
                                    // key={post.id}
                                >
                                <Card.Img variant="top" src="https://i.stack.imgur.com/y9DpT.jpg" />
                                <Card.Body>
                                    <Card.Title className="card-content-limit card-title">
                                    {/* {post.title} */}
                                    Spongebob Cart
                                    </Card.Title>
                                    <Card.Text className="card-content-limit card-text">
                                    {/* {post.body} */}
                                    Bodyy
                                    </Card.Text>
                                    <Form.Check 
                                        custom
                                        type='checkbox'
                                        id={1}
                                        onChange={() => onChange(1)}
                                        selected={selectedCheckboxes.includes(1)}
                                        // onChange={() => onChange(id)}
                                        // selected={selectedCheckboxes.includes(id)}
                                    />
                                </Card.Body>
                                </Card>
                            {/* ))} */}

                                <Card className="card-flex-item2" 
                                    // key={post.id}
                                >
                                <Card.Img variant="top" src="https://i.stack.imgur.com/y9DpT.jpg" />
                                <Card.Body>
                                    <Card.Title className="card-content-limit card-title">
                                    {/* {post.title} */}
                                    Spongebob Cart
                                    </Card.Title>
                                    <Card.Text className="card-content-limit card-text">
                                    {/* {post.body} */}
                                    Bodyy
                                    </Card.Text>
                                    <Form.Check 
                                        custom
                                        type='checkbox'
                                        id={2}
                                        onChange={() => onChange(2)}
                                        selected={selectedCheckboxes.includes(2)}
                                    />
                                </Card.Body>
                                </Card>

                                <Card className="card-flex-item2" 
                                    // key={post.id}
                                >
                                <Card.Img variant="top" src="https://i.stack.imgur.com/y9DpT.jpg" />
                                <Card.Body>
                                    <Card.Title className="card-content-limit card-title">
                                    {/* {post.title} */}
                                    Spongebob Cart
                                    </Card.Title>
                                    <Card.Text className="card-content-limit card-text">
                                    {/* {post.body} */}
                                    Bodyy
                                    </Card.Text>
                                    <Form.Check 
                                        custom
                                        type='checkbox'
                                        id={3}
                                        onChange={() => onChange(3)}
                                        selected={selectedCheckboxes.includes(3)}
                                    />
                                </Card.Body>
                                </Card>
                                
                            </CardColumns>
                        </div>
                        <div
                        style={{
                            float:'right'
                        }}
                        >
                            <p>* Jumlah mainan : <b>{selectedCheckboxes.length} buah</b></p>
                            <button className="wkd-nav-button wkd-dark-green-button" onClick={next}>Selanjutnya</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PengadaanMainanFirstPage;