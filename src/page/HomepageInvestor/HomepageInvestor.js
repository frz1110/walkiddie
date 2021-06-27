import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { ChevronLeft } from 'react-feather';
import { Link, Redirect } from 'react-router-dom';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import Card from 'react-bootstrap/Card'
import Select from 'react-select';
import axios from 'axios';
import _ from 'lodash';
import emptyIcon from '../ListOwnedPengadaan/empty.svg';
import './HomepageInvestor.css'
import '../HomepagePemilikToko/HomepagePemilikToko.css';
import '../ListOwnedPengadaan/ListOwnedPengadaan.css';

const HomepageInvestor = ({ isAuthenticated, user }) => {
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
    const [filterChoice, setFilterChoice] = useState([])

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
                var res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config);
                res = res.data.filter((e) => {
                    if (e['status'] === "TRM") {
                        return e;
                    }
                });
                console.log(res);
                var res2 = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config);
                res2 = res2.data.filter((e) => {
                    if (e['status'] === "TRM") {
                        return e;
                    }
                });
                console.log(res2);

                var merged = _.merge(_.keyBy(res, 'pk'), _.keyBy(res2, 'toko'));
                var result = _.values(merged);
                result = result.filter((e) => {
                    if (e['fotoProfilToko']) {
                        return e;
                    }
                });
                console.log(result)

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
                if (!filterChoice){
                    for (let i = 0; i < data.length; i++) {
                        let response = data[i];
                        let value = response['daerah'];
                        allFilter.push({ value: value, label: value })
                    }
                    const uniqueFilter = [...new Set(allFilter)];
                    setFilterChoice(filterChoice.concat(uniqueFilter))
                }
                setFilterChoice(filterChoice.concat(allFilter))
            } catch(e){
                console.log(e)
                alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
            }
        };

        fetchPosts();
    }, [searchTerm]);

    const handleChange = async e => {
        var res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config);
        res = res.data.filter((e) => {
            if (e['status'] === "TRM") {
                return e
            }
        });
        var res2 = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config);
        res2 = res2.data.filter((e) => {
            if (e['status'] === "TRM") {
                return e
            }
        });
        const filterData = filterChange(res, e.value, 'daerah');

        var merged = _.merge(_.keyBy(filterData, 'pk'), _.keyBy(res2, 'toko'));
        var result = _.values(merged);
        result = result.filter((e) => {
            if (e['fotoProfilToko']) {
                return e
            }
        });

        if (result.length === 0) {
            setEmpty(true);
        } else {
            setEmpty(false);
        }

        setFilteredPosts(result);
        setPosts()
    }

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

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Investor") return <Redirect to="/" />

    return (
        <div className='container mt-5 justify-content-center'
            style={{
                boxSizing: 'border-box'
            }}
        >
            <h1 style={{
                textAlign: 'left'
            }}> Daftar Proyek Pengadaan</h1>
            <br></br>
            <Row>
                <Col sm={4}>
                    <Row>
                        <Card
                                style={{
                                    width: '350px',
                                    height: '80px',
                                    backgroundColor: '#146A5F'
                                }}
                            >
                                <p style={{
                                    marginTop: '7px',
                                    marginBottom: '9px'
                                }}
                                className="wkd-nav-button wkd-dark-green-button"
                                >
                                    Atur Lokasi yang ingin dicari :
                                </p>
                                <div data-testid="select-daerah">
                                    <Select
                                        class="form-control"
                                        placeholder="Pilih nama daerah disini"
                                        options={filterChoice}
                                        onChange={handleChange}
                                    />
                                </div>
                        </Card>
                    </Row>
                </Col>
                <Col sm={8}>
                    <Row
                        className='input-investor'
                        style={{

                        }}
                    >
                        <input
                            style={{
                                width: '70%',
                                heigth: '30px'
                            }}
                            type="text"
                            placeholder="Search"
                            onChange={(event) => setSearchTerm(event.target.value)
                            }
                        >
                        </input>
                    </Row>
                    <br></br>
                </Col>
            </Row>
            <br/>
            {!empty && 
            <Row className="row-homepage-investor"
                style={{
                    justifyContent: 'center'
                }}
            >
                <Cards posts={currentPosts} loading={loading} />
                
                <Pagination
                    currentPage={currentPage}
                    postsPerPage={postsPerPage}
                    totalPosts={postLength}
                    paginate={paginate}
                />
            </Row>
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

export default connect(mapStateToProps)(HomepageInvestor);