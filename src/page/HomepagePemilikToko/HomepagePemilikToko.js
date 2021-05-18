import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import './HomepagePemilikToko.css'
import DaftarkanToko from './pemilik-toko-daftarkan-toko.svg';
import axios from 'axios';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const HomepagePemilikToko = ({ isAuthenticated, user }) => {
    const [daftarTokoItems, setDaftarTokoItems] = useState([]);
    const [daftarTokoLoading, setDaftarTokoLoading] = useState(false);
    const [daftarTokoCurrentPage, setDaftarTokoCurrentPage] = useState(1);
    const [daftarTokoPostsPerPage, setDaftarTokoPostsPerPage] = useState(3);
    const daftarTokoIndexOfLastPost = daftarTokoCurrentPage * daftarTokoPostsPerPage;
    const daftarTokoIndexOfFirstPost = daftarTokoIndexOfLastPost - daftarTokoPostsPerPage;
    let daftarTokoCurrentPosts = "";
    let daftarTokoPostLength = 0;

    const [daftarPengadaanItems, setDaftarPengadaanItems] = useState([]);
    const [daftarPengadaanLoading, setDaftarPengadaanLoading] = useState(false);
    const [daftarPengadaanCurrentPage, setDaftarPengadaanCurrentPage] = useState(1);
    const [daftarPengadaanPostsPerPage, setDaftarPengadaanPostsPerPage] = useState(3);
    const daftarPengadaanIndexOfLastPost = daftarPengadaanCurrentPage * daftarPengadaanPostsPerPage;
    const daftarPengadaanIndexOfFirstPost = daftarPengadaanIndexOfLastPost - daftarPengadaanPostsPerPage;
    let daftarPengadaanCurrentPosts = "";
    let daftarPengadaanPostLength = 0;

    if (daftarTokoItems !== []) {
        daftarTokoCurrentPosts = daftarTokoItems.slice(daftarTokoIndexOfFirstPost, daftarTokoIndexOfLastPost);
        daftarTokoPostLength = daftarTokoItems.length;
    }
    if (daftarPengadaanItems !== []) {
        daftarPengadaanCurrentPosts = daftarPengadaanItems.slice(daftarPengadaanIndexOfFirstPost, daftarPengadaanIndexOfLastPost);
        daftarPengadaanPostLength = daftarPengadaanItems.length;
    }

    const fetchDaftarTokoItems = async () => {
        try {
            setDaftarTokoLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setDaftarTokoItems(res.data);
            setDaftarTokoLoading(false);
        } catch {
            alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
        }
    };

    const fetchDaftarPengadaanItems = async () => {
        try {
            setDaftarPengadaanLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setDaftarPengadaanItems(res.data);
            setDaftarPengadaanLoading(false);
        } catch {
            alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
        }
    };

    useEffect(() => {
        fetchDaftarTokoItems();
        fetchDaftarPengadaanItems();
    }, []);

    const daftarTokoPaginate = daftarPageNumber => setDaftarTokoCurrentPage(daftarPageNumber);
    const daftarPengadaanPaginate = daftarPageNumber => setDaftarPengadaanCurrentPage(daftarPageNumber);

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Mitra") return <Redirect to="/" />

    return (
        <div className='container mt-5'>

            <h3 className="pemilik-toko-h2 text-align-left"
                style={{ padding: '0', margin: '0' }}
            >Halo, <span className="pemilik-toko-text-light-green pemilik-toko-text-bold">{user.first_name} {user.last_name} !</span></h3>
            <h6 className="text-align-left"
                style={{ padding: '0', margin: '0' }}
            >Selamat datang kembali di <span className="wkd-green-text pemilik-toko-text-bold">Walkiddie.</span></h6>

            <Link to="/daftar-toko">
                <img src={DaftarkanToko} alt="Daftarkan-toko" className="pemilik-toko-img-daftarkan-toko mt-5" />
            </Link>

            <Link to="/daftar-toko">
                <img src={DaftarkanToko} alt="Daftarkan-toko" className="pemilik-toko-img-daftarkan-toko mt-5" />
            </Link>

            <div className="daftar-toko">
                <h3 className="text-align-left mt-5 mb-3" >Daftar Toko</h3>

                <Cards posts={daftarTokoCurrentPosts} loading={daftarTokoLoading} />
                <Row
                    style={{
                        justifyContent: 'center'
                    }}
                >
                    <Pagination
                        currentPage={daftarTokoCurrentPage}
                        postsPerPage={daftarTokoPostsPerPage}
                        totalPosts={daftarTokoPostLength}
                        paginate={daftarTokoPaginate}
                    />
                </Row>
            </div>

            <div className="daftar-toko">
                <h3 className="text-align-left mt-5 mb-3" >Daftar Pengadaan</h3>

                <Cards posts={daftarPengadaanCurrentPosts} loading={daftarPengadaanLoading} />
                <Row
                    style={{
                        justifyContent: 'center'
                    }}
                >
                    <Pagination
                        currentPage={daftarPengadaanCurrentPage}
                        postsPerPage={daftarPengadaanPostsPerPage}
                        totalPosts={daftarPengadaanPostLength}
                        paginate={daftarPengadaanPaginate}
                    />
                </Row>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(HomepagePemilikToko);