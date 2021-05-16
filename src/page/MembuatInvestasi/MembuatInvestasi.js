import './MembuatInvestasi.css'
import OptionCard from '../../components/InvestasiOptionCard/OptionCard'
import CustomOptionCard from '../../components/InvestasiOptionCard/CustomOptionCard'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const MembuatInvestasi = ({ isAuthenticated, user }) => {

    if (!isAuthenticated) return <Redirect to="/masuk" />

    return ( 
        <div className="container mt-5 overflow-hidden mi-ctn">
            <h4 className="mi-title">WKD-02ID021 - Cabang Maros 05</h4>
            <h6 className="mi-subtitle">Resto Bebek H. Selamet</h6>
            
            <hr className="mi-title-divider"/>

            <div className="row row-cols-1 row-cols-lg-2 mi-text-start mt-5">
                <div className="col px-4">
                    <div className="row row-cols-1 row-cols-sm-2 gx-2">
                        <OptionCard ratio={5} amount={1000000} />
                        <OptionCard ratio={10} amount={2000000} />
                        <OptionCard ratio={20} amount={4000000} />
                        <OptionCard ratio={50} amount={10000000} />
                        <OptionCard ratio={70} amount={14000000} />
                        <OptionCard ratio={100} amount={20000000} />
                    </div>
                    <div className="row">
                        <CustomOptionCard />
                    </div>
                </div>

                <div className="col px-5">
                    <h5>Tata Cara Pembayaran</h5>
                    <ol className="text-start">
                        <li>Lakukan pembayaran dengan nominal yang sesuai ke rekening XXXX-XXXX-XXXX-XXXX (a.n. Walkiddie Toys).</li>
                        <li>Konfirmasi pembayaran melalui XXXXXXXXXXX</li>
                    </ol>

                    <h5 className="mt-4">Estimasi Keuangan</h5>
                    <div className="card mi-card mi-card-estimasi-keuangan">
                        <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-5">
                <div className="col">
                    <button className="wkd-nav-button wkd-light-tosca-button" onClick={() => window.history.back()}>Kembali</button>
                    <button className="wkd-nav-button wkd-dark-green-button" onClick={() => console.log(user)}>Buat Investasi</button>
                </div>
            </div>
        </div>
     );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(MembuatInvestasi);