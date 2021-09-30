import './HomepageOperator.css';
import React, { useEffect, useState } from 'react';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { ChevronRight } from 'react-feather';
import { Link, Redirect } from 'react-router-dom';
import arcade from './arcade.svg';


const HomepageOperator = ({isAuthenticated, user}) => {
    const dummyData = [
        {   id:1,
            header: <h5>Arcade Game TimeZone Mall Pejaten Village </h5>,
            loc:<h6>TimeZone Mall Pejaten Village </h6>,
            level: '4',
            desc: 'Baterai mati dan mainan sudah tidak dapat dinyalakan selama 10 bulan. Kabel konslet dan perlu diganti baru. ',
        },
        {   id:2,
            header: <h5>London Eye </h5>,
            loc:<h6>TimeZone Mall PIK </h6>,
            level: '3',
            desc: 'London eye ngadet karena terlalu penuh yang meniki wahana ini. ',
        },
        {   id:3,
            header: <h5>London Eye </h5>,
            loc:<h6>TimeZone Mall PIM </h6>,
            level: '3',
            desc: 'London eye ngadet karena terlalu penuh yang meniki wahana ini. ',
        }]


    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Operator") return <Redirect to="/" />

    return (
        <div id="l-o-owned" className="list-owned-pengadaan">
        <div className="owned-pengadaan-store"> 
            <h4 className="list-owned-h3"><a href="">Belum diperbaiki</a></h4>
            <h4 className="list-owned-h3"><a href="">Sedang diperbaiki</a></h4>
            <h4 className="list-owned-h3"><a href="">Selesai</a></h4> 
        </div>
        
        {dummyData.map(item => (
            <div>
                <Link to='' style={{ textDecoration:"none", color: "rgb(0, 0, 0)" }}><div className="owned-pengadaan-object">
                    <Row>
                        <div className="col-4">
                            <img src={arcade} className="owned-pengadaan-store-img" alt=""></img>
                        </div>
                        <div className="col-8 owned-pengadaan-store-desc-saham-wrapper">
                                {item.header}
                                {item.loc}
                                Level Kerusakan: {item.level}
                            <p className="owned-pengadaan-store-desc">{item.desc}</p>
                            <div className="owned-pengadaan-store-saham">
                                <Link to='' style={{color: "#146A5F"}}><p className="detail-pengadaan-text">Perbaiki<ChevronRight style={{paddingBottom: '3px'}}/></p></Link>
                            </div>
                        </div>
                    </Row>
                </div></Link>
                <br />
            </div>
        ))}
    </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(HomepageOperator);