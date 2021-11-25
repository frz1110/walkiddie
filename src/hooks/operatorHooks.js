import { useState, useEffect } from 'react';
import axios from 'axios';

function getConfig() {
  return {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`
    }
  }
}

function fetchLaporan(setData, filter, setError) {
  const config = getConfig();
  let endpoint = "";
  switch(filter) {
    case "NAS":
      endpoint = "?status=NAS"; break;
    case "ASG":
      endpoint = "/list-operator/assigned/"; break;
    case "RSV":
      endpoint = "/list-operator/resolved/";
  }
  axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan${endpoint}`, config)
    .then(res => {
      setData(res.data);
    })
    .catch(error => {
      setError(error);
    })
}


export function useLaporanBackend(user) {
  const [laporan, setLaporan] = useState([]);
  const [filter, setFilter] = useState("BD");
  const [error, setError] = useState();
  const [loading] = useState(true);

  useEffect(() => {
    fetchLaporan(setLaporan, filter, setError);
  }, [setLaporan, filter]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return {laporan, loading, filter, setFilter, error};
}
