import {  useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../components/SignUp";
import { LogIn } from "../components/LogIn";
import { UserContext } from "../App";
import { logOut } from "../utilities/user_utilities";

export const LoginPage = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <>
        {user && user.email ? 
        <>
        <br></br>
        <h3>Logout</h3>
        <br></br>
        <br></br>
        <button onClick={()=>{logOut(setUser);navigate('/')}}>LOG OUT</button>
        </>
        :
        <>
        <LogIn />
        <br></br>
        <h4>Don't Have an Account?</h4>
        <SignUp />
        </>
        }
        </>
    )
  };