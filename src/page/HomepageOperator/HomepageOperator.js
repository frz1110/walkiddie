import './HomepageOperator.css';
import Card from '../../components/CardsLaporan/CardsLaporan';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import arcade from './arcade.svg';
import { useLaporanBackend } from '../../hooks/operatorHooks';
import Empty from '../../components/Empty/Empty';

const HomepageOperator = ({isAuthenticated, user}) => {
  const { laporan, filter, setFilter } = useLaporanBackend(user);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#sedang-diperbaiki") {
      setFilter('ASG');
    } else if (hash === "#selesai") {
      setFilter('RSV');
    } else {
      setFilter('NAS');
    }
  }, [setFilter, hash])

  if (!isAuthenticated) return <Redirect to="/masuk" />
  if (user.role !== "Operator") return <Redirect to="/" />

  return (
    <div id="l-o-owned" className="list-owned-pengadaan">
      <div className="owned-pengadaan-store">
        <h4 className={`list-owned-h3 ${!filter || filter === 'NAS' ? 'active' : ''}`}>
          <a href="#belum-diperbaiki">Belum diperbaiki</a>
        </h4>
        <h4 className={`list-owned-h3 ${filter === 'ASG' ? 'active' : ''}`}>
          <a href="#sedang-diperbaiki">Sedang diperbaiki</a>
        </h4>
        <h4 className={`list-owned-h3 ${filter === 'RSV' ? 'active' : ''}`}>
          <a href="#selesai">Selesai</a>
        </h4>
      </div>

      {laporan.length > 0 ? laporan.map(item => (
        <Card
          image={item.fotoKerusakan}
          header={item.mainanPengadaan.pengadaan.toko.namaToko}
          link={`/laporan/${item.pk}`}
          loc={item.mainanPengadaan.pengadaan.toko.lokasiToko}
          desc={item.deskripsi}
        />
      )) : (
        <Empty
          message={"Belum ada laporan kerusakan."}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps)(HomepageOperator);
