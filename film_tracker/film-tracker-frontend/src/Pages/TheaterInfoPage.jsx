import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieTimes } from '../utilities/movie_utilities';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';



export const TheaterInfoPage = () => {
    const [theaterInfo, setTheaterInfo] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const getShowtimeInfo = async () => {
        const showtimes = await getMovieTimes();
        setTheaterInfo(showtimes.data)
        };
        getShowtimeInfo();
    }, []);


    return (
        <Container>
        <Row>
            <Col>
            <h1>Movie Theater: {theaterInfo?.cinema.cinema_name}</h1>
            </Col>
        </Row>
        <Row>
            <Col>
            {!theaterInfo ?
            <p>Loading...</p>
            : 
            <>
                {theaterInfo.films.map(film => (
                <Card key={film.imdb_title_id}>
                    <Card.Body>
                    <div>
                        <a href={`/movie/details/${film.imdb_title_id}`} onClick={(e) => {
                            e.preventDefault();
                            navigate(`/movie/details/${film.imdb_title_id}`);
                        }}>
                            <Card.Title>{film.film_name}</Card.Title>
                        </a>
                    </div>
                    <Card.Img variant="top" src={film.images.poster[1].medium.film_image} alt={film.film_name} style={{ height: "200px", width: "150px" }}/>
                    <Card.Text>{film.age_rating[0].rating}</Card.Text>
                    <Card.Text>
                        {film.show_dates.map(date => (
                        <Badge key={date.date} variant="info">{date.date}</Badge>
                        ))}
                    </Card.Text>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {film.showings.Standard.times.map(time => (
                            <tr key={time.start_time}>
                            <td>{time.start_time}</td>
                            <td>{time.end_time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </Card.Body>
                </Card>
                ))}
            </>}
            </Col>
        </Row>
        </Container>
    );
    };