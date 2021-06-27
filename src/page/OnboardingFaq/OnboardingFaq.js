import './OnboardingFaq.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Row } from "react-bootstrap";
import Faq from "react-faq-component";
import { Phone, Clock, Mail } from 'react-feather';

const OnboardingFaq = ({ user }) => {
    const [roles, setRoles] = useState('');
    const [isMitra, setIsMitra] = useState(false);
    const [isInvestor, setIsInvestor] = useState(false);

    useEffect(() => {
        try {
            setRoles(user.role);
        }
        catch (err) {
            setIsInvestor(true);
            setIsMitra(true);
        }
    }, []);

    useEffect(() => {
        if (roles === "Investor") {
            setIsInvestor(true);
        }
        else if (roles === "Mitra") {
            setIsMitra(true);
        }
    }, [roles]);

    const dataInvestor = {
        rows: [
            {
                title: "Bagaimana cara kerja investasi di Walkiddie?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.`
            },
            {
                title: "Apa saja syarat untuk melakukan investasi?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.`
            },
            {
                title: "Bagaimana pembagian profit investasi?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.`
            },
            {
                title: "Berapa jumlah minimal modal yang harus dibayarkan?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.`
            },
            {
                title: "Bagaimana jika lupa kata sandi?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.`
            }]
    }

    const dataMitra = {
        rows: [
            {
                title: "Apakah bisa menggunakan akun investor untuk menjadi mitra?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.`
            },
            {
                title: "Bagaimana cara mendaftarkan toko?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.`
            },
            {
                title: "Bagaimana cara mengajukan pengadaan?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.`
            },
            {
                title: "Bagaimana pembagian profit investasi?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim.`
            }]
    }

    const dataUmum = {
        rows: [
            {
                title: "Apa itu crowdfunding?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.`
            },
            {
                title: "Jenis mainan apa saja yang disediakan?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.`
            },
            {
                title: "Apa saja role yang terdapat pada Walkiddie?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.`
            },
            {
                title: "Bagaimana cara menghubungi customer service Walkiddie?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.`
            }]
    }


    const styles = {
        titleTextSize: '23px',
        arrowColor: '#146A5F',
        rowContentPaddingTop: '5px',
        rowContentPaddingBottom: '10px',
        rowTitleTextSize: '17.5px',
        rowContentTextSize: '15px'
    };

    return (
        <div className="faq-wrapper">
            <div className="faq-header">
                <div className="faq-header-content">
                    <h1>Halo! Ada yang bisa kami bantu?</h1>
                </div>
            </div>
            <div className="faq-title">
                <h5>Bantuan / FAQ</h5>
            </div>
            <Row className="justify-content-center faq-sect-2">
                <div className="col-lg-3 faq-contact-wrapper">
                    <h5>Hubungi kami</h5>
                    <p className="faq-midtext"></p>
                    <div className="faq-contact-text"><Phone size="18" /> <span style={{ paddingLeft: '10px' }}>
                        (021) 1600702</span>
                    </div>
                    <div className="faq-contact-text" style={{ paddingBottom: '20px' }}>
                        <span style={{ paddingLeft: '30px' }}>
                            Senin - Jum'at</span><br />
                        <Clock size="18" style={{ opacity: '0.5' }} /> <span style={{ opacity: '0.5', paddingLeft: '10px' }}>
                            08.00 - 17.00 WIB</span>
                    </div>
                    <div className="faq-contact-text">
                        <span style={{ paddingLeft: '30px' }}>
                            Sabtu - Minggu</span><br />
                        <Clock size="18" style={{ opacity: '0.5' }} /> <span style={{ opacity: '0.5', paddingLeft: '10px' }}>
                            10.00 - 15.00 WIB</span>
                    </div>
                    <div className="faq-contact-text"><Mail size="18" /> <span style={{ paddingLeft: '10px' }}>
                        walkiddieCS@gmail.com</span>
                    </div>
                </div>
                <div className="col-lg-9 faq-content-wrapper">
                    <div>
                        <h3 className="faq-investor-title"><span style={{ color: "#146A5F" }}>Walkiddie</span> secara umum</h3>
                        <Faq
                            data={dataUmum}
                            styles={styles}
                        />
                    <br />
                    <br />
                    </div>
                    {isInvestor && <div>
                        <h3 className="faq-investor-title">Mengenai <span style={{ color: "#146A5F" }}>Investor</span></h3>
                        <Faq
                            data={dataInvestor}
                            styles={styles}
                        />
                    <br />
                    <br />
                    </div>}
                    {isMitra && <div>
                        <h3 className="faq-investor-title">Mengenai <span style={{ color: "#146A5F" }}>Mitra</span></h3>
                        <Faq
                            data={dataMitra}
                            styles={styles}
                        />
                    </div>}
                </div>
            </Row>
        </div >
    );
}
const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(OnboardingFaq);