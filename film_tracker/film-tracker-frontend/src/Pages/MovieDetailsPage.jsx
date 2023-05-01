import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from "../App";
import { getMovieDetails, addMovieToWatchlist, getMovieReviews, addMovieReview, fetchWatchlist, removeFromWatchlist, fetchList, addToList } from "../utilities/api_utilities";

export const MovieDetailsPage = () => {
    const [user, setUser] = useContext(UserContext);
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewContent, setReviewContent] = useState("");
    const [wroteReview, setWroteReview] = useState(false);
    const [watchlistStatus, setWatchlistStatus] = useState(false);
    const [listName, setListName] = useState("");
    const [listStatus, setListStatus] = useState(false);
    const [listCollection, setListCollection] = useState([]);


    const handleSubmitReview = async (e) => {
        e.preventDefault();
        await addMovieReview(reviewContent, movieId);
        const review_content = await getMovieReviews(movieId);
        setReviews(review_content.review_cluster);
        setReviewContent("");
    };

    const handleAddToWatchlist = async () => {
        await addMovieToWatchlist(movieId);
        setWatchlistStatus(true);
    };

    const handleRemoveFromWatchlist = async (movieId) => {
        await removeFromWatchlist(movieId);
        setWatchlistStatus(false);
    };

    const handleAddToList = async (e) => {
        e.preventDefault();
        if (!listName) {
            alert("Please select a list.");
            return;
        }
        await addToList(listName, movieId);
        setListStatus(true);
        setListName("");
    };
    

    useEffect(() => {
        const getWatchlist = async (movieId) => {
            const watchlist_content = await fetchWatchlist();
            if (movieId in watchlist_content){
                setWatchlistStatus(true);
            }
        };
        getWatchlist();
        }, []);

    useEffect(() => {
        const getReviews = async () => {
        const review_content = await getMovieReviews(movieId);
        if (review_content.review_cluster && review_content.review_cluster.length > 0) {
            setReviews(review_content.review_cluster)
            if (user.display_name in review_content.review_cluster){
                setWroteReview(true)
            }
        }};
        getReviews();
    }, []);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const movieData = await getMovieDetails(movieId);
            setMovie(movieData.data);
        };
        fetchMovieDetails();
    }, [movieId]);
    
    useEffect(() => {
        const getLists = async () => {
            const list_content = await fetchList();
            setListCollection(list_content.list_cluster);
        };
        getLists();
    }, []);


if (!movie) return <div>Loading...</div>;

return (
    <div>
        <div>
        <h1>{movie.title}</h1>
        <img
            src={movie.image}
            alt={movie.fullTitle}
            height="400"
            width="300" 
            />
        <p>{movie.plot}</p>
        <p>Runtime: {movie.runtimeStr}</p>
        <p>Rating: {movie.contentRating}</p>
        <p>Director: {movie.directors}</p>
        <p>Released: {movie.releaseDate}</p>
        <p>Genres: {movie.genres}</p>
        </div>

        <br/>
        <div>
            <h2>Reviews</h2>
            {reviews.length === 0 && <p>So far no User has left a Review for this movie. Be the first!</p>}
            <ul>
            {reviews.map((review) => (
                <li key={review.id}>
                <p>{review.user_name} wrote:</p>
                <p>{review.content}</p>
                </li>
            ))}
            </ul>
        </div>
        <br></br>
        <br></br>
        <h2>Actions</h2>
        <div>
            <button onClick={watchlistStatus ? () => handleRemoveFromWatchlist(movieId) : handleAddToWatchlist}>
                {watchlistStatus ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
            <br />
            <br />
            <div>
                <form onSubmit={handleAddToList}>
                    <label>
                        Add to List:
                        <select
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}>
                            
                            <option value="">Select a List</option>
                                {listCollection.map((list) => {
                                    const listName = Object.keys(list)[0];
                                    return <option key={listName} value={listName}>{listName}</option>;
                                })}
                        </select>
                    </label>
                    <br />
                    <button type="submit">Add to List</button>
                </form>
            </div>
                { wroteReview ?
                    <></>
                    :
                    <div>
                        <br />
                        <h3>Write Your Own Review</h3>
                        <form onSubmit={handleSubmitReview}>
                        <textarea
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                        />
                        <br />
                        <button type="submit">Submit Review</button>
                        </form>
                    </div>
                    }
        </div>
    </div>
);
};
