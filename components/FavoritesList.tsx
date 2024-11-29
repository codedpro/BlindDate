import React from "react";

interface FavoritesListProps {
  favorites: string[];
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites }) => {
  return (
    <div className="favorites p-4 text-end">
      <div className="favorites-list">
        {favorites.map((f, index) => (
          <div key={index} className="favorites-list-item">{f}</div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
