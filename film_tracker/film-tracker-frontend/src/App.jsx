import { createContext, useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import { Header } from "./components/Header"
import { currUser } from "./utilities/user_utilities";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import './App.css'

export const UserContext = createContext(null)

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getCurrUser = async () => {
            setUser(await currUser());
        };
        getCurrUser();
        }, []);

    return (
        <div className="main-content">
            <Container fluid className="App">
                <UserContext.Provider value={[user, setUser]} >
                    <Row md="auto">
                        <Header />
                    </Row>

                    <Outlet />
                </UserContext.Provider>
            </Container>
        </div>
    )
}

export default App
