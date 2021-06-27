import React from 'react';
import './Cards.css';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Cards = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <CardColumns>
      {posts.map(post => (
        <a href={"/detail-pengadaan/"+post.toko} className="custom-card-walkiddie">
          {(post.danaTerkumpul !== post.totalBiaya) &&
          <Card className="card-flex-item" key={post.pk}
            style={{
              height : '430px'
            }}
          >
            <Card.Img variant="top" src={post.files[0]} 
              style={{
                height : '200px',
              }}
            />
            {/* <Card.Img variant="top" src="https://i.stack.imgur.com/y9DpT.jpg"
              style={{
                height : '200px',
              }}
            /> */}
            <Card.Body>
              <Card.Title className="card-content-limit card-title">
                <img className="toko-profil-img" src={post.fotoProfilToko} alt="Avatar"></img>
                {post.namaToko}
              </Card.Title>
              <ProgressBar variant="success" now={(post.danaTerkumpul/post.totalBiaya*100) + 10} label={(post.danaTerkumpul/post.totalBiaya*100) + "%"} />
              <Card.Text>
                <p className="card-content-limit">{post.deskripsiToko}</p>
              </Card.Text>
            </Card.Body>
          </Card>
          }
           {(post.danaTerkumpul === post.totalBiaya) &&
          <Card className="card-flex-item" key={post.pk}
            style={{
              height : '430px',
              backgroundColor : '#DCDCDC'
            }}
          >
            <Card.Img variant="top" src={post.files[0]} 
              style={{
                height : '200px',
              }}
            />
            {/* <Card.Img variant="top" src="https://i.stack.imgur.com/y9DpT.jpg"
              style={{
                height : '200px',
              }}
            /> */}
            <Card.Body>
              <Card.Title className="card-content-limit card-title">
                <img className="toko-profil-img" src={post.fotoProfilToko} alt="Avatar"></img>
                {post.namaToko}
              </Card.Title>
              <style type="text/css">
                {`
                .progress-bar-finished {
                  background-color: purple;
                  color: white;
                }
                `}
              </style>
              <ProgressBar className="finished-progress-bar" now={(post.danaTerkumpul/post.totalBiaya*100) + 10} label={(post.danaTerkumpul/post.totalBiaya*100) + "%"}/>
              <Card.Text>
                <p className="card-content-limit">{post.deskripsiToko}</p>
              </Card.Text>
            </Card.Body>
          </Card>
          }
        </a>
      ))}
    </CardColumns>
  );
};

export default Cards;