import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from "react-bootstrap";
import { ChevronLeft, Search } from 'react-feather';
import Pagination from '../../components/Pagination/Pagination';
import CardsInvestasi from '../../components/CardsInvestasi/CardsInvestasi';
import emptyIcon from '../ListOwnedPengadaan/empty.svg';
import './ListSahamDijual.css';

const ListSahamDijual = ({ isAuthenticated, user }) => {

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [empty, setEmpty] = useState(false);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = "";
    let postLength = 0;
    const [filterChoice, setFilterChoice] = useState([]);

    if (filteredPosts) {
        currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
        postLength = filteredPosts.length;
    } else if (posts !== []) {
        currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        postLength = posts.length;
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                var res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/`, config);
                res = res.data.filter((e) => {
                    if (e['statusInvestasi'] === "DJL" && e['statusPembelian'] !== "MPA") {
                        return e;
                    }
                });
                console.log(res[0]);

                let result = [];
                for (let i = 0; i < res.length; i++) {
                    let investorEmail = res[i].investor;
                    let investorObj = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/profile/${investorEmail}`, config);
                    investorObj = investorObj.data;
                    let namaTokoString = res[i].pengadaan.toko.namaToko;
                    let namaTokoObj = {namaToko: namaTokoString};
                    console.log(namaTokoObj);
                    var merging = Object.assign({}, namaTokoObj, investorObj, res[i]);
                    console.log(merging);
                    result.push(merging)
                }

                if (result.length === 0) {
                    setEmpty(true);
                } else {
                    setEmpty(false);
                }

                const data = filterChange(result, searchTerm, 'namaToko');
                setPosts(data);
                setFilteredPosts();
                setLoading(false);

                let allFilter = [];
                console.log([{ 'value': 123, 'label': 123 }].includes({ 'value': 123, 'label': 123 }));
                console.log(['a', 'b', 'c'].includes('b'));
                if (filterChoice.length === 0) {
                    for (let i = 0; i < data.length; i++) {
                        let response = data[i];
                        let value = response['daerah'];
                        var found = false;
                        for(let j = 0; j < allFilter.length; j++) {
                            if (allFilter[j].value == value) {
                                found = true;
                                break;
                            }
                        }

                        if (!found){
                            allFilter.push({ 'value': value, 'label': value });
                            console.log('masuk');
                            console.log({ 'value': value, 'label': value })
                        }
                    }
                    setFilterChoice(allFilter);
                }
            } catch (e) {
                console.log(e)
                alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
            }
        };

        fetchPosts();
    }, [searchTerm]);

    const filterChange = (data, filterTerm, find) => {
        const filteredData = data.filter((e) => {
            if (filterTerm === "") {
                return e
            }
            else if (e[find].toLowerCase().includes(filterTerm.toLowerCase())) {
                if (e) {
                    return e
                }
            }
        });
        return filteredData
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (!isAuthenticated) {
        alert("Login dahulu sebagai User")
        return <Redirect to="/masuk" />
    }
    if (user.role !== "Investor") {
        alert("Hanya dapat diakses oleh Investor")
        return <Redirect to="/" />
    }
    
    return (
        <div className='detail-pengadaan-wrapper'
            style={{
                boxSizing: 'border-box'
            }}
        >
            <h3 className="back-button" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left" />Daftar Saham yang Dijual</h3>
            <Row style={{ margin: "0px", paddingTop: "5px" }} className="justify-content-center">
                <div className="col-12">
                    <div
                        id="h-i-search"
                        className='input-investor'
                    >
                        <input
                            type="text"
                            placeholder= "  Cari saham..."
                            className="homepage-investor-search-bar"
                            onChange={(event) => setSearchTerm(event.target.value)}
                        >
                        </input>
                        <Search />
                    </div>
                    <br></br>
                </div>
            </Row>
            <br />
            {!empty && <>
                <Row id="h-i-pengadaan"
                    style={{
                        justifyContent: 'center',
                        margin: "0px"
                    }}
                >
                    <CardsInvestasi posts={currentPosts} loading={loading} config={config} />

                    
                </Row>
                <Row>
                    <Pagination
                        currentPage={currentPage}
                        postsPerPage={postsPerPage}
                        totalPosts={postLength}
                        paginate={paginate}
                    />
                </Row>
                </>
            }

            {
                empty && <div className="list-pengadaan-null-wrapper">
                    <img src={emptyIcon} alt="empty data"></img>
                    <h5 className="owned-pengadaan-null">Tidak ada investasi yang tersedia.</h5>
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(ListSahamDijual);