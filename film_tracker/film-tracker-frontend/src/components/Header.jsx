import {  useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { handleSearch } from '../utilities/movie_utilities';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export const Header = () => {
    const [user, setUser] = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            handleSearch(e, searchQuery, navigate, setSearchQuery);
        }
    }

    return (
        <header>
            <h1>NOT LetterBoxd</h1>
            <Navbar bg="light" expand="lg">
            <Container fluid>
                <Row md="auto justify-content-between">
                    <Col>
                        <Link to="/">Home</Link>
                    </Col>
                    <Col>
                        <Link to="/movie/times">Show Times</Link>
                    </Col>
                    <Col>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="searchQuery"
                            placeholder="Search for a Movie"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <Button type="submit">Search</Button>
                        </Form>
                    </Col>
                    <Col>
                        <Link to="/user/home/">{user && user.email ? user.display_name : ""}</Link>
                    </Col>
                    <Col>
                        <Link to="/user/">{user && user.email ? "Logout" : "Login"}</Link>
                    </Col>
            </Row>
        </Container>
        </Navbar>
        <br/>
        </header>
);
};