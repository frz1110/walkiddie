import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import Card from 'react-bootstrap/Card'
import { Row, Col } from "react-bootstrap";
import Select from 'react-select';
import axios from 'axios';
import { connect } from 'react-redux';
import './HomepageInvestor.css'
import '../HomepagePemilikToko/HomepagePemilikToko.css'
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

const HomepageInvestor = ({ isAuthenticated, user }) => {
    // const HomepageInvestor = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = "";
    let postLength = 0;
    const [filterChoice, setFilterChoice] = useState([])

    // console.log(filterChoice)
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
    console.log(searchTerm)

    useEffect(() => {
        const fetchPosts = async () => {
            // const searchData = [];
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config);
                const res2 = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config);
                res2.data.forEach((item, i) => {
                    item.pkToko = item.pk;
                });

                var merged = _.merge(_.keyBy(res.data, 'pk'), _.keyBy(res2.data, 'toko'));
                var result = _.values(merged);

                const data = filterChange(result, searchTerm, 'namaToko');

                setPosts(data);
                setFilteredPosts();
                setLoading(false);

                let allFilter = [];
                for (let i = 0; i < data.length; i++) {
                    let response = data[i];
                    let value = response['daerah'];
                    allFilter.push({ value: value, label: value })
                }
                setFilterChoice(filterChoice.concat(allFilter))
            } catch {
                alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
            }
        };

        fetchPosts();
    }, [searchTerm]);

    const handleChange = async e => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config);
        const res2 = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config);
        const filterData = filterChange(res.data, e.value, 'daerah');

        var merged = _.merge(_.keyBy(filterData, 'pk'), _.keyBy(res2.data, 'toko'));
        var result = _.values(merged);

        setFilteredPosts(filterData);
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
        <div className='container mt-5 justify-content-center'>

            <h3 className="pemilik-toko-h2 text-align-left"
                style={{ padding: '0', margin: '0' }}
            >Halo, <span className="pemilik-toko-text-light-green pemilik-toko-text-bold">{user.first_name} {user.last_name} !</span></h3>
            <h6 className="text-align-left"
                style={{ padding: '0', margin: '0' }}
            >Selamat datang kembali di <span className="wkd-green-text pemilik-toko-text-bold">Walkiddie.</span></h6>
            <br></br>
            <h1>Proyek Pengadaan Barang</h1>
            <Row className='justify-content-center row-homepage-investor'>
                <button className="wkd-nav-button wkd-dark-green-button" type="submit" style={{
                    padding: "0 40px"
                }}>Lihat Investasi yang Dimiliki</button>
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
            <Row className="row-homepage-investor">
                <Col sm={4}>
                    <Card
                        style={{
                            width: '350px',
                            height: '80px'
                        }}
                    >
                        <p style={{
                            marginTop: '7px',
                            marginBottom: '9px'
                        }}>
                            Atur Lokasi yang ingin dicari :
                        </p>
                        <div data-testid="select-daerah">
                            <Select
                                style={{
                                    width: '900px',
                                    height: '110px'
                                }}
                                class="form-control"
                                placeholder="Beji,Depok"
                                // value={dataPilihanMainan.find(obj => obj.value === selectedValue)}
                                options={filterChoice}
                                onChange={handleChange}
                            />
                        </div>
                    </Card>
                </Col>
                <Col sm={8}>
                    <Cards posts={currentPosts} loading={loading} />
                </Col>
            </Row>
            <Row className="row-homepage-investor"
                style={{
                    justifyContent: 'center'
                }}
            >
                <Pagination
                    currentPage={currentPage}
                    postsPerPage={postsPerPage}
                    totalPosts={postLength}
                    paginate={paginate}
                />
            </Row>
        </div>
    );

};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(HomepageInvestor);


// export default HomepageInvestor;