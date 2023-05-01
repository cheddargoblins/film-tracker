import { useState } from "react";
import { signUp } from "../utilities/user_utilities";

export const SignUp = () => {
    const [display_name, setDisplay_Name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDOB] = useState("");

    return (
        <form
        onSubmit={(e) => [
            e.preventDefault(),
            signUp(display_name, email, password,dob),
            setEmail(""),
            setPassword(""),
            setDisplay_Name(""),
            setDOB(""),
        ]}
        style={{ display: "flex", flexDirection: "column" }}
        >
        <h3>Sign Up</h3>
        <input
            placeholder="Display Name"
            type="text"
            value={display_name}
            onChange={(e) => setDisplay_Name(e.target.value)}
        />
        <input
            placeholder="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
        />
        <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="signUp" />
        </form>
);
};