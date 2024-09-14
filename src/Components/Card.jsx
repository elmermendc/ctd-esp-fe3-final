import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextGlobal } from "./utils/global.context";


const Card = ({ name, username, id }) => {

  const { addFavorite, removeFavorite, favorites } = useContext(ContextGlobal);

  const isFavorite = favorites.some(fav => fav.id === id);
  const addFav = () => {

    if (isFavorite) {
      removeFavorite({ id });
    } else {
      addFavorite({ id, name, username });
    }
  }

  return (
    <div className="card">
      <img src="./images/doctor.jpg" alt={`Imagen de ${name}`} className="card-image" />
      <h2>{name}</h2>
      <p>{username}</p>
      <Link to={`/dentist/${id}`}>Ver Detalles</Link>
      <button onClick={addFav} className="favButton"> {isFavorite ? '❌ Eliminar de Favoritos' : '❤️ Agregar a Favoritos'}</button>
    </div>
  );
};

export default Card;
