import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ContextGlobal } from '../Components/utils/global.context';
import axios from 'axios';


const Detail = () => {

  const { id } = useParams();
  const { theme } = useContext(ContextGlobal);
  const [dentist, setDentist] = useState(null);

  useEffect(() => {
    const fetchDentist = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setDentist(response.data);
      } catch (error) {
        console.error('Error fetching dentist details:', error);
      }
    };

    fetchDentist();
  }, [id]);

  if (!dentist) return <p className='cargando'>Cargando</p>;
  return (
    <>
      <main className={theme === 'dark' ? 'dark' : 'light'}>
        <h1>Detail Dentist {dentist.id}</h1>
        <div className="detail-card">
          <h2>{dentist.name}</h2>
          <p><strong>Email:</strong> {dentist.email}</p>
          <p><strong>Phone:</strong> {dentist.phone}</p>
          <p><strong>Website:</strong> <a href={`http://${dentist.website}`} target="_blank" rel="noopener noreferrer">{dentist.website}</a></p>
        </div>
      </main>
    </>
  )
}

export default Detail