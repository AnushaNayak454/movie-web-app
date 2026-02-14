import "../CSS/favorites.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  // If there are favorites, map through them and render MovieCards
  if (favorites.length > 0) {
    return (
      <div className="favorites-list">
        <h2>Your Favorite Movies</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  // Otherwise, show the empty state
  return (
    <div className="favorites-empty">
      <h1>No Favorite Movies Yet</h1>
      <p>Start adding movies to your favorites!</p>
    </div>
  );
}

export default Favorites;