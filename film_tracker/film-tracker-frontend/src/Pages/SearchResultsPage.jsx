import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';

export const SearchResultsPage = () => {
    const location = useLocation();
    const results = location.state.results;
    const navigate = useNavigate();

    const handleMovieClick = (movieId) => {
        navigate(`/movie/details/${movieId}`);
    };

    const filteredResults = results.filter(
        (result) => !result.description.includes('TV', 'Video', 'Podcast', 'Short', 'Max Hubacher')
    );

    return (
        <Container>
        <h3>Search Results</h3>
        <Row xs={1} md={3} className="g-4">
            {filteredResults.map((result) => (
            <Col key={result.id}>
                <Card onClick={() => handleMovieClick(result.id)}>
                <Card.Title>{result.title}</Card.Title>
                <Card.Img
                    src={result.image}
                    alt={result.title}
                    style={{ height: "200px", width: "150px" }}
                    className="mx-auto"
                />
                <Card.Body>
                    <Card.Text>{result.description}</Card.Text>
                </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
        </Container>
    );
};
