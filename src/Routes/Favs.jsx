import React, { useContext } from "react";
import Card from "../Components/Card";
import { ContextGlobal } from "../Components/utils/global.context";

const Favs = () => {
  const { theme, favorites, resetFavorites } = useContext(ContextGlobal);

  const handleResetFavorites = () => {
    resetFavorites();
  };


  return (
    <>
      <main className={theme === 'dark' ? 'dark' : 'light'}>
        <h1>Dentists Favs</h1>
        <button onClick={handleResetFavorites} className="resetButton">Resetear Favoritos</button>
     
        <div className="card-grid">
          {favorites.length > 0 ? (
            favorites.map(favorite => (
              <Card
                key={favorite.id}
                name={favorite.name}
                username={favorite.username}
                id={favorite.id}
              />
            ))
          ) : (
            <p>No se encontraron dentistas favoritos.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Favs;
