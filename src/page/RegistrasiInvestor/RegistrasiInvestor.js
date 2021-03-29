import './RegistrasiInvestor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';

const RegistrasiInvestor = ({ signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async e => {
        e.preventDefault();

        if (password === re_password) {
            const res = await signup(first_name, last_name, email, password, re_password);
            // console.log(res.signup)
            if (res.signup){
                return <Redirect to='/masuk' />
            }
            else {
                alert('Email yang anda masukan telah terdaftar')
            }
        } else{
            alert("Password anda harus sama")
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div>
        <h1><h1 class="arrow left"></h1>Buat Akun Baru Investor</h1>
        <div className="square-box">
            <Row className="justify-content-center">
                <button className="submit-button google-button"type="button"> 
                <img className="google-image" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="Google.png"/>
                    Daftar dengan Google
                </button>
            </Row>
            <br></br>
            <p className="midtext"><span>Atau Buat Akun</span></p>
            <br></br>
            <form className="centered" onSubmit={e => onSubmit(e)}>
                <Row className="justify-content-center">
                    <div className="col-sm">
                        <div className="form-container centered">
                            <label for='nama-depan'> Nama Depan </label>
                            <br></br>
                            <input
                                id='nama-depan'
                                className='form-control'
                                type='text'
                                placeholder='Tuliskan Nama Depan'
                                name='first_name'
                                value={first_name}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-container centered">                          
                            <label for='nama-belakang'> Nama Belakang </label>
                            <br></br>
                            <input
                                id='nama-belakang'
                                className='form-control'
                                type='text'
                                placeholder='Tuliskan Nama Belakang'
                                name='last_name'
                                value={last_name}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <div className="col-sm">
                        <div className="form-container centered">
                            <label for='email'> Email </label>
                            <br></br>
                            <input
                                id='email'
                                className='form-control'
                                type='email'
                                placeholder='Contoh : akun@walkiddie.com'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-container centered">                          
                            <label>  </label>
                            <br></br>
                        </div>
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <div className="col-sm">
                        <div className="form-container centered">
                            <label for='i_password'> Kata Sandi </label>
                            <br></br>
                            <input 
                                id='i_password'
                                className='form-control'
                                type='password'
                                placeholder='Masukkan kata sandi'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-container centered">                          
                            <label>  </label>
                            <br></br>
                        </div>
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <div className="col-sm">
                        <div className="form-container centered">
                            <label for="re_password"> Konfirmasi kata sandi </label>
                            <br></br>
                            <input
                                id='re_password'
                                className='form-control'
                                type='password'
                                placeholder='Masukkan ulang kata sandi'
                                name='re_password'
                                value={re_password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                            />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-container centered">                          
                            <label>  </label>
                            <br></br>
                        </div>
                    </div>
                </Row>
                <br></br>
                <Row className="justify-content-center">
                    <button className="submit-button button"type="submit"> 
                        Buat Akun
                    </button>
                </Row>
                <Row className="justify-content-center">
                    <p>Sudah punya akun? <Link to='/masuk'>Masuk disini</Link></p>
                </Row>
            </form>
        </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
}); 

export default connect(mapStateToProps, { signup })(RegistrasiInvestor);
