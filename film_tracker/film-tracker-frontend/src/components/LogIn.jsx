import {  useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { logIn } from "../utilities/user_utilities";

export const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        logIn(email, password, setUser)
        setEmail("")
        setPassword("")
        navigate('/')
    }
  
 
    return (
        <form onSubmit={handleSubmit}>
        <h3>Log In</h3>
        <input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Log In" />
        </form>
    );
};