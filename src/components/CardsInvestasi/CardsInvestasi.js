import React from 'react';
import './CardsInvestasi.css';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

const CardsInvestasi = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <CardColumns>
      {posts.map(post => (
          <Card className="card-flex-item" key={post.pk}
            style={{
              height : '470px'
            }}
          >
            <Card.Img className="card-pengadaan-img" variant="top" src={post.pengadaan.files[0]}/>
            <Card.Body>
              <Card.Title className="card-content-limit card-title card-pengadaan-image">
                <img className="toko-profil-img" src={post.profile_picture} alt="Avatar"></img>
                {post.pengadaan.toko.namaToko}
              </Card.Title>
                <div className="detail-pengadaan-store-name">
                  <span style={{ fontWeight: "500", fontSize: "15px" }}>{post.namaCabang}</span>
                </div>
              <Card.Text>
                <p className="card-content-limit">
                  Penjual: {post.full_name}
                  <br />
                  Jumlah: {post.nominal} lot
                  <br />
                  Harga per lot: Rp {post.uangInvestasi/100}
                </p>
              </Card.Text>
              <a href={"/beli-investasi/"+post.pk}><button id="m-i-buat" className="wkd-nav-button wkd-dark-green-button">Beli Saham</button></a>
            </Card.Body>
          </Card>
      ))}
    </CardColumns>
  );
};

export default CardsInvestasi;