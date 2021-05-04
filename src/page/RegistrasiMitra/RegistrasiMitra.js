import './RegistrasiMitra.css';
import '../../components/Form/LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { signupMitra } from '../../actions/auth';

const RegistrasiMitra = ({ signupMitra, isAuthenticated })=> {
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
            const res = await signupMitra(first_name, last_name, email, password, re_password);
            if(check(first_name,password) || check(last_name,password) || check(email,password) 
                || check (password,first_name) || check(password,last_name) || check(password,email)){
                alert('Password yang anda masukan terlalu mirip dengan email maupun nama anda')
            }else {
                if (res.signup){
                    alert('Anda bisa mengecek email anda untuk link aktivasi akun')
                    return <Redirect to='/masuk' />
                }
                else {
                    alert('Email yang anda masukan telah terdaftar')
                }
            }
        } else{
            alert("Password anda harus sama")
        }
    };

    function check(use,pwd){
        return pwd.match(/[a-z]+/ig).filter(a=> a.length > 2 && use.includes(a)).length > 0? true:false;
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    // const continueWithGoogle = async () => {
    //     try {
    //         // const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:3000`)
    //         const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/auth/o/google-oauth2/?redirect_uri=https://walkiddie-toys-dev.herokuapp.com`)

    //         window.location.replace(res.data.authorization_url);
    //     } catch (err) {

    //     }
    // };

    return (
        <div id="signup">
            <h1>&lt; Buat Akun Baru <span id="walkiddie">Mitra</span></h1>
            <div className="square-box">
                <Row className="justify-content-center">
                    <button className="submit-button google-button" type="button"> 
                    <img className="google-image" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="Google.png"/>
                    <span>
                        Daftar dengan Google
                    </span>
                    </button>
                </Row>
                <br></br>
                <div id="atau">
                    <p className="midtext" ><span>Atau Buat Akun</span></p>
                </div>
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

export default connect(mapStateToProps, { signupMitra })(RegistrasiMitra);
