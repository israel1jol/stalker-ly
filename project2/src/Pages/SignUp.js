import { useNavigate, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

const SignUp = () => {
    const [loggingIn, setLoggingIn] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("M");
    const [filePath, setFilePath] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();

    console.log(gender, document.getElementById("file"));

    const submitForm = (e) => {

        // fetch("http://localhost:5000/api/user/create", {
        //     "method":"POST",
        //     "headers":{
        //         "content-type":"application/json"
        //     },
        //     body:JSON.stringify({
        //         firstname:firstname, 
        //         lastname:lastname,
        //         username:username,
        //         email:email,
        //         gender:gender,
        //         password:password,
        //         path:filePath
        //     })
        // }).then(res => res.json()).then(data => {
        //     setLoggingIn(false);
        //     if(data.error) return setError(data.error);
        //     console.log(data);
        //     nav('/login');
        // })
    }


    return (
        <div className="container">
        { loggingIn ? <div className="vh-100 d-flex justify-content-center align-items-center"><FaSpinner size="80" color="grey" className="loader"/></div> : <div >
            <div className="display-5 text-center">Register</div>
            <br />
            {error !== "" ? <div className="alert alert-danger">{error}</div> : null}
            <br />
            <form encType="multipart/form-data" onSubmit={(e) => submitForm(e)} >
                <div className="form-group">
                    <label htmlFor="">Firstname<span title="required" className="text-danger">*</span></label>
                    <input type="text" className="form-control w-50" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="">Lastname<span title="required" className="text-danger">*</span></label>
                    <input type="text" className="form-control w-50" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="">Username<span title="required" className="text-danger">*</span></label>
                    <input type="text" className="form-control w-50" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="">Gender<span title="required" className="text-danger">*</span></label>
                    <select onChange={(e) => setGender(e.target.value)} value={gender} className="form-control w-50">
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="">Email<span title="required" className="text-danger">*</span></label>
                    <input type="email" className="form-control w-50" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="">Password<span title="required" className="text-danger">*</span></label>
                    <input type="password" className="form-control w-50" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <div className="form-group">
                    <label>Upload profile pic</label>
                    <input type="file" className="form-control w-50" id="file" />
                </div>
                <br />
                <input type="submit" value="register" className="btn btn-outline-primary"/>
            </form>
            
            <br />
            <p>Already signed up? <Link to="/login" className="">Login</Link></p>
        </div>}
    </div>
    )
}

export default SignUp