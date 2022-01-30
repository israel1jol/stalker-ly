import { useNavigate, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [error, setError] = useState("");

    const submitForm = () => {
        fetch("http://localhost:5000/api/user/refToken", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "username":`${username}`,
                "password":`${password}`
            })
        }).then(res => res.json()).then(data => {
            if(data.error){
                setError(data.error);
            }
            else{
                getAccToken(data.refreshToken);
            }
        })
    }

    const getAccToken = (refToken) => {
        fetch("http://localhost:5000/api/user/accToken", {
            method:"get",
            headers:{
                "Authorization":`Bearer ${refToken}`
            }
        }).then(res => res.json()).then(data => {
            if(data.error){
                setError("Please try to login again");
            }
            else{
                localStorage.setItem("refToken", refToken);
                localStorage.setItem("accToken", data.accessToken);
                nav('/profile');
            }
        })
    }

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            { loggingIn ? <div className="loader"><FaSpinner size="80"/></div> : <div >
                <div className="display-5 text-center">Login</div>
                <br />
                {error !== "" ? <div className="alert alert-danger">{error}</div> : null}
                <br />
                <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <button className="btn btn-outline-primary" onClick={(e) => username !== "" && password !== "" ? submitForm() : null}>Login</button>
                <br />
                <p>Don't have an account? <Link to="/register" className="">Sign Up</Link></p>
            </div>}
        </div>
    )
}

export default Login