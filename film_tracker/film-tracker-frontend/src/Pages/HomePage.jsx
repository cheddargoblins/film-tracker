import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getIMDBLists } from '../utilities/movie_utilities';
import { Card, Col, Row } from 'react-bootstrap';

export const HomePage = () => {
    const [topList, setTopList] = useState([]);
    const [upcomingList, setUpcomingList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getListData = async () => {
        const imdbListInfo = await getIMDBLists();
        setTopList(imdbListInfo.Top_250.items);
        setUpcomingList(imdbListInfo.Upcoming_Movies);
        };
        getListData();
    }, []);


    return (
        <>
        <h2>Top 250 List</h2>
        <Row xs={1} md={3} className="g-4">
            {topList.map((movie) => (
            <Col key={movie.id}>
                <Card>
                <Card.Img
                    src={movie.image}
                    alt={movie.title}
                    onClick={() => navigate(`/movie/details/${movie.id}`)}
                    style={{ height: "200px", width: "150px" }}
                    className="mx-auto"
                />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Release Year: {movie.year}</Card.Text>
                    <Card.Text>IMDb Rating: {movie.imDbRating}</Card.Text>
                </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
        <br />
        <br />
        <h2>Upcoming Movies List</h2>
        <Row xs={1} md={3} className="g-4">
            {upcomingList.map((movie) => (
            <Col key={movie.id}>
                <Card>
                <Card.Img
                    src={movie.image}
                    alt={movie.title}
                    onClick={() => navigate(`/movie/details/${movie.id}`)}
                    style={{ height: "200px", width: "150px" }}
                    className="mx-auto"
                />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Release State: {movie.releaseState}</Card.Text>
                    <Card.Text>Genres: {movie.genres}</Card.Text>
                </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
        </>
);
};
