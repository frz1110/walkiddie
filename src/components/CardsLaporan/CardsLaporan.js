import { Link } from 'react-router-dom';
import { Row } from "react-bootstrap";
import './CardsLaporan.css';

export default function CardLaporan ({
  onClickPerbaiki,
  link,
  image,
  header,
  loc,
  level,
  desc
}) {
  return (
    <div>
      <Link to={link} style={{ textDecoration:"none", color: "rgb(0, 0, 0)" }}>
        <div className="owned-pengadaan-object">
          <Row>
            <div className="col-4">
              <img src={image} className="owned-pengadaan-store-img" alt="" />
            </div>
            <div className="col-8 owned-pengadaan-store-desc-saham-wrapper">
              <h5>{header}</h5>
              <p>{loc}</p>
              <p className="owned-pengadaan-store-desc">{desc}</p>
            </div>
          </Row>
        </div>
      </Link>
    </div>
  );
}
