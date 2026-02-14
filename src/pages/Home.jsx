import MovieCard from "../components/MovieCard";
import { useState, useEffect, use } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import '../CSS/Home.css';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
   


    // const movies = getPopularMovies(); //to get the popular movies from the api and store it in the movies variable

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                setError("Failed to fetch popular movies. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, [])


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setError("Please enter a search query.");
            return;
        }
        if (movies.length === 0) {
            setError("No movies found. Please try a different search query.");
            return;
        }
        if (loading) {
            setError("Movies are still loading. Please wait.");
            return;
        }
        setLoading(true)
        try {
            const searchedMovies = await searchMovies(searchQuery);
            setMovies(searchedMovies);
            setError(null);
        } catch (error) {
            console.error("Error searching movies:", error);
            setError("An error occurred while searching. Please try again.");
        } finally {
            setLoading(false);
        }

        //e.preventDefault(); //to prevent the default behavior of form submission which is to reload the page //i mean its shows previous data
        // alert("searching for " + searchQuery);
        //setSearchQuery("-------"); //to clear the search input after searching //its optional //the search query  will be automatically like (setSearchQuery("-------");) after searching but its optional to clear the search input after searching

    }

    return (
        <>
            <div className="home">
                <form onSubmit={handleSearch} className="search-form">
                    <input type="text" placeholder="Search movies..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button type="submit" className="search-button">Search</button>

                </form>

                {error && <p className="error-message">{error}</p>}

                {loading ? (
                    <p>Loading popular movies...</p>
                ) : (
                    <div className="movies-grid">
                        {movies.map((movie) =>
                            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
                            (<MovieCard key={movie.id} movie={movie} />))}

                    </div>
                )}
            </div>

        </>
    )
}

export default Home;

//state is something where once its updated,component will change and re-render itself to show the new state