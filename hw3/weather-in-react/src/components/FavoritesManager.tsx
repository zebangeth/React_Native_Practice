import React, { useState, useEffect } from "react";
import { getFavorites, addFavorite, deleteFavorite } from "../api/favoritesApi";

interface FavoritesManagerProps {
  currentZipCode: string;
  currentLocation: string;
  onSelectFavorite: (zipCode: string) => void;
  onDeleteFavorite: () => void;
}

const FavoritesManager: React.FC<FavoritesManagerProps> = ({
  currentZipCode,
  currentLocation,
  onSelectFavorite,
  onDeleteFavorite,
}) => {
  const [favorites, setFavorites] = useState<
    Array<{ zipCode: string; location: string }>
  >([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesData = await getFavorites();
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const handleAddFavorite = async () => {
    try {
      await addFavorite(currentZipCode, currentLocation);
      loadFavorites();
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const handleDeleteFavorite = async () => {
    try {
      await deleteFavorite(currentZipCode);
      loadFavorites();
      onDeleteFavorite(); // Call the onDeleteFavorite function to reset the app
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  const isFavorite = favorites.some((fav) => fav.zipCode === currentZipCode);

  return (
    <div className="favorites-manager">
      <button
        onClick={handleAddFavorite}
        disabled={isFavorite || !currentZipCode}
      >
        Add to Favorites
      </button>
      <p>Go to favorite:</p>
      <select
        onChange={(e) => onSelectFavorite(e.target.value)}
        value={currentZipCode}
      >
        <option value="">Select favorite</option>
        {favorites.map((fav) => (
          <option key={fav.zipCode} value={fav.zipCode}>
            {`${fav.location} (${fav.zipCode})`}
          </option>
        ))}
      </select>
      <button
        onClick={handleDeleteFavorite}
        disabled={!isFavorite || !currentZipCode}
      >
        Delete Favorite
      </button>
    </div>
  );
};

export default FavoritesManager;
