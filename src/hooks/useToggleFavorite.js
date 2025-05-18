import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFavorites } from '../features/Favorites/favoritesSlice';

const useToggleFavorite = (id, type, toggleFavorite) => {
  const favorites = useSelector((state) => getFavorites(state.favorites));

  const [favoriteView, setFavoriteView] = useState(false);
  useEffect(() => {
    setFavoriteView(favorites[type]?.some((item) => item?.favorableId === id));
  }, [favorites, type]);

  const toggleFavoriteHandler = async () => {
    setFavoriteView(!favoriteView);
    try {
      const data = await toggleFavorite(id).unwrap();

      if (!data.success) {
        throw new Error('Не удалось добавить в избранное');
      }
    } catch (error) {
      setFavoriteView(!favoriteView);
      console.log(error.message);
    }
  };

  return {
    favoriteView,
    toggleFavoriteHandler,
  };
};

export default useToggleFavorite;
