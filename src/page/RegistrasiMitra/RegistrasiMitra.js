import '../RegistrasiInvestor/RegistrasiInvestor.css';
import '../../components/Form/LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { signupMitra } from '../../actions/auth';
import { ChevronLeft } from 'react-feather';
import loadingIcon from '../../media/loading-icon.jpg';

const RegistrasiMitra = ({ signupMitra, isAuthenticated })=> {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });
    const [loading, setLoading] = useState(false);

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async e => {
        e.preventDefault();

        if (password === re_password) {
            setLoading(true);
            const res = await signupMitra(first_name, last_name, email, password, re_password);
            if(check(first_name,password) || check(last_name,password) || check(email,password) 
                || check (password,first_name) || check(password,last_name) || check(password,email)){
                alert('Password yang anda masukan terlalu mirip dengan email maupun nama anda')
            }else {
                if (res.signup){
                    setLoading(false);
                    alert('Anda bisa mengecek email anda untuk link aktivasi akun')
                    return <Redirect to='/masuk' />
                }
                else {
                    setLoading(false);
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
        <div id="regist-invest-signup">
            <h3 className="regist-invest-title" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left"/>Buat Akun Baru <span style={{ color: "#146A5F" }}>Mitra</span></h3>
            {loading && <img src={loadingIcon} id="loading-icon" alt="loading..." />}
            <div className="regist-invest-square-box">
                <Row className="justify-content-center">
                    <button className="submit-button regist-invest-google-button" type="button"> 
                    <img className="regist-invest-google-image" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google.png"/>
                    <span style={{ marginLeft: "35px" }}>
                        Daftar dengan Google
                    </span>
                    </button>
                </Row>
                <br></br>
                <div id="atau">
                    <p className="regist-midtext" ><span>Atau Buat Akun</span></p>
                </div>
                <form className="regist-centered" onSubmit={e => onSubmit(e)}>
                    <Row className="justify-content-center">
                        <div className="col-sm">
                            <div className="regist-invest-form-container">
                                <label for='nama-depan'> Nama Depan </label>
                                <br></br>
                                <input
                                    id='nama-depan'
                                    type='text'
                                    placeholder='Tuliskan nama depan...'
                                    name='first_name'
                                    value={first_name}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="regist-invest-form-container">                          
                                <label for='nama-belakang'> Nama Belakang </label>
                                <br></br>
                                <input
                                    id='nama-belakang'
                                    type='text'
                                    placeholder='Tuliskan nama belakang...'
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
                            <div className="regist-invest-form-container">
                                <label for='email'> Email </label>
                                <br></br>
                                <input
                                    id='email'
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
                            <div className="regist-invest-form-container">                          
                                <label>  </label>
                                <br></br>
                            </div>
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="col-sm">
                            <div className="regist-invest-form-container">
                                <label for='i_password'> Kata Sandi </label>
                                <br></br>
                                <input 
                                    id='i_password'
                                    type='password'
                                    placeholder='Masukkan kata sandi...'
                                    name='password'
                                    value={password}
                                    onChange={e => onChange(e)}
                                    minLength='6'
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="regist-invest-form-container">                          
                                <label>  </label>
                                <br></br>
                            </div>
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="col-sm">
                            <div style={{ paddingBottom: "26px" }} className="regist-invest-form-container">
                                <label for="re_password"> Konfirmasi kata sandi </label>
                                <br></br>
                                <input
                                    id='re_password'
                                    type='password'
                                    placeholder='Masukkan ulang kata sandi...'
                                    name='re_password'
                                    value={re_password}
                                    onChange={e => onChange(e)}
                                    minLength='6'
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="regist-invest-form-container">                          
                                <label>  </label>
                                <br></br>
                            </div>
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <button className="submit-button wkd-dark-green-button regist-invest-button"type="submit"> 
                            Buat Akun
                        </button>
                    </Row>
                    <Row className="justify-content-center regist-invest-to-login">
                        <p>Sudah punya akun? <span><Link to='/masuk'>Masuk disini</Link></span></p>
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
