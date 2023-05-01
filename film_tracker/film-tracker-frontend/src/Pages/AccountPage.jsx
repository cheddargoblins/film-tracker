import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { fetchWatchlist, removeFromWatchlist, fetchList, addCustomList, removeFromList, removeList, fetchUserReviews, deleteReview, updateReview } from "../utilities/api_utilities";
import { getPosterURL } from '../utilities/movie_utilities';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export const AccountPage = () => {
    const [user, setUser] = useContext(UserContext);
    const [watchlist, setWatchlist] = useState([]);
    const [listCollection, setListCollection] = useState([]);
    const [listName, setListName] = useState("");
    const [reviews, setReviews] = useState([]);
    const [movies, setMovies] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const navigate = useNavigate();

    const handleRemoveFromWatchlist = async (movieId) => {
        await removeFromWatchlist(movieId);
        setWatchlist(watchlist.filter((movie) => movie !== movieId));
    };

    const handleRemoveFromList = async (movieId, listName) => {
        await removeFromList(movieId, listName);
        setListCollection(listCollection.map((listObj) => {
            if (Object.keys(listObj)[0] === listName) {
                const newListContent = Object.values(listObj)[0].filter((movie) => movie !== movieId);
                return { [listName]: newListContent };
            }
            else {
                return listObj;
            }
        }));
    };

    const handleRemoveList = async (listName) => {
        await removeList(listName);
        setListCollection(listCollection.filter((listObj) => {
            return Object.keys(listObj)[0] !== listName;
        }));
    };

    const handleRemoveReview = async (movieId) => {
        await deleteReview(movieId);
        setReviews(reviews.filter((reviewObj) => {
            return Object.keys(reviewObj)[0] !== movieId;
        }));
    };
    
    const handleEditReview = async (movieId) => {
        const updatedReview = prompt("Enter your updated review:");
    
        if (updatedReview) {
        await updateReview(movieId, updatedReview);
        setReviews((reviews) =>
            reviews.map((reviewObj) => {
            if (Object.keys(reviewObj)[0] === movieId) {
                return { [movieId]: updatedReview };
            } else {
                return reviewObj;
            }
            })
        );
        }
    };

    const handleSubmitList = async (e) => {
        e.preventDefault();
        await addCustomList(listName);
        setListName("")
    };

    useEffect(() => {
        const getWatchlist = async () => {
            const watchlist_content = await fetchWatchlist();
            setWatchlist(watchlist_content);
        };
        getWatchlist();
        }, []);


    useEffect(() => {
        const getLists = async () => {
            const list_content = await fetchList();
            setListCollection(list_content.list_cluster);
        };
        getLists();
    }, []);

    useEffect(() => {
        const getReviews = async () => {
        const review_content = await fetchUserReviews();
        setReviews(review_content.review_cluster)
        };
        getReviews();
    }, []);
    
    

    const getMovieData = async (movieID, source) => {
        if (movies[movieID]) {
        return { title: movies[movieID].title, poster: movies[movieID].poster, id: movieID, source };
        }
        const movieInfo = await getPosterURL(movieID);
        setMovies((prevState) => ({ ...prevState, [movieID]: movieInfo }));
        return {
        title: movieInfo.title,
        poster: movieInfo.poster,
        id: movieID,
        source,
        };
    };
    
    

    useEffect(() => {
        const fetchData = async () => {
        const allMovieIdsSet = new Set([...watchlist, ...listCollection.flatMap((listObj) => Object.values(listObj)[0]), ...reviews.flatMap((review) => Object.keys(review))]);
        const allMovieIds = [...allMovieIdsSet];
        const promises = allMovieIds.map((movieID) => getMovieData(movieID, "all"));
        const results = await Promise.allSettled(promises);
        const data = results
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value);
        setMovieData(data);
        };
        fetchData();
    }, [watchlist, reviews, listCollection]);
    


    return (
        <>
        <h3>{user.display_name}'s Watchlist</h3>
        {watchlist.length === 0 && <p>Your watchlist is empty.</p>}
        <div className="card-group card-group-horizontal">
        {movieData
            .filter((movie) => watchlist.includes(movie.id))
            .map((movie) => (
                <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <br/>
                <div key={movie.id} className="card">
                    <img
                    className="card-img-top mx-auto"
                    src={movie.poster}
                    alt={movie.title}
                    style={{ height: "200px", width: "150px" }}
                    onClick={() => navigate(`/movie/details/${movie.id}`)}
                />
                <br/>
                <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromWatchlist(movie.id)}
                >
                    Remove from Watchlist
                </button>
                </div>
            </div>
            ))}
        </div>

        <br/>
        <br/>
        <h3>Your Lists</h3>
        {listCollection.length === 0 && <p>You don't have any lists.</p>}
        <div className="card-group card-group-horizontal">
        {listCollection.map((listObj) => {
            const listName = Object.keys(listObj)[0];
            const listContent = Object.values(listObj)[0];
            return (
            <div key={listName} className="card">
                <div className="card-body">
                <h5 className="card-title">{listName}</h5>
                <ul className="list-group list-group-flush">
                    {listContent.map((movieId) => {
                    const movie = movieData.find((m) => m.id === movieId);
                    if (movie) {
                        return (
                        <li key={movieId} className="list-group-item">
                            {movie.title}
                            <br/>
                            <img
                                className="card-img-top mx-auto"
                                src={movie.poster}
                                alt={movie.title}
                                style={{ height: "200px", width: "150px" }}
                                onClick={() => navigate(`/movie/details/${movie.id}`)}
                            />
                            <br/>
                            <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveFromList(movieId, listName)}
                            >
                            Remove from List
                            </button>
                            <br/>
                        </li>
                        );
                    }
                    return null;
                    })}
                </ul>
                <button
                    className="btn btn-warning"
                    onClick={() => handleRemoveList(listName)}
                >
                    Delete List
                </button>
                </div>
            </div>
            );
        })}
        </div>
        <div className="card-group">
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">Create Custom List</h5>
            <form onSubmit={handleSubmitList}>
                <div className="form-group">
                <input
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    required
                />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">
                Create List
                </button>
            </form>
            </div>
        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h3>Your Reviews</h3>
        {reviews.length === 0 && <p>You have not written any reviews.</p>}
        <div className="card-group">
        {movieData.filter(movie => reviews.some(review => Object.keys(review)[0] === movie.id)).map(movie => (
            <Card key={movie.id} style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <br/>
                    <Card.Img className="mx-auto" variant="top" src={movie.poster} alt={movie.title} style={{ height: "200px", width: "150px" }} onClick={() => navigate(`/movie/details/${movie.id}`)} />
                    <Card.Text>{reviews.find(review => Object.keys(review)[0] === movie.id)[movie.id]}</Card.Text>
                    <Button variant="primary" onClick={() => handleEditReview(movie.id)}>Edit Review</Button>
                    <Button variant="danger" onClick={() => handleRemoveReview(movie.id)}>Delete Review</Button>
                </Card.Body>
            </Card>
        ))}
        </div>
        </>
    );
};

